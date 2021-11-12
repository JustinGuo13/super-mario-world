const { ethers } = require('hardhat');

async function main() {
	const SuperMarioWorld = await ethers.getContractFactory('SuperMarioWorldCollection');
	const superMarioWorld = await SuperMarioWorld.deploy(
		'SuperMarioWorldCollection',
		'SPWC',
		'https://ipfs.io/ipfs/QmTkC18sCQV8CH86t5WCsTVHeWeSWJJ7uE4KCn8UwMX8aX/'
	);

	await superMarioWorld.deployed();
	console.log('Success! Contract was deployed to: ', superMarioWorld.address);

	await superMarioWorld.mint(10);
	await superMarioWorld.mint(10);
	await superMarioWorld.mint(10);
	await superMarioWorld.mint(10);
	await superMarioWorld.mint(1);
	await superMarioWorld.mint(1);
	await superMarioWorld.mint(1);
	await superMarioWorld.mint(1);

	console.log('NFT successfully minted');
}
main()
	.then(() => process.exit(0))
	.catch((error) => {
		console.error(error);
		process.exit(1);
	});
