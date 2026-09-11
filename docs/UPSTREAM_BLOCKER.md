# CC3 Testnet Migration Validation

## Validation record

- Validation date: 2026-09-12 (Asia/Tokyo)
- Source: [gluwa/creditcoin-usc-networks `networks.json`](https://github.com/gluwa/creditcoin-usc-networks/blob/master/networks.json), default branch
- Network: Creditcoin CC3 Testnet
- Expected EVM chain ID: `102031`
- Sepolia source-chain key: `1` (Sepolia EVM chain ID: `11155111`)

Official values reported by the manifest:

| Service | Official endpoint | Validation result |
| --- | --- | --- |
| RPC | `https://rpc.cc3-testnet.creditcoin.network` | HTTP JSON-RPC reachable; `eth_chainId` = `102031` |
| Proof Builder | `https://proof-gen-api.cc3-testnet.creditcoin.network` | HTTP health `200`; `status=healthy` |
| Explorer | `https://creditcoin-testnet.blockscout.com` | HTTP API reachable |

The legacy USC Testnet 2 RPC remains unreachable, but the current CC3 endpoints are reachable. The official CC3 documentation specifies chain ID `102031`, the HTTPS RPC above, and the Blockscout explorer. The official USC SDK documents the CC3 proof service, and the official bridge tutorial confirms Sepolia as the source chain with source-chain key `1`.

## Validation status

- CC3 endpoint validation: PASS.
- USC live proof flow: BLOCKED after attestation; the single proof request to `https://proof-gen-api.cc3-testnet.creditcoin.network/api/v1/proof-by-tx/1/0xa4c4659d9f42b2fee82ae8e46411806d511d8d931404a93e326482dc5173c7ca` returned HTTP `404`.
- Destination verification transaction: NONE. The live run stopped at the first unexpected proof-service response; no retry was made.
- Network configuration: migrated to CC3 values in `.env.example`, Hardhat defaults, worker preflight, endpoint checks, README, checklist, and dashboard explorer link.

Demo Mode is available for deterministic review. Demo fixtures are labeled `Simulated` and are never described as onchain verified.

## What remains before claiming Onchain Verified

1. Confirm the official CC3 proof API route for transaction-hash proofs; the health endpoint is live but the attempted SDK-compatible `proof-by-tx` route returned `404`.
2. After the route is confirmed, run `pnpm --filter @attestai/worker preflight` and confirm Sepolia chain ID `11155111`, CC3 chain ID `102031`, `SOURCE_CHAIN_KEY=1`, supported-chain metadata, and non-zero balances.
3. Reuse the already deployed public contracts and the already emitted source signal only if the official proof flow explicitly supports them; otherwise stop rather than emit another signal.
4. Submit one real `verifyAndRecord` transaction to CC3 Testnet through the relayer only after a successful proof response.
5. Confirm the transaction receipt, `VerifiedSignalAccepted` event, proof digest, and decision record on the official explorer.
6. Re-run the dashboard in live mode and label the Proof Inspector state `Onchain Verified` only after those receipt checks pass.

## Recheck command

Run the non-transactional endpoint check at any time:

```sh
pnpm --filter @attestai/worker health:usc
```

The check performs DNS lookups and safe HTTP requests only. It does not use the relayer key, request a proof, submit a transaction, or change network configuration.
