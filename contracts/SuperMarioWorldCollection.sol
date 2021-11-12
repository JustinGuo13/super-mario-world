// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract SuperMarioWorldCollection is ERC1155, Ownable {
	
	string public name;
	string public symbol;
	string public baseUri;
	uint256 public tokenCount;
	
	constructor(string memory _name, string memory _symbol, string memory _baseUri) ERC1155(_baseUri) {
		name = _name;
		symbol = _symbol;
		baseUri = _baseUri;

	}


	function mint(uint256 amount) public onlyOwner {
		tokenCount += 1;
		_mint(msg.sender, tokenCount, amount, "");

	}

	function uri(uint256 _tokenId) override public view returns(string memory) {
		return string(
			abi.encodePacked(baseUri, Strings.toString(_tokenId),".json")
		);
		
	}
}

