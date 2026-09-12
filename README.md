# AttestAI — Verify First. Decide Second.

> **Creditcoin verifies the facts. AI interprets the facts.**

AttestAI is a trust layer for autonomous AI decisions. Before an AI agent can interpret a cross-chain signal, AttestAI verifies the signal through **Creditcoin USC**, validates its meaning, applies deterministic risk guardrails, and records the resulting decision on Creditcoin.

## The principle

```text
Verify → Guardrail → Reason → Act
```

The AI decision layer is deliberately downstream of verification. AttestAI does not ask an agent to trust an unverified API response or an opaque fixture: it first establishes that the source signal was accepted by the USC verification path, then checks the signal's semantics and risk constraints.

## What the MVP demonstrates

- **Creditcoin USC as the trust layer:** a cryptographic proof connects a source signal on Ethereum Sepolia with its verification path on Creditcoin CC3 Testnet.
- **Semantic validation:** the application checks that the verified payload has the expected meaning and structure before it can affect a decision.
- **Deterministic risk guardrails:** explicit, reproducible rules constrain the decision layer and provide a predictable safety boundary.
- **Proof Inspector:** the dashboard exposes the verification status, proof context, decision inputs, and onchain receipt for inspection.
- **Onchain decision record:** the final result is recorded on Creditcoin after verification and guardrails have completed.

## Live end-to-end verification

AttestAI has completed a real live flow:

```text
Ethereum Sepolia
        ↓
USC proof
        ↓
Creditcoin CC3 Testnet verification
        ↓
Semantic validation
        ↓
Deterministic risk guardrails
        ↓
AI decision
        ↓
Creditcoin onchain record
```

### Verified result

| Field | Result |
| --- | --- |
| Verification status | **Onchain Verified** |
| Decision | **HOLD** |
| Confidence | **78** |
| Risk score | **10** |
| Source network | Ethereum Sepolia |
| Destination network | Creditcoin CC3 Testnet |

### Public evidence

| Evidence | Address or transaction |
| --- | --- |
| Sepolia source contract | [`0x8498F0C06F25e1FAF141Cf5CF7fFf4Fc58c0AbA1`](https://sepolia.etherscan.io/address/0x8498F0C06F25e1FAF141Cf5CF7fFf4Fc58c0AbA1) |
| Sepolia source transaction | [`0xa4c4659d9f42b2fee82ae8e46411806d511d8d931404a93e326482dc5173c7ca`](https://sepolia.etherscan.io/tx/0xa4c4659d9f42b2fee82ae8e46411806d511d8d931404a93e326482dc5173c7ca) |
| CC3 destination contract | [`0x094423E150207C73c502a6eF4EA967eA9e69a2a0`](https://creditcoin-testnet.blockscout.com/address/0x094423E150207C73c502a6eF4EA967eA9e69a2a0) |
| CC3 deployment transaction | [`0x086e01da8b79a5577276df28a04a0b456bc44e28c439cea711a2fbdacffbbff0`](https://creditcoin-testnet.blockscout.com/tx/0x086e01da8b79a5577276df28a04a0b456bc44e28c439cea711a2fbdacffbbff0) |
| Verified decision transaction | [`0xe8b2a92dc044bdd6d8a05b25ef731ad7f61ac614d0fcf6944b2a1e1fbcfb7d0f`](https://creditcoin-testnet.blockscout.com/tx/0xe8b2a92dc044bdd6d8a05b25ef731ad7f61ac614d0fcf6944b2a1e1fbcfb7d0f) |

The verified decision transaction records the live result and its receipt-backed events, including `VerifiedSignalAccepted` and `DecisionRecorded`.

## Network configuration

| Setting | Value |
| --- | --- |
| Source network | Ethereum Sepolia |
| USC source chain key | `1` |
| Creditcoin network | CC3 Testnet |
| Creditcoin chain ID | `102031` |
| Creditcoin RPC | [`https://rpc.cc3-testnet.creditcoin.network`](https://rpc.cc3-testnet.creditcoin.network) |
| USC prover | [`https://prover.cc3-testnet.creditcoin.network/`](https://prover.cc3-testnet.creditcoin.network/) |
| Creditcoin explorer | [`https://creditcoin-testnet.blockscout.com/`](https://creditcoin-testnet.blockscout.com/) |
| USC verifier / precompile | `0x0000000000000000000000000000000000000FD2` |

The USC source chain key `1` is distinct from Ethereum Sepolia's EVM chain ID `11155111`.

## Try the demo

- **Public demo:** [attestai-web.vercel.app](https://attestai-web.vercel.app)
- **Walkthrough video:** [Watch on YouTube](https://youtu.be/qBVhBAq08Fs)

The dashboard includes the Proof Inspector so reviewers can follow the verification state and the resulting decision record.

## Run locally

```sh
pnpm install
copy .env.example .env
pnpm test
pnpm typecheck
pnpm build
```

Use the repository's environment configuration for local operation. Do not commit `.env` or expose private keys. Real-money execution is disabled; AttestAI operates against the documented test networks and does not place live financial trades.

## Repository map

- `apps/web`: Next.js dashboard and Proof Inspector.
- `apps/worker`: source event watcher, proof relay, guardrails, and AI adapter.
- `packages/contracts`: Hardhat Solidity contracts and tests.
- `docs`: architecture, requirements traceability, and submission materials.

## Hackathon summary

AttestAI makes an autonomous decision pipeline inspectable and evidence-based: Creditcoin USC verifies the cross-chain fact, semantic validation confirms what the fact means, deterministic guardrails constrain the response, and the resulting AI decision is recorded onchain. The live Ethereum Sepolia → Creditcoin CC3 Testnet flow demonstrates the complete path with a public transaction receipt.
