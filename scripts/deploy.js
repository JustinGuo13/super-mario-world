const { ethers } = require('hardhat');

async function main() {
	const SuperMarioWorld = await ethers.getContractFactory('SuperMarioWorldERC1155');
	const superMarioWorld = await SuperMarioWorld.deploy('SuperMarioWorldERC1155', 'SPRME');

	await superMarioWorld.deployed();
	console.log('Success! Contract was deployed to: ', superMarioWorld.address);

	await superMarioWorld.mint(
		10,
		'https://ipfs.io/ipfs/QmQmvzMFFZcqhgcCB9QbzqMbYdMfXB4qSYVgWfqDrp2pHA'
	);

	console.log('NFT successfully minted');
}
main()
	.then(() => process.exit(0))
	.catch((error) => {
		console.error(error);
		process.exit(1);
	});
