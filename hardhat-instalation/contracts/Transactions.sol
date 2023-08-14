// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Creating a contract called Transactions
//This contract is the equivalent of a class in OOP

contract Transactions {
    uint256 transactionCount; //Int var containing the number of transactions

    event Transfer(address from, address receiver, uint amount, string message, uint256 timestamp, string keyword); //A function that will be called later

    struct TransferStruct { //specifies the properties and types in event
        address sender;
        address receiver;
        uint amount;
        string message;
        uint256 timestamp;
        string keyword;
    }

    TransferStruct[] transactions; //An array that stores all transactions

    function addToBlockchain(address payable receiver, uint amount, string memory message, string memory keyword) public {

        transactionCount += 1;

        //push the transaction into the array
        transactions.push(TransferStruct(msg.sender, receiver, amount, message, block.timestamp, keyword));

        //emit the event to send transaction to the blockchain
        emit Transfer(msg.sender, receiver, amount, message, block.timestamp, keyword);
    }
    function getAllTransactions() public  view returns (TransferStruct[] memory){
        return transactions;
    }
    function getTransactionCount() public view returns (uint256) {
        return transactionCount;
    }
}
