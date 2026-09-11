# AttestAI

## Verify First. Decide Second.

AttestAI is a Creditcoin USC demonstration application. It emits a signal on Ethereum Sepolia, requests a cryptographic proof through the Creditcoin USC proving path, verifies that proof on Creditcoin, applies deterministic risk guardrails, generates a BUY, HOLD, or SELL decision, and records the decision on Creditcoin.

The application does not enable real-money trading. Demo mode is explicit and uses deterministic fixtures when live proof infrastructure or an AI provider is unavailable.

## Current network configuration

- Source chain: Ethereum Sepolia.
- Execution chain: Creditcoin USC testnet.
- Creditcoin chain ID: `102031`.
- Creditcoin RPC: `https://rpc.cc3-testnet.creditcoin.network`.
- Creditcoin proof builder: `https://proof-gen-api.cc3-testnet.creditcoin.network`.
- Creditcoin explorer: `https://creditcoin-testnet.blockscout.com`.
- USC source-chain key for Sepolia: `1` (distinct from Sepolia EVM chain ID `11155111`).
- USC verifier precompile: `0x0000000000000000000000000000000000000FD2`.

These values follow the current official USC documentation. See `docs/REQUIREMENTS_TRACEABILITY.md` for sources and implementation status.

## Live Network Status

The live path now targets Creditcoin CC3 Testnet. The repository remains in Demo Mode until one real Sepolia signal is proven through the CC3 USC path and one successful decision receipt is recorded.

## Quick start

```sh
pnpm install
copy .env.example .env
pnpm test
pnpm typecheck
pnpm build
```

Set `DEMO_MODE=false` only after configuring a deployed source contract, Creditcoin decision contract, proof API, and funded relayer key.

Live tooling uses `CREDITCOIN_PROOF_BUILDER_URL` for the official USC SDK proof builder, `SOURCE_CHAIN_KEY` for the Creditcoin source-chain identifier, and `RELAYER_PRIVATE_KEY` for the dedicated test wallet. The preflight command validates both RPC chain IDs and non-zero wallet balances without printing the private key.

## Repository map

- `apps/web`: Next.js dashboard and Proof Inspector.
- `apps/worker`: source event watcher, proof relay, guardrails, and AI adapter.
- `packages/contracts`: Hardhat Solidity contracts and tests.
- `docs`: architecture, requirements traceability, and submission materials.

## Submission Text

AttestAI demonstrates a proof-aware cross-chain decision flow for Creditcoin USC. The live path uses Creditcoin CC3 Testnet; until a real receipt is captured, deterministic Demo Mode remains explicit and simulated proof data is never presented as onchain verification.

## English-only rule

All repository content must be written in English. See `CONTRIBUTING.md`.
