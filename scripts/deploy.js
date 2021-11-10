const { ethers } = require('hardhat');

async function main() {
	const SuperMarioWorld = await ethers.getContractFactory('SuperMarioWorldOZ');
	const superMarioWorld = await SuperMarioWorld.deploy('SuperMarioWorldOZ', 'SPRMO');

	await superMarioWorld.deployed();
	console.log('Success! Contract was deployed to: ', superMarioWorld.address);

	await superMarioWorld.mint(
		'https://ipfs.io/ipfs/Qmf5TwUGx4uCmmvzvwrckGRYg6aJXvshGiBV8Q5Txvsdcp'
	);

	console.log('NFT successfully minted');
}
main()
	.then(() => process.exit(0))
	.catch((error) => {
		console.error(error);
		process.exit(1);
	});
