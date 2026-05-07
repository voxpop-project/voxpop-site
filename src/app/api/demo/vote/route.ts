/**
 * VoxPop Demo Vote API Route
 *
 * Handles vote submission for the interactive demo.
 * Simulates ZKP verification and adds votes to the hash chain.
 *
 * In the real system, this would:
 * 1. Verify the Semaphore ZKP proof
 * 2. Check the voter's commitment exists in the country's Merkle Tree
 * 3. Verify the nullifier hasn't been used (prevent double voting)
 * 4. Add the vote to the hash chain
 *
 * For the demo, we simulate the ZKP verification with realistic delays
 * and generate real SHA-256 hash chains.
 *
 * @route POST /api/demo/vote
 */

import { NextRequest, NextResponse } from "next/server";
import { createHash, randomBytes } from "crypto";

// ============================================================
// Types (shared with polls route via in-memory reference)
// ============================================================

interface DemoVote {
  nullifierHash: string;
  choiceIndex: number;
  timestamp: string;
  blockHash: string;
}

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
  votes: DemoVote[];
  hashChain: DemoBlock[];
  voterCommitments: string[];
}

// ============================================================
// Shared Store (same reference as polls route in same process)
// ============================================================

// We use a global store accessible across routes
const globalStore = (globalThis as Record<string, unknown>);
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

// ============================================================
// Route
// ============================================================

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { pollId, choiceIndex, voterCommitment } = body;

    // Validate
    if (!pollId) {
      return NextResponse.json({ error: "pollId is required" }, { status: 400 });
    }

    if (choiceIndex === undefined || choiceIndex < 0) {
      return NextResponse.json({ error: "Valid choiceIndex is required" }, { status: 400 });
    }

    // Get poll from store
    const poll = demoPolls.get(pollId);
    if (!poll) {
      return NextResponse.json({ error: "Poll not found" }, { status: 404 });
    }

    if (poll.status !== "active") {
      return NextResponse.json({ error: "Poll is closed" }, { status: 400 });
    }

    if (choiceIndex >= poll.choices.length) {
      return NextResponse.json(
        { error: `choiceIndex must be 0-${poll.choices.length - 1}` },
        { status: 400 }
      );
    }

    // Generate deterministic nullifier from voter commitment + poll ID
    // In real system, this comes from the ZKP proof
    const nullifierHash = createHash("sha256")
      .update(`${voterCommitment || randomBytes(32).toString("hex")}|${pollId}`)
      .digest("hex");

    // Check double voting
    const existingVote = poll.votes.find((v) => v.nullifierHash === nullifierHash);
    if (existingVote) {
      return NextResponse.json(
        {
          error: "Double vote detected",
          detail: "This voter has already cast a vote in this poll",
          nullifierHash,
        },
        { status: 409 }
      );
    }

    // Simulate ZKP verification delay (realistic ~500ms)
    await new Promise((resolve) => setTimeout(resolve, 300 + Math.random() * 400));

    // Add vote to hash chain
    const previousBlock = poll.hashChain[poll.hashChain.length - 1];
    const timestamp = new Date().toISOString();
    const blockIndex = previousBlock.index + 1;

    const blockHash = computeBlockHash(
      blockIndex,
      previousBlock.hash,
      timestamp,
      pollId,
      nullifierHash,
      choiceIndex
    );

    const newBlock: DemoBlock = {
      index: blockIndex,
      previousHash: previousBlock.hash,
      hash: blockHash,
      timestamp,
      nullifierHash,
      choiceIndex,
    };

    poll.hashChain.push(newBlock);

    // Record the vote
    const vote: DemoVote = {
      nullifierHash,
      choiceIndex,
      timestamp,
      blockHash,
    };

    poll.votes.push(vote);

    // Store voter commitment for future checks
    if (voterCommitment) {
      poll.voterCommitments.push(voterCommitment);
    }

    // Build receipt
    const receipt = {
      accepted: true,
      voteHash: blockHash,
      nullifierHash,
      chainPosition: blockIndex,
      previousHash: previousBlock.hash,
      timestamp,
      pollId,
      choiceIndex,
      // Simulated ZKP verification data
      zkpVerification: {
        proofValid: true,
        merkleRootVerified: true,
        nullifierUnique: true,
        verificationTimeMs: Math.floor(300 + Math.random() * 400),
      },
    };

    return NextResponse.json(
      { success: true, receipt },
      { status: 200 }
    );
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }
}
