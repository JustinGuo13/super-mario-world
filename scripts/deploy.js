const { ethers } = require('hardhat');

async function main() {
	const SuperMarioWorld = await ethers.getContractFactory('SuperMarioWorld');
	const superMarioWorld = await SuperMarioWorld.deploy('SuperMarioWorld', 'SPRM');

	await superMarioWorld.deployed();
	console.log('Success! Contract was deployed to: ', superMarioWorld.address);

	await superMarioWorld.mint(
		'https://ipfs.io/ipfs/QmTnujkPgrQDZTHoWPKerTZVdh8qxpmBZ9V2gm6CVkn1sH'
	);

	console.log('NFT successfully minted');
}
main()
	.then(() => process.exit(0))
	.catch((error) => {
		console.error(error);
		process.exit(1);
	});
