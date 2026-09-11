import { describe, expect, it } from "vitest";
import { applyGuardrails } from "./risk.js";
import { decide } from "./decision.js";

describe("risk guardrails", () => {
  it("blocks unverified data before an AI decision", () => {
    const result = decide({ price: 100, liquidity: 250000, priceChangePercent: 4, sourceVerified: false });
    expect(result.action).toBe("HOLD");
    expect(result.guardrails).toContain("Source data is not cryptographically verified");
  });

  it("accepts a verified liquid signal", () => {
    expect(applyGuardrails({ price: 100, liquidity: 250000, priceChangePercent: 4, sourceVerified: true }).accepted).toBe(true);
  });
});
