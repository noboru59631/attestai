# USC Testnet 2 Upstream Blocker

## Validation record

- Validation date: 2026-09-12 (Asia/Tokyo)
- Source: [gluwa/creditcoin-usc-networks `networks.json`](https://github.com/gluwa/creditcoin-usc-networks/blob/master/networks.json), default branch
- Network: USC Testnet 2
- Expected USC chain ID: `102033`
- Sepolia source-chain key: `1` (Sepolia EVM chain ID: `11155111`)

Official values reported by the manifest:

| Service | Official endpoint | Validation result |
| --- | --- | --- |
| RPC | `wss://rpc.usc-testnet2.creditcoin.network` | NXDOMAIN |
| Proof Builder | `https://proof-gen-api.usc-testnet2.creditcoin.network` | NXDOMAIN |
| Explorer | `https://explorer.usc-testnet2.creditcoin.network` | NXDOMAIN |
| GraphQL | `https://graphql.usc-testnet2.creditcoin.network` | NXDOMAIN |

The local Windows DNS checks returned `Non-existent domain` for each USC Testnet 2 hostname. The RPC HTTPS connectivity check could not start because the hostname did not resolve. This is an upstream infrastructure/configuration blocker, not a network migration signal.

## Validation status

- Sepolia preflight: PASS.
- Test wallet funding: PASS on Ethereum Sepolia and USC Testnet 2, according to the completed funding checks.
- USC live proof flow: BLOCKED before proof retrieval because the official USC endpoints were unreachable.
- Transactions submitted during the blocked validation: NONE. No transaction was submitted because the official USC endpoints were unreachable.
- Network configuration: unchanged. The repository still targets the official USC Testnet 2 values above.

Demo Mode is available for deterministic review. Demo fixtures are labeled `Simulated` and are never described as onchain verified.

## What remains once infrastructure is restored

1. Re-run `pnpm --filter @attestai/worker health:usc` and confirm DNS and HTTP reachability for the official endpoints.
2. Run `pnpm --filter @attestai/worker preflight` and confirm Sepolia chain ID `11155111`, USC chain ID `102033`, `SOURCE_CHAIN_KEY=1`, and non-zero balances.
3. Deploy the source signal contract to Ethereum Sepolia if the configured source contract address is not already deployed.
4. Deploy the decision contract to USC Testnet 2 with the native verifier address `0x0000000000000000000000000000000000000FD2` if it is not already deployed.
5. Emit one source signal on Sepolia and wait for the required source finality/attestation.
6. Fetch the proof from the official Proof Builder using the source transaction hash.
7. Submit the real `verifyAndRecord` transaction to USC Testnet 2 through the relayer.
8. Confirm the transaction receipt, `VerifiedSignalAccepted` event, proof digest, and decision record on the official explorer.
9. Re-run the dashboard in live mode and label the Proof Inspector state `Onchain Verified` only after those receipt checks pass.

## Recheck command

Run the non-transactional endpoint check at any time:

```sh
pnpm --filter @attestai/worker health:usc
```

The check performs DNS lookups and safe HTTP requests only. It does not use the relayer key, request a proof, submit a transaction, or change network configuration.
