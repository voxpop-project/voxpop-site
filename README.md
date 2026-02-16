# VoxPop — La Voix du Peuple

**Secure, anonymous, and censorship-resistant digital voting.**

VoxPop is an open-source platform enabling organizations, associations, and citizen collectives to conduct cryptographically secured votes using Zero-Knowledge Proofs.

## Live Website

[https://voxpop-app.com](https://voxpop-app.com)

## Features

- **Zero-Knowledge Proofs** (Semaphore/ZK-SNARKs) — prove voter eligibility without revealing identity
- **Per-Country Merkle Trees** — jurisdiction-specific voter verification
- **Cryptographic Nullifiers** — prevent double-voting while maintaining anonymity
- **SHA-256 Hash Chains** — tamper-proof vote records
- **Censorship Resistance** — pluggable transports (Snowflake, obfs4) for repressive environments
- **Interactive Demo** — 7-step voting simulation with ZKP visualization

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS 3.4
- **Animations:** Framer Motion
- **Font:** Inter (Google Fonts)
- **Deployment:** Vercel

## Design System

- **Theme:** Ocean Dark
- **Colors:** Dark `#1E293B`, Blue `#1D4ED8`, Teal `#06B6D4`, Gold `#FBBF24`, Violet `#8B5CF6`
- **Gradient:** Teal to Blue

## Pages

| Page | Path | Description |
|------|------|-------------|
| Home | `/` | Landing page with hero, features, CTA |
| How it Works | `/how-it-works` | Step-by-step explanation |
| Features | `/features` | Detailed feature cards |
| Demo | `/demo` | Interactive 7-step voting simulation |
| Pricing | `/pricing` | SaaS plans (Starter, Pro, Business, Enterprise) |
| About | `/about` | Team and mission |
| Contact | `/contact` | Contact form and info |
| Privacy | `/legal/privacy` | Privacy policy |
| Terms | `/legal/cgu` | Terms of service |

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## Related Repositories

- **Voting Module (core):** [voxpop-vote](https://github.com/voxpop-project/voxpop-vote) — ZKP voting engine with Semaphore integration

## License

AGPL-3.0 — See [LICENSE](LICENSE) for details.

## Contact

- **Email:** contact@voxpop-app.com
- **Website:** [voxpop-app.com](https://voxpop-app.com)
- **GitHub:** [github.com/voxpop-project](https://github.com/voxpop-project)
