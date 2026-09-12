# AttestAI Whitepaper

## Verify First. Decide Second.

**Submission edition:** DoraHacks BUIDL CTC 2026 Fall  
**Project:** AttestAI  
**Repository:** https://github.com/noboru59631/attestai

## Executive Summary

AttestAI is a proof-aware AI decision agent for cross-chain market intelligence. A signal is emitted on Ethereum Sepolia. The worker waits for the source block to be attested, obtains the USC v2 proof material, and submits the encoded source transaction to a Creditcoin destination contract. The contract calls the USC Native Query Verifier at `0x0FD2` before accepting the signal. Only after verification do deterministic risk guardrails and an AI decision adapter run. The resulting BUY, HOLD, or SELL decision is recorded on Creditcoin with provenance references.

The application does not enable real-money trading. Demo Mode uses deterministic fixtures and labels the Proof Inspector state `Simulated`; it never represents fixture data as onchain verification.

## Problem

AI agents can turn plausible but untrusted cross-chain data into confident actions. A source transaction may be included in a chain but still be irrelevant, failed, emitted by the wrong contract, sent by the wrong account, or replayed. A proof of inclusion alone is not a proof that the payload is the intended signal.

AttestAI makes the trust boundary explicit: cryptographic verification happens in a Creditcoin smart contract, semantic checks happen before the signal is accepted, and the AI is downstream of deterministic policy.

## Design Principles

- Verify before interpretation.
- Keep the worker transport-oriented; Creditcoin is the trust boundary.
- Separate cryptographic validity from semantic relevance.
- Make unsafe or unavailable inputs fail closed to HOLD.
- Keep Demo Mode deterministic and visibly distinct from live verification.
- Never imply a deployment, metric, proof, transaction, or integration state that has not been observed.

## Architecture

The intended path is:

`Source Chain -> USC Proof -> 0x0FD2 Verification -> Semantic Validation -> Deterministic Risk Guardrails -> AI Decision -> Creditcoin/onchain record`

Ethereum Sepolia hosts `SignalEmitter`, which emits `MarketSignal`. The worker transports source transaction data and proof material. `AttestAIDecision` decodes the transaction and receipt, calls the native verifier, emits `VerifiedSignalAccepted`, and records the decision. The web dashboard and Proof Inspector expose the provenance state.

## Creditcoin USC v2 Integration

The repository targets USC Testnet 2 with Creditcoin chain ID `102033`. Ethereum Sepolia is represented by USC source-chain key `1`, which is distinct from the EVM chain ID `11155111`. The configured native verifier address is `0x0000000000000000000000000000000000000FD2`.

The live worker uses the official USC SDK proof-builder path: it requests proof data for a source transaction, passes the returned header number, encoded transaction, Merkle proof, and continuity proof to `verifyAndRecord`, and waits for the Creditcoin receipt. The destination contract calls `verify(chainKey, blockHeight, encodedTransaction, merkleProof, continuityProof)` synchronously. It derives a query key from source chain, block height, and transaction index, then stores replay protection after verification.

The repository preserves this live integration, but the current validation environment recorded an upstream DNS blocker for the official USC Testnet 2 RPC, proof builder, explorer, and GraphQL hostnames. No USC transaction was submitted during that blocked validation.

## Semantic Validation

After decoding the proof payload, the destination contract checks:

1. Source chain key matches the configured chain.
2. Receipt status equals `1`.
3. Transaction sender matches the expected source sender.
4. Transaction destination matches the configured `SignalEmitter` contract.
5. Calldata begins with `emitSignal(bytes32,int256,uint256)`.
6. Asset, price, and liquidity are non-zero and positive where required.
7. Exactly one `MarketSignal` log is present at the expected contract.
8. Logged price and liquidity match calldata and the event timestamp is non-zero.
9. The query key has not already been processed.
10. USC Merkle inclusion and continuity verification succeeds.

These checks are intentionally separate from the AI layer. A valid proof can still be rejected if its payload is not the expected signal.

## Risk Guardrails and AI Boundary

