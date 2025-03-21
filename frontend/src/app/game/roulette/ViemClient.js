import { createPublicClient, http, createWalletClient, custom } from 'viem'
import { polygon, mainnet, mantleSepoliaTestnet } from 'viem/chains'
import dynamic from 'next/dynamic';


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
    chain: mantleSepoliaTestnet,
    transport: http()
});

export const walletMantleSepoliaClient = dynamic(() => createWalletClient({
    chain: mantleSepoliaTestnet,
    transport: custom(window.ethereum)
}))