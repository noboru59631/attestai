const explorer = "https://creditcoin-testnet.blockscout.com";
const decisionTx = "0xe8b2a92dc044bdd6d8a05b25ef731ad7f61ac614d0fcf6944b2a1e1fbcfb7d0f";
const sourceTx = "0xa4c4659d9f42b2fee82ae8e46411806d511d8d931404a93e326482dc5173c7ca";
const proofDigest = "0x496d106cdeacc7cc0bd595195d19dc2ca697d0fb7aef642d8779e589d3d89066";
const collateralVault = "0x62C98EE377a9D21c9793Bef58156f8E1272cA1Cf";
const collateralAuthority = "0xf1ffB0c8d934E43Ca8A44009c119098DCd3D562F";
const collateralDepositTx = "0x38eef42991aaf1adcdf3054572d0fbee4413c3c80e7a32a9810f3dc6afdb23cc";
const collateralProofTx = "0xe32aec9434215fe0130effaa622d9cf0c9470ea0a4f2021a46adb7193f00308a";
const proposalTx = "0xb6d9dfe4b14694afdb33b2e461ce8f42d6623224c4d9aacef72668644fd82915";
const withdrawalTx = "0x7ffaee6bcb1513b9a8e7118992b780b2238705578e203ce1d35d796ad55fb4c7";
const withdrawalProofTx = "0x1a5b9f78c1b407a796e0d8e8d76f33629f4d965716ebe396c85adca17e28fc84";

const authorityFlow = [
  ["Ethereum Sepolia Collateral Vault", "Deposit + withdrawal confirmed", "Onchain Verified", "onchain"],
  ["USC Collateral Proof", "Deposit + withdrawal verified", "Onchain Verified", "onchain"],
  ["Creditcoin CC3 Verification", "Lifecycle facts accepted", "Onchain Verified", "onchain"],
  ["Verified Collateral", "0.0005 ETH", "Onchain Verified", "onchain"],
  ["Agent Risk Budget", "0.0001 ETH — reduced", "Onchain Verified", "onchain"],
  ["Market Regime", "RISK_OFF — safe fallback", "Locally Validated", "local"],
  ["AI Proposal", "REFER · allocation 0", "Locally Validated", "local"],
  ["Guardrail Result", "PASSED · zero allocation", "Locally Validated", "local"],
  ["Onchain Proposal Record", "Recorded on CC3", "Onchain Verified", "onchain"],
];

