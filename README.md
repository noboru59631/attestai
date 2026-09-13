# AttestAI — Verified Collateral. Adaptive Intelligence.

> **Creditcoin verifies the facts. AI interprets the facts.**

> **AI proposes. Guardrails constrain. Verified collateral authorizes.**

AttestAI is a trust layer for autonomous AI decisions. Before an AI agent can interpret a cross-chain signal, AttestAI verifies the signal through **Creditcoin USC**, validates its meaning, applies deterministic risk guardrails, and records the resulting decision on Creditcoin.

The `research/verified-collateral-ai-authority` branch extends that proven path with a testnet-only collateral vault and dynamic agent authority. It does not alter or replace the existing live market-signal evidence.

## Verified collateral and adaptive authority

```text
Ethereum Sepolia AttestAICollateralVault event
        ↓
Attestcoin / USC cryptographic verification
        ↓
Semantic validation on Creditcoin CC3
        ↓
Reconstructed verified vault collateral
        ↓
Deterministic percentage + per-trade + absolute caps
        ↓
Adaptive market-regime proposal
        ↓
Guardrail result and bounded onchain proposal record
```

- **Verification — What is true?** Only proven vault deposit and withdrawal events update collateral.
- **Authority — What is allowed?** Configurable deterministic policy derives a current risk budget.
- **AI — What should we do?** Regime reasoning proposes `BUY`, `SELL`, `HOLD`, or `REFER` inside that budget.

This is reconstructed verified vault state, not a proof of an arbitrary Ethereum wallet balance. A generic `eth_getBalance` response never creates authority. Missing collateral proof, unreliable market data, or malformed AI output fails safely to zero allocation and `HOLD/REFER`.

Cross-chain updates are asynchronous. Authority reflects only the latest vault lifecycle events proven and applied on CC3, not instantaneous Sepolia state. A Sepolia withdrawal does not reduce CC3 authority until its `CollateralWithdrawn` event is attested, proven, and accepted; real-money execution remains disabled.

The collateral contracts and local authority tests are implemented. A real 0.001 Sepolia test ETH deposit was proven through USC and accepted on CC3, creating 0.0002 ETH of bounded authority under the deployed 20% policy. Missing market data produced a real zero-allocation `REFER` fallback, which was recorded on CC3 with execution disabled. A later 0.0005 ETH withdrawal was also proven, reducing verified collateral to 0.0005 ETH and authority to 0.0001 ETH.

| Collateral prototype evidence | Address or transaction |
| --- | --- |
| Sepolia collateral vault | [`0x62C98EE377a9D21c9793Bef58156f8E1272cA1Cf`](https://sepolia.etherscan.io/address/0x62C98EE377a9D21c9793Bef58156f8E1272cA1Cf) |
| Sepolia deposit transaction | [`0x38eef42991aaf1adcdf3054572d0fbee4413c3c80e7a32a9810f3dc6afdb23cc`](https://sepolia.etherscan.io/tx/0x38eef42991aaf1adcdf3054572d0fbee4413c3c80e7a32a9810f3dc6afdb23cc) |
| CC3 verified deposit proof | [`0xe32aec9434215fe0130effaa622d9cf0c9470ea0a4f2021a46adb7193f00308a`](https://creditcoin-testnet.blockscout.com/tx/0xe32aec9434215fe0130effaa622d9cf0c9470ea0a4f2021a46adb7193f00308a) |
| CC3 decoder library | [`0xcdbBe6B9478CA9A4430A53e60Ae47BAA21E4cA29`](https://creditcoin-testnet.blockscout.com/address/0xcdbBe6B9478CA9A4430A53e60Ae47BAA21E4cA29) |
| CC3 collateral authority | [`0xf1ffB0c8d934E43Ca8A44009c119098DCd3D562F`](https://creditcoin-testnet.blockscout.com/address/0xf1ffB0c8d934E43Ca8A44009c119098DCd3D562F) |
| CC3 authority deployment | [`0xe5d3e7097599a1bd1c4f5cfe04bed415ab81e120d365b6dfcbe2195595631f3d`](https://creditcoin-testnet.blockscout.com/tx/0xe5d3e7097599a1bd1c4f5cfe04bed415ab81e120d365b6dfcbe2195595631f3d) |
| CC3 safe proposal record | [`0xb6d9dfe4b14694afdb33b2e461ce8f42d6623224c4d9aacef72668644fd82915`](https://creditcoin-testnet.blockscout.com/tx/0xb6d9dfe4b14694afdb33b2e461ce8f42d6623224c4d9aacef72668644fd82915) |
| Sepolia withdrawal transaction | [`0x7ffaee6bcb1513b9a8e7118992b780b2238705578e203ce1d35d796ad55fb4c7`](https://sepolia.etherscan.io/tx/0x7ffaee6bcb1513b9a8e7118992b780b2238705578e203ce1d35d796ad55fb4c7) |
| CC3 verified withdrawal proof | [`0x1a5b9f78c1b407a796e0d8e8d76f33629f4d965716ebe396c85adca17e28fc84`](https://creditcoin-testnet.blockscout.com/tx/0x1a5b9f78c1b407a796e0d8e8d76f33629f4d965716ebe396c85adca17e28fc84) |

**Current status:** full deposit and withdrawal lifecycle USC verified; authority reduction confirmed; safe zero-allocation proposal recorded; real-money execution disabled.

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

See `docs/VERIFIED_COLLATERAL_AUTHORITY.md` for the trust boundaries, policy, proof semantics, safe claims, and testnet runbook.

## Hackathon summary

AttestAI makes an autonomous decision pipeline inspectable and evidence-based: Creditcoin USC verifies the cross-chain fact, semantic validation confirms what the fact means, deterministic guardrails constrain the response, and the resulting AI decision is recorded onchain. The live Ethereum Sepolia → Creditcoin CC3 Testnet flow demonstrates the complete path with a public transaction receipt.
