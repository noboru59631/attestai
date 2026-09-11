import { lookup } from "node:dns/promises";

const endpoints = [
  { name: "RPC", url: "wss://rpc.usc-testnet2.creditcoin.network", protocol: "dns" },
  { name: "Proof Builder", url: "https://proof-gen-api.usc-testnet2.creditcoin.network", protocol: "http" },
  { name: "Explorer", url: "https://explorer.usc-testnet2.creditcoin.network", protocol: "http" },
  { name: "GraphQL", url: "https://graphql.usc-testnet2.creditcoin.network", protocol: "http" }
] as const;

async function checkEndpoint(endpoint: (typeof endpoints)[number]) {
  const parsed = new URL(endpoint.url);
  try {
    const address = await lookup(parsed.hostname);
    if (endpoint.protocol === "dns") return `${endpoint.name}: DNS PASS (${address.address})`;
    const response = await fetch(endpoint.url, { method: "GET", signal: AbortSignal.timeout(8000) });
    return `${endpoint.name}: DNS PASS (${address.address}), HTTP ${response.status}`;
  } catch (error) {
    const message = error instanceof Error ? error.message : "endpoint check failed";
    return `${endpoint.name}: FAIL (${message})`;
  }
}

const results = await Promise.all(endpoints.map(checkEndpoint));
console.log(results.join("\n"));
if (results.some((result) => result.includes(": FAIL"))) process.exitCode = 1;
