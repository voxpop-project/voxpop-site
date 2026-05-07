/**
 * VoxPop Demo Polls API Route
 *
 * Creates and manages demo polls for the interactive demo page.
 * Uses in-memory storage (demo only — not for production).
 *
 * @route POST /api/demo/polls - Create a new demo poll
 * @route GET /api/demo/polls - List demo polls
 */

import { NextRequest, NextResponse } from "next/server";
import { createHash, randomUUID } from "crypto";

// ============================================================
// Types
// ============================================================

interface DemoPoll {
  id: string;
  title: string;
  choices: string[];
  countryCode: string;
  createdAt: string;
  status: "active" | "closed";
  // Simulated vote data
  votes: DemoVote[];
  hashChain: DemoBlock[];
  voterCommitments: string[];
}

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

// ============================================================
// In-Memory Store
// ============================================================

const GENESIS_PREVIOUS_HASH =
  "0000000000000000000000000000000000000000000000000000000000000000";

// Global store shared across all demo routes (same process)
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

function createGenesisBlock(pollId: string): DemoBlock {
  const timestamp = new Date().toISOString();
  const hash = computeBlockHash(0, GENESIS_PREVIOUS_HASH, timestamp, pollId, "0", -1);
  return {
    index: 0,
    previousHash: GENESIS_PREVIOUS_HASH,
    hash,
    timestamp,
    nullifierHash: "0",
    choiceIndex: -1,
  };
}

// ============================================================
// Routes
// ============================================================

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, choices, countryCode } = body;

    // Validation
    if (!title || !choices || !Array.isArray(choices) || choices.length < 2) {
      return NextResponse.json(
        { error: "A poll requires a title and at least 2 choices" },
        { status: 400 }
      );
    }

    if (!countryCode || countryCode.length !== 2) {
      return NextResponse.json(
        { error: "A valid 2-letter country code is required" },
        { status: 400 }
      );
    }

    const id = `demo-${randomUUID().slice(0, 8)}`;
    const genesis = createGenesisBlock(id);

    const poll: DemoPoll = {
      id,
      title,
      choices,
      countryCode: countryCode.toUpperCase(),
      createdAt: new Date().toISOString(),
      status: "active",
      votes: [],
      hashChain: [genesis],
      voterCommitments: [],
    };

    demoPolls.set(id, poll);

    return NextResponse.json(
      {
        success: true,
        poll: {
          id: poll.id,
          title: poll.title,
          choices: poll.choices,
          countryCode: poll.countryCode,
          createdAt: poll.createdAt,
          status: poll.status,
          genesisHash: genesis.hash,
        },
      },
      { status: 201 }
    );
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }
}

export async function GET() {
  const polls = Array.from(demoPolls.values()).map((p) => ({
    id: p.id,
    title: p.title,
    choices: p.choices,
    countryCode: p.countryCode,
    createdAt: p.createdAt,
    status: p.status,
    voteCount: p.votes.length,
    chainLength: p.hashChain.length,
  }));

  return NextResponse.json({ polls, count: polls.length });
}
