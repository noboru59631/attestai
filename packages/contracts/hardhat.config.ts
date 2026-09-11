import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-ethers";

const config: HardhatUserConfig = {
  solidity: { version: "0.8.28", settings: { optimizer: { enabled: true, runs: 200 }, viaIR: true } },
  paths: { sources: "./contracts", tests: "./test" },
  networks: {
    hardhat: { chainId: 31337 },
    sepolia: { url: process.env.SOURCE_RPC_URL ?? "https://ethereum-sepolia-rpc.publicnode.com", chainId: 11155111, accounts: process.env.RELAYER_PRIVATE_KEY ? [process.env.RELAYER_PRIVATE_KEY] : [] },
    creditcoin_usc_testnet: { url: process.env.CREDITCOIN_RPC_URL ?? "wss://rpc.usc-testnet2.creditcoin.network", chainId: 102033, accounts: process.env.RELAYER_PRIVATE_KEY ? [process.env.RELAYER_PRIVATE_KEY] : [] }
  },
};

export default config;
