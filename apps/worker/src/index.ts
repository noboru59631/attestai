import { buildDemoTrace } from "./relay.js";
import { decide } from "./decision.js";

const trace = await buildDemoTrace("0x0000000000000000000000000000000000000000000000000000000000000000");
const decision = decide({ price: 100, liquidity: 250000, priceChangePercent: 4, sourceVerified: true });
console.log(JSON.stringify({ trace, decision }, null, 2));