`applyGuardrails` requires cryptographic source verification, a positive price, liquidity of at least `100000`, and absolute price movement no greater than `20%`. The guardrail function returns an acceptance flag, risk score, and reasons. If any check fails, `decide` returns `HOLD` and the AI is not allowed to reinterpret the blocked input.

When the signal is accepted, the provider-agnostic decision adapter produces BUY, HOLD, or SELL with confidence, risk score, concise reasoning, and guardrail results. The application records the decision; it does not execute trades or move real money.

## Proof Inspector

The dashboard distinguishes three states:

- **Simulated:** deterministic fixture data used by Demo Mode; not cryptographically verified.
- **Locally Validated:** local checks and guardrails passed, but no Creditcoin receipt proves the flow.
- **Onchain Verified:** a real USC proof was accepted by the destination contract and the receipt and events were checked.

The current dashboard is explicitly Demo Mode. It shows the state labels and keeps the onchain state unclaimed until the live flow is completed.

## Security and Threat Model

The worker is not trusted to assert correctness. It can transport malformed or adversarial data, but the destination contract constrains chain identity, transaction status, sender, destination, function selector, payload, event, and replay state. The native verifier constrains inclusion and finalized continuity. Deterministic guardrails constrain what reaches the decision adapter.

Threats include forged or irrelevant payloads, failed source transactions, wrong senders, wrong contracts, event/calldata mismatch, replay, unavailable infrastructure, and AI overreach. Mitigations are fail-closed validation, explicit state labels, replay keys, bounded scores, no real-money executor, and separation between verification and interpretation.

## Implementation and Testing

The monorepo contains a Next.js dashboard, a worker for relay and decision logic, and Hardhat contracts. Contract tests cover wrong chain, malformed payload, wrong source contract, failed source transaction, invalid proof, and replay rejection. Worker tests cover blocking unverified data and accepting a verified liquid signal. The live end-to-end checklist remains deployment- and funding-dependent.

## Current Demo Mode and Blocker

The current public repository is reviewable in deterministic Demo Mode. The UI states `DEMO MODE - deterministic fixtures only - no onchain verification claimed`. The fixture source hash is zero-filled and the proof digest is a demo label; neither is a transaction hash or cryptographic proof.

On 2026-09-12, the repository's validation record reported NXDOMAIN for the official USC Testnet 2 RPC, proof builder, explorer, and GraphQL hostnames. Sepolia preflight and wallet funding checks passed, but live proof retrieval was blocked before any USC transaction. The network configuration was left unchanged. Once endpoints resolve, the documented sequence is to re-run health checks, confirm chain IDs and balances, deploy if needed, emit a source signal, fetch proof, submit `verifyAndRecord`, and only then label the inspector `Onchain Verified`.

## Roadmap and Use Cases Beyond Trading

1. Restore endpoint reachability and complete a receipt-backed USC Testnet 2 run.
2. Add richer source event schemas and stronger policy configuration.
3. Extend the same boundary to lending risk, treasury controls, insurance claims, compliance attestations, DAO operations, and agent-to-agent permissions.
4. Add user-facing proof export and independent verification views.

The core pattern is general: prove a cross-chain fact, validate its meaning, apply deterministic policy, then let an AI explain or prioritize the result.

## Links and Submission Notes

- GitHub repository: https://github.com/noboru59631/attestai
- Live demo: not published in the current repository
- Demo video: not published in the current repository
- USC documentation: https://docs.creditcoin.org/usc/dapp-builder-infrastructure/universal-smart-contracts
- USC network manifest: https://github.com/gluwa/creditcoin-usc-networks/blob/master/networks.json

The live demo and demo-video entries are intentionally marked as unpublished because no verified public URL is present in the current project source.

## Conclusion

AttestAI treats AI decisions as downstream of evidence. Creditcoin USC supplies the cross-chain verification boundary; the destination contract supplies semantic validation and replay protection; deterministic guardrails define the AI boundary; and the Proof Inspector makes the current evidence state visible. The implementation is designed to become receipt-backed when upstream USC infrastructure is reachable, while remaining honest and reviewable in Demo Mode today.
