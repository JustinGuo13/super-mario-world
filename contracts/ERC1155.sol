// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.4;

contract ERC1155 {
	event TransferSingle(address indexed _operator, address indexed _from, address indexed _to, uint256 _id, uint256 _value);

    event TransferBatch(address indexed _operator, address indexed _from, address indexed _to, uint256[] _ids, uint256[] _values);

    event ApprovalForAll(address indexed _owner, address indexed _operator, bool _approved);
    // event URI()

    // Mapping from TokenID to account balances
    mapping(uint256 => mapping(address => uint256)) internal _balances;

    // Mapping from account to operator approvals
    mapping(address => mapping(address => bool)) private _operatorApprovals;

    // Gets the balance of an accounts tokens
    function balanceOf(address account, uint256 id) public view returns(uint256) {
        require(account != address(0), "Address is zero");
        return _balances[id][account];
    }

    // Gets the balance of multiple accounts tokens
    function balanceOfBatch(address[] memory accounts, uint256[] memory ids) public view returns(uint256[] memory) {
        require(accounts.length == ids.length, "Accounts and ids are not the same length");
        uint256[] memory batchBalances = new uint256[](accounts.length);

        for(uint256 i = 0; i < accounts.length; i++) {
            batchBalances[i] = balanceOf(accounts[i], ids[i]);
        }

        return batchBalances;
    }

    // Checks if an address is an operator for another address
    function isApprovedForAll(address account, address operator) public view returns(bool){
        return _operatorApprovals[account][operator];
    }

    // Enables or disables an operator to manage all of msg.senders assets
    function setApprovalForAll(address operator, bool approved) public {
        _operatorApprovals[msg.sender][operator] = approved;
        emit ApprovalForAll(msg.sender, operator, approved);
    }

     function _transfer(address from, address to, uint256 id, uint256 amount) private {
        uint256 fromBalance = _balances[id][from];
        require(fromBalance >= amount, "Insufficient balance");
        _balances[id][from] = fromBalance - amount;
        _balances[id][to] += amount;
    }

    function safeTransferFrom( address from, address to, uint256 id, uint256 amount) public virtual {
        require( from == msg.sender || isApprovedForAll(from, msg.sender), "Msg.sender is not the owner or approved for transfer");
        require( to != address(0), "Address is 0");
        _transfer(from, to, id, amount);
        emit TransferSingle(msg.sender, from, to, id, amount);

        require(_checkOnERC1155Received(), "Receiver is not implemented");
    }

    function _checkOnERC1155Received() private pure returns(bool) {
        // Oversimplified version
        return true;
    }

    function safeBatchTransferFrom( address from, address to, uint256[] memory ids, uint256[] memory amounts) public {
        require( from == msg.sender || isApprovedForAll(from, msg.sender), "Msg.sender is not the owner or approved for transfer");
        require( to != address(0), "Address is 0");
        require( ids.length == amounts.length, "Ids and amounts are not the same");
        for (uint256 i = 0; i < ids.length; ++i) {
            uint256 id = ids[i];
            uint256 amount = amounts[i];

            _transfer(from, to, id, amount);
        }

        emit TransferBatch(msg.sender, from, to, ids, amounts);
        require(_checkOnBatchERC1155Received(), "Receiver is not implemented");

    }

    function _checkOnBatchERC1155Received() private pure returns(bool) {
        // Oversimplified version
        return true;
    }
	
    // ERC165 Compliant
    // Tell everyone that we support the ERC1155 function
    // interfaceId == 0xd9b67a26
    function supportsInterface(bytes4 interfaceId) public pure virtual returns(bool) {
        return interfaceId == 0xd9b67a26;
    }
}