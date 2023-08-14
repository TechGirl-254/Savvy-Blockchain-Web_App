import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { contractABI, contractAddress } from '../utils/constants';
import PropTypes from 'prop-types';

export const TransactionContext = React.createContext();

//const { ethereum } = window;

const getEthereumContract = async () => {
    let signer = null;
    let provider;

    if (window.ethereum == null) {
        console.log("MetaMask not installed; using read-only defaults");
        provider = ethers.getDefaultProvider();
    } else {
        provider = new ethers.BrowserProvider(window.ethereum);
        signer = provider.getSigner();
    }

    const transactionContract = new ethers.Contract(contractAddress, contractABI, signer);

    return transactionContract;
};

export const TransactionProvider = ({ children }) => {

    const [currentAccount, setCurrentAccount] = useState("");
    const [formData, setformData] = useState({ addressTo: "", amount: "", keyword: "", message: "" });
    const [isLoading, setIsLoading] = useState(false);
    const [transactionCount, setTransactionCount] = useState(localStorage.getItem('transactionCount'));

    const handleChange = (e, name) => {
        setformData((prevState) => ({ ...prevState, [name]: e.target.value }));
    };

    const getAllTransactions = async () => {
        try {
            if (!window.ethereum) return alert("Please install MetaMask Wallet.");

            const transactionContract = getEthereumContract();
            const availableTransactions = await transactionContract.getAllTransactions

            console.log(availableTransactions)
        } catch (error) {
            console.log(error);
        }
    }

    const checkIfWalletIsConnected = async () => {
        try {
            if (!window.ethereum) return alert("Please install MetaMask Wallet.");

            const accounts = await window.ethereum.request({ method: 'eth_accounts' });

            if (accounts.length) {
                setCurrentAccount(accounts[0]);
                // get all the transactions once you finish setting up the front-end;

                getAllTransactions();
            } else {
                console.log('No accounts found');
            }
        } catch (error) {
            console.log(error);
            throw new Error("No Ethereum object.")
        }
    };

    const checkIfTransactionsExist = async () => {
        try {
            const transactionContract = getEthereumContract();
            const transactionCount = await transactionContract.transactionCount();

            window.localStorage.setItem('transactionCount', transactionCount);
        } catch (error) {
            console.log(error);
            throw new Error("No Ethereum object.")
        }
    }

    const connectWallet = async () => {
        try {
            if (!window.ethereum) return alert("Please install MetaMask Wallet.");

            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });

            setCurrentAccount(accounts[0]);
        } catch (error) {
            console.log(error);
            throw new Error("No Ethereum object.")
        }
    };
    
    useEffect(() => {
        window.onload = () => {
            checkIfWalletIsConnected();
        };
    }, []);

    const sendTransaction = async () => {
        try {
            if (!window.ethereum) return alert("Please install MetaMask Wallet.");

            const { addressTo, amount, keyword, message } = formData;

        const transactionContract = getEthereumContract();
        
        const parsedAmount = ethers.parseEther(amount);

        await window.ethereum.request ({
            method: 'eth_sendTransaction',
            params: [{
                from: currentAccount,
                to: addressTo,
                gas: '0x5308',
                value: parsedAmount.hex,
            }]
        }

        );

        const transactionHash = await transactionContract.addToBlockchain(addressTo, parsedAmount, message, keyword);

        setIsLoading(true);
        console.log(`Loadiing - ${transactionHash.hash}`);
        await transactionHash.wait();

        setIsLoading(false);
        console.log(`Success - ${transactionHash.hash}`);

        const transactionCount = await transactionContract.transactionCount();

        setTransactionCount(transactionCount.toNumber());

        } catch (error) {
            console.log(error);
            throw new Error("No ethereum object")
        }
    };

    return (
        <TransactionContext.Provider value={{ connectWallet, currentAccount, formData, setformData, handleChange, sendTransaction }}>
            {children}
        </TransactionContext.Provider>
    );

};

TransactionProvider.propTypes = {
    children: PropTypes.node.isRequired,
    checkIfTransactionsExist: PropTypes.func
};

export default TransactionProvider;
