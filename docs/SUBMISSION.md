# Submission Draft

## One-line pitch

AttestAI verifies cross-chain market signals with Creditcoin USC before an AI agent is allowed to decide.

## Description

AttestAI is a proof-aware decision agent for cross-chain market intelligence. A signal is emitted on Ethereum Sepolia, then a worker waits for the source block to be attested and requests the USC proof material. A Creditcoin smart contract calls the native query verifier to validate Merkle inclusion and continuity in the same transaction. Only after verification do deterministic risk guardrails run and the AI produce BUY, HOLD, or SELL with confidence, risk score, and concise reasoning. The final decision is recorded on Creditcoin with references to the source transaction and proof digest. The Proof Inspector makes every stage visible. Demo mode is deterministic and does not execute real-money trades.

## Two-minute demo

1. Open AttestAI and show the explicit demo status.
2. Show the source event and its Ethereum Sepolia transaction reference.
3. Open Proof Inspector and explain that USC verification is the trust boundary.
4. Show guardrails passing before the AI decision appears.
5. Show the decision record and Creditcoin explorer link.
6. Toggle a failing fixture to demonstrate that unverified or unsafe data becomes HOLD and cannot bypass the guardrails.
