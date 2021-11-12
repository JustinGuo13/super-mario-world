import styled from 'styled-components';
import '../styles/globals.css';
import { useState } from 'react';
import { ethers } from 'ethers';

import { NFTCard } from '../components/NFTCard';
import { NFTModal } from '../components/NFTModal';

const axios = require('axios');

function MyApp({ Component, pageProps }) {
	const [showModal, setShowModal] = useState(false);
	const [selectedNft, setSelectedNft] = useState();
	const [nfts, setNfts] = useState(initialNfts);

	let initialNfts = [
		{ name: 'Mario', symbol: 'SMWC', copies: 10, image: 'https://via.placeholder.com/150' },
		{ name: 'Luigi', symbol: 'SMWC', copies: 10, image: 'https://via.placeholder.com/150' },
		{ name: 'Yoshi', symbol: 'SMWC', copies: 10, image: 'https://via.placeholder.com/150' },
		{
			name: 'Donkey Kong',
			symbol: 'SMWC',
			copies: 10,
			image: 'https://via.placeholder.com/150',
		},
		{ name: 'Mario', symbol: 'SMWC', copies: 10, image: 'https://via.placeholder.com/150' },
		{ name: 'Luigi', symbol: 'SMWC', copies: 10, image: 'https://via.placeholder.com/150' },
		{ name: 'Yoshi', symbol: 'SMWC', copies: 10, image: 'https://via.placeholder.com/150' },
		{
			name: 'Donkey Kong',
			symbol: 'SMWC',
			copies: 10,
			image: 'https://via.placeholder.com/150',
		},
	];

	function toggleModal(i) {
		if (i >= 0) {
			setSelectedNft(nfts[i]);
		}
		setShowModal(!showModal);
	}

	async function getNfts(address) {
		const rpc = 'https://rpc-mumbai.maticvigil.com/'; //Alchemy
		const ethersProvider = new ethers.providers.JsonRpcProvider(rpc);

		let abi = [
			'function symbol() public view returns(string memory)',
			'function tokenCount() public view returns(uint256)',
			'function uri(uint256 _tokenId) public view returns(string memory)',
			'function balanceOfBatch(address[] accounts, uint256[] ids) public view returns(uint256[])',
		];

		let nftCollection = new ethers.Contract(
			'0xAE0853C31A90f83570184046181349CF9474c106',
			abi,
			ethersProvider
		);
	}
	return (
		<div>
			<Container>
				<Title>Super Mario World Collection</Title>
				<Subtitle>The rarest and best of Super Mario World</Subtitle>
				<Grid>
					{nfts.map((nft, i) => (
						<NFTCard nft={nft} key={i} toggleModal={() => toggleModal(i)} />
					))}
				</Grid>
			</Container>
			{showModal && <NFTModal nft={selectedNft} toggleModal={() => toggleModal()} />}

			<Component {...pageProps} />
		</div>
	);
}

const Title = styled.h1`
	margin: 0;
	text-align: center;
`;

const Subtitle = styled.h4`
	color: gray;
	margin-top: 0;
	text-align: center;
`;

const Container = styled.div`
	width: 70%;
	max-width: 1200px;
	margin: auto;
	margin-top: 100px;
`;

const Grid = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr 1fr 1fr;
	row-gap: 40px;
`;
export default MyApp;
