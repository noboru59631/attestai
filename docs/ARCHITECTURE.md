# AttestAI Architecture

```text
Ethereum Sepolia
  -> SignalEmitter event
  -> Worker waits for finality and requests USC proof
  -> Creditcoin USC Native Query Verifier (0x0FD2)
  -> VerifiedSignalAccepted event
  -> deterministic guardrails
  -> provider-agnostic AI decision
  -> DecisionRecord on Creditcoin
  -> Web dashboard and Proof Inspector
```

The worker is not a trust authority. It transports source transaction data and proof material. Creditcoin is the trust boundary: the destination contract calls the native verifier before accepting the source signal. Replay protection keys accepted queries by source chain, block height, and transaction index.

The contract intentionally validates transaction success and the expected source contract and event topic after proof verification. The USC verifier proves inclusion and finalized chain continuity; it does not by itself prove that the transaction succeeded or that its payload is relevant.

Live proof generation is configuration-dependent. The repository therefore has a clearly labeled deterministic demo path, but demo fixtures are never described as cryptographically verified.
