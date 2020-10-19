#!/usr/bin/env node
const yargs = require('yargs/yargs')
const { hideBin } = require('yargs/helpers')
const argv = yargs(hideBin(process.argv)).argv

const { ApiPromise, WsProvider } = require('@polkadot/api');

const main = async () =>{
    const wsProvider = new WsProvider('wss://rpc.polkadot.io');
    const api = await ApiPromise.create({ provider: wsProvider });

	if(argv.height){
        const hash = await api.rpc.chain.getBlockHash(argv.height)
        const block = await api.rpc.chain.getBlock(hash)
        console.log(`Block number: ${argv.height}`)
        console.log(`Block hash: ${hash}`)
        console.log(`full block: ${block.block}`)
	}else{
		const block = await api.rpc.chain.getBlock();
		console.log(`The latest block: #${block.block.header.number}`);
        console.log(`The latest block hash: ${block.block.header.hash}`)
        console.log(`The latest full block: ${block.block}`)
	}
	process.exit(0)
}

main()