export default function Home() {
  return <main>
    <header><div><span className="eyebrow">ATTESTAI</span><h1>Verified Collateral.<br />Adaptive Intelligence.</h1><p className="subhead">Trust infrastructure for autonomous financial agents.</p></div><div className="safety">TESTNET ONLY<br /><strong>REAL-MONEY EXECUTION DISABLED</strong></div></header>
    <section className="manifesto"><span>Creditcoin verifies the facts.</span><span>AI interprets the facts.</span><span>Rules protect capital. AI adapts strategy.</span></section>

    <section className="sectionHead"><div><span className="eyebrow">VERIFIED COLLATERAL + ADAPTIVE AI AUTHORITY</span><h2>Judge-ready authority flow</h2></div><p>Deposit and withdrawal facts are USC verified on CC3. Authority fell from 0.0002 ETH to 0.0001 ETH after the proven withdrawal.</p></section>
    <div className="flow">{authorityFlow.map(([label, value, provenance, state], index) => <div className="flowStep" key={label}><span className="stepNo">{String(index + 1).padStart(2, "0")}</span><div><b>{label}</b><span className={`state ${state}`}>{provenance}</span><span>{value}</span></div></div>)}</div>

    <div className="grid summaryGrid">
      <article className="card"><span className="eyebrow">VERIFICATION — WHAT IS TRUE?</span><h2>Reconstructed vault state</h2><p>Only USC-proven <code>CollateralDeposited</code> and <code>CollateralWithdrawn</code> events change verified collateral. Generic wallet RPC balances never count.</p><div className="metricRow"><span>Current verified collateral</span><strong>0.0005 ETH</strong></div></article>
      <article className="card"><span className="eyebrow">AUTHORITY — WHAT IS ALLOWED?</span><h2>Deterministic risk budget</h2><p>Budget equals 20% of verified collateral, bounded by 0.01 ETH per-proposal and 0.05 ETH absolute caps. The proven withdrawal reduced authority.</p><div className="metricRow"><span>Current proposal limit</span><strong>0.0001 ETH</strong></div></article>
      <article className="card"><span className="eyebrow">AI — WHAT SHOULD WE DO?</span><h2>Adaptive regime proposal</h2><p>Market data was deliberately unavailable. Strict schema validation produced the safe fallback: RISK_OFF posture, REFER action, confidence 0, and allocation 0.</p><div className="metricRow"><span>Recorded fallback</span><strong>REFER</strong></div></article>
      <article className="card"><span className="eyebrow">GUARDRAIL RESULT</span><h2>AI cannot self-authorize</h2><p>The zero-allocation fallback passed. Proposals above current verified authority remain blocked regardless of confidence, reasoning, or model. Execution is disabled.</p><div className="metricRow"><span>Current result</span><strong className="green">PASSED · 0 ETH</strong></div></article>
    </div>

    <div className="grid liveCollateral"><article className="card"><span className="eyebrow">PUBLIC COLLATERAL EVIDENCE</span><h2>Real USC-verified deposit</h2><dl><dt>Sepolia vault</dt><dd><a href={`https://sepolia.etherscan.io/address/${collateralVault}`} target="_blank">{collateralVault.slice(0, 12)}...</a></dd><dt>Deposit transaction</dt><dd><a href={`https://sepolia.etherscan.io/tx/${collateralDepositTx}`} target="_blank">{collateralDepositTx.slice(0, 12)}...</a></dd><dt>CC3 deposit proof</dt><dd><a href={`${explorer}/tx/${collateralProofTx}`} target="_blank">{collateralProofTx.slice(0, 12)}...</a></dd><dt>CC3 proposal record</dt><dd><a href={`${explorer}/tx/${proposalTx}`} target="_blank">{proposalTx.slice(0, 12)}...</a></dd></dl></article><article className="card"><span className="eyebrow">AUTHORITY REDUCTION EVIDENCE</span><h2>Withdrawal verified on CC3</h2><p>The vault and CC3 reconstructed state now agree at 0.0005 ETH. The 20% authority budget decreased from 0.0002 ETH to 0.0001 ETH.</p><dl><dt>Sepolia withdrawal</dt><dd><a href={`https://sepolia.etherscan.io/tx/${withdrawalTx}`} target="_blank">{withdrawalTx.slice(0, 12)}...</a></dd><dt>CC3 withdrawal proof</dt><dd><a href={`${explorer}/tx/${withdrawalProofTx}`} target="_blank">{withdrawalProofTx.slice(0, 12)}...</a></dd></dl></article></div>

    <section className="asyncNotice"><span className="eyebrow">ASYNCHRONOUS CROSS-CHAIN STATE</span><p>Authority reflects only vault events proven and applied on CC3, not instantaneous Sepolia state. A pending Sepolia withdrawal does not reduce CC3 authority until its USC proof is accepted. Real-money execution remains disabled.</p></section>

    <section className="sectionHead evidenceHead"><div><span className="eyebrow">PRESERVED LIVE EVIDENCE</span><h2>Existing Sepolia → USC → CC3 decision</h2></div><p>This evidence belongs to the original market-signal path, not the new collateral prototype.</p></section>
    <div className="grid"><article className="hero card"><span className="eyebrow">ONCHAIN DECISION</span><strong>HOLD</strong><div className="metrics"><span>Confidence <b>78%</b></span><span>Risk <b className="green">LOW</b></span></div><p>USC proof accepted by the Creditcoin destination contract. No real-money execution is enabled.</p></article><article className="card"><span className="eyebrow">PROOF INSPECTOR</span><h2>Verified market-signal provenance</h2><p className="state onchain">Onchain Verified</p><dl><dt>Sepolia transaction</dt><dd><a href={`https://sepolia.etherscan.io/tx/${sourceTx}`} target="_blank">{sourceTx.slice(0, 12)}...</a></dd><dt>Creditcoin transaction</dt><dd><a href={`${explorer}/tx/${decisionTx}`} target="_blank">{decisionTx.slice(0, 12)}...</a></dd><dt>Proof digest</dt><dd>{proofDigest.slice(0, 14)}...</dd></dl><div className="legend"><span className="state simulated">Simulated</span><span className="state local">Locally Validated</span><span className="state onchain">Onchain Verified</span></div></article></div>

    <div className="grid whyGrid"><article className="card"><span className="eyebrow">WHY ATTESTCOIN?</span><h2>Authority needs verified facts</h2><p>Without USC, an agent would trust a bridge, indexer, or RPC assertion. AttestAI instead authorizes capital only from cryptographically verified source-contract events.</p></article><article className="card"><span className="eyebrow">WHY AI?</span><h2>Markets change regimes</h2><p>Rules define the capital boundary. Adaptive reasoning interprets trend, range, volatility, and risk-off conditions inside that boundary. Returns are never guaranteed.</p></article></div>
  </main>;
}
