"use client";
import { DynamicContextProvider } from "@dynamic-labs/sdk-react-core";
import { EthereumWalletConnectors } from "@dynamic-labs/ethereum";
import { DynamicWagmiConnector } from "@dynamic-labs/wagmi-connector";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { mainnet } from "viem/chains";
import { createConfig, WagmiProvider, http } from "wagmi";

const mantleSepoliaChain = {
  id: 5003,
  name: "Mantle Sepolia Testnet",
  nativeCurrency: { name: "Mantle Sepolia Testnet", symbol: "MNT", decimals: 18 },
  rpcUrls: {
    default: { http: ["https://rpc.sepolia.mantle.xyz"] },
  },
  blockExplorers: {
    default: { name: "Mantle Sepolia Testnet", url: "https://sepolia.mantlescan.xyz" },
  },
};

const evmNetworks = [
  {
    blockExplorerUrls: ['https://sepolia.mantlescan.xyz'],
    chainId: 5003,
    chainName: "Mantle Sepolia Testnet",
    iconUrls: ["https://app.dynamic.xyz/assets/networks/mantle.svg"],
    name: "Mantle Sepolia Testnet",
    nativeCurrency: {
      decimals: 18,
      name: "Mantle Sepolia Testnet",
      symbol: "MNT",
      iconUrl: "https://app.dynamic.xyz/assets/networks/mantle.svg",
    },
    networkId: 5003,
    rpcUrls: ["https://rpc.sepolia.mantle.xyz"],
    vanityName: "Mantle Sepolia Testnet",
  },
  
  {
    blockExplorerUrls: ['https://polygonscan.com/'],
    chainId: 137,
    chainName: 'Matic Mainnet',
    iconUrls: ["https://app.dynamic.xyz/assets/networks/polygon.svg"],
    name: 'Polygon',
    nativeCurrency: {
      decimals: 18,
      name: 'MATIC',
      symbol: 'MATIC',
      iconUrl: 'https://app.dynamic.xyz/assets/networks/polygon.svg',
    },
    networkId: 137,
    rpcUrls: ['https://polygon-rpc.com'],
    vanityName: 'Polygon',
  },
];

const queryClient = new QueryClient();
const config = createConfig({
  chains: [mainnet, mantleSepoliaChain],
  multiInjectedProviderDiscovery: false,
  transports: {
    [mainnet.id]: http(),
    [mantleSepoliaChain.id]: http(),
  },
});

export default function Providers({ children }) {
  return (
    <DynamicContextProvider
      settings={{
        environmentId: "9b0e766d-95a5-44a3-91f2-3f90b90f4342",
        walletConnectors: [EthereumWalletConnectors],
        overrides: { evmNetworks },
      }}
    >
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <DynamicWagmiConnector>{children}</DynamicWagmiConnector>
        </QueryClientProvider>
      </WagmiProvider>
    </DynamicContextProvider>
  );
}