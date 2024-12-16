import { createPublicClient, http, createWalletClient, custom } from 'viem'
import { polygon, mainnet, mantleSepoliaTestnet } from 'viem/chains'
import dynamic from 'next/dynamic';

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

export const publicMainnetClient = createPublicClient({
    chain: mainnet,
    transport: http(),
})

export const publicPolygonClient = createPublicClient({
    chain: polygon,
    transport: http(),
});

export const walletPolygonClient = dynamic(() => createWalletClient({
    chain: polygon,
    transport: custom(window.ethereum)
}))

export const publicMantleSepoliaClient = createPublicClient({
    chain: mantleSepoliaChain,
    transport: http()
});

export const walletMantleSepoliaClient = dynamic(() => createWalletClient({
    chain: mantleSepoliaChain,
    transport: custom(window.ethereum)
}))