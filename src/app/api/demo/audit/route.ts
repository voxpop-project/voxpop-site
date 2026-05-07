/**
 * VoxPop Demo Audit API Route
 *
 * Provides audit trail for demo polls — hash chain verification,
 * vote results tally, and individual vote verification.
 *
 * @route GET /api/demo/audit?pollId=xxx - Full audit trail
 * @route GET /api/demo/audit?pollId=xxx&voteHash=yyy - Verify specific vote
 */

import { NextRequest, NextResponse } from "next/server";
import { createHash } from "crypto";

// ============================================================
// Types
// ============================================================

interface DemoBlock {
  index: number;
  previousHash: string;
  hash: string;
  timestamp: string;
  nullifierHash: string;
  choiceIndex: number;
}

interface DemoPoll {
  id: string;
  title: string;
  choices: string[];
  countryCode: string;
  createdAt: string;
  status: "active" | "closed";
  votes: { nullifierHash: string; choiceIndex: number; timestamp: string; blockHash: string }[];
  hashChain: DemoBlock[];
  voterCommitments: string[];
}

// ============================================================
// Shared Store
// ============================================================

const globalStore = globalThis as Record<string, unknown>;
if (!globalStore.__voxpop_demo_polls) {
  globalStore.__voxpop_demo_polls = new Map<string, DemoPoll>();
}
const demoPolls = globalStore.__voxpop_demo_polls as Map<string, DemoPoll>;

function computeBlockHash(
  index: number,
  previousHash: string,
  timestamp: string,
  pollId: string,
  nullifierHash: string,
  choiceIndex: number
): string {
  const data = `${index}|${previousHash}|${timestamp}|${pollId}|${nullifierHash}|${choiceIndex}`;
  return createHash("sha256").update(data).digest("hex");
}

function verifyChain(
  blocks: DemoBlock[],
  pollId: string
): { isValid: boolean; blocksChecked: number; firstInvalidBlock: number; error?: string } {
  if (blocks.length === 0) {
    return { isValid: false, blocksChecked: 0, firstInvalidBlock: 0, error: "Empty chain" };
  }

  const GENESIS_PREV = "0000000000000000000000000000000000000000000000000000000000000000";

  // Check genesis
  if (blocks[0].previousHash !== GENESIS_PREV) {
    return {
      isValid: false,
      blocksChecked: 1,
      firstInvalidBlock: 0,
      error: "Genesis block has invalid previous hash",
    };
  }

  for (let i = 0; i < blocks.length; i++) {
    const block = blocks[i];

    // Verify index
    if (block.index !== i) {
      return {
        isValid: false,
        blocksChecked: i + 1,
        firstInvalidBlock: i,
        error: `Block ${i} has wrong index`,
      };
    }

    // Recompute hash
    const genesisPollId = i === 0 ? "GENESIS" : pollId;
    const expectedHash = computeBlockHash(
      block.index,
      block.previousHash,
      block.timestamp,
      genesisPollId,
      block.nullifierHash,
      block.choiceIndex
    );

    if (block.hash !== expectedHash) {
      return {
        isValid: false,
        blocksChecked: i + 1,
        firstInvalidBlock: i,
        error: `Block ${i} hash mismatch`,
      };
    }

    // Check chain link
    if (i > 0 && block.previousHash !== blocks[i - 1].hash) {
      return {
        isValid: false,
        blocksChecked: i + 1,
        firstInvalidBlock: i,
        error: `Block ${i} chain link broken`,
      };
    }
  }

  return { isValid: true, blocksChecked: blocks.length, firstInvalidBlock: -1 };
}

// ============================================================
// Route
// ============================================================

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const pollId = searchParams.get("pollId");
  const voteHash = searchParams.get("voteHash");

  if (!pollId) {
    return NextResponse.json({ error: "pollId query parameter required" }, { status: 400 });
  }

  const poll = demoPolls.get(pollId);
  if (!poll) {
    return NextResponse.json({ error: "Poll not found" }, { status: 404 });
  }

  // Verify specific vote
  if (voteHash) {
    const block = poll.hashChain.find((b) => b.hash === voteHash);
    if (!block) {
      return NextResponse.json(
        { found: false, error: "Vote hash not found in chain" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      found: true,
      vote: {
        blockIndex: block.index,
        hash: block.hash,
        previousHash: block.previousHash,
        timestamp: block.timestamp,
        choiceIndex: block.choiceIndex,
        choiceLabel: poll.choices[block.choiceIndex] || "Unknown",
      },
    });
  }

  // Full audit trail
  const chainVerification = verifyChain(poll.hashChain, pollId);

  // Tally votes
  const tally: Record<number, number> = {};
  for (const vote of poll.votes) {
    tally[vote.choiceIndex] = (tally[vote.choiceIndex] || 0) + 1;
  }

  const results = poll.choices.map((choice, index) => ({
    choiceIndex: index,
    label: choice,
    votes: tally[index] || 0,
    percentage:
      poll.votes.length > 0
        ? Math.round(((tally[index] || 0) / poll.votes.length) * 1000) / 10
        : 0,
  }));

  return NextResponse.json({
    poll: {
      id: poll.id,
      title: poll.title,
      choices: poll.choices,
      countryCode: poll.countryCode,
      createdAt: poll.createdAt,
      status: poll.status,
    },
    results,
    totalVotes: poll.votes.length,
    chain: {
      verification: chainVerification,
      length: poll.hashChain.length,
      genesisHash: poll.hashChain[0]?.hash,
      latestHash: poll.hashChain[poll.hashChain.length - 1]?.hash,
      blocks: poll.hashChain.map((b) => ({
        index: b.index,
        hash: b.hash.slice(0, 16) + "...",
        previousHash: b.previousHash.slice(0, 16) + "...",
        timestamp: b.timestamp,
        choiceIndex: b.choiceIndex,
      })),
    },
  });
}
