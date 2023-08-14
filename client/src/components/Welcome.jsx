import React, { useContext } from "react";
import { AiFillPayCircle } from "react-icons/ai";
import { SiEthereum } from 'react-icons/si';
import { BsInfoCircle } from 'react-icons/bs';

import { TransactionContext } from "../context/TransactionContext";
import { Loader } from './';
import { shortenAddress } from "../utils/shortenAddress";

const companyCommonStyles = "min-h-[70px] sm:px-0 px-2 sm:min-w-[120px] flex justify-center items-center border-[0.5px] border-gray-400 text-sm font-light text-white";

const Input = ({ placeholder, name, type, value, handleChange }) => (
    <input 
    placeholder={placeholder}
    type={type}
    step="0.00001"
    value={value}
    onChange={(e) => handleChange(e, name)}
    className="my-2 w-full rounded-sm p-2 bg-transparent text-white text-semibold border-none text-sm blue-glassmorphism"
    />
);

const Welcome = () => {
    const { connectWallet, currentAccount, formData, sendTransaction, handleChange } = useContext(TransactionContext);

    const handleSubmit = (e) => {
      const { addressTo, amount, keyword, message } = formData;
      //prevents the form from causing the page to reload
      e.preventDefault();
      if (!addressTo || !amount || !keyword || !message) return;
      
      sendTransaction();
    }
  
    return (
      <div className="flex w-full justify-center items-center">
        <div className="md:p-20 py-12 px-4 w-full">
          <div className="flex flex-col md:flex-row justify-between">
            {/* Left Column */}
            <div className="flex flex-col items-start justify-start">
              <h1 className="text-3xl sm:text-5xl text-white text-gradient py-1">
                Savvy Sends Your Crypto <br /> Across the World!
              </h1>
  
              <p className="text-left mt-5 text-white font-medium md:w-9/12 w-11/12 text-base">
                Explore multiple blockchain networks, from Ethereum, Binance, Wamata's Chain, and more.
              </p>
              {!currentAccount && (
                <button
                    type="button"
                    onClick={connectWallet}
                    className="flex flex-row justify-center items-center my-5 bg-[#a828a8] p-2 rounded-full cursor-pointer hover:bg-[#580058]"
                  >
                    <p className="text-white text-base font-semibold">Connect Your Wallet</p>
                  </button>
              )}
                
                <div className="grid sm:grid-cols-3 grid-cols-2 w-full mt-10">
                    <div className={`rounded-tl-2xl ${companyCommonStyles}`}>Scalability</div>
                    <div className={companyCommonStyles}>Simplicity</div>
                    <div className={`rounded-tr-2xl ${companyCommonStyles}`}>Security</div>
                    <div className={`rounded-bl-2xl ${companyCommonStyles}`}>Fast</div>
                    <div className={companyCommonStyles}>Compatible</div>
                    <div className={`rounded-br-2xl ${companyCommonStyles}`}>Free</div>
                  </div>
            </div>
  
            {/* Right Column */}
            <div className="flex flex-col items-center justify-start ml-10 mt-10 md:mt-0">
              <div className="p-3 flex justify-end items-start flex-col rounded-xl h-40 sm:w-72 w-full my-5 eth-card .white-glassmorphism">
                <div className="flex justify-between flex-col w-full h-full">
                  <div className="flex justify-between items-start">
                    <div className="w-10 h-10 rounded-full border-2 border-white flex justify-center items-center">
                        <SiEthereum fontSize={21} color="#fff"/>
                    </div>
                    <BsInfoCircle fontSize={17} color="#fff"/>
                  </div>
                  <div>
                    <p className="text-white font-light text-sm">
                        {shortenAddress(currentAccount)}
                    </p>
                    <p className="text-white font-medium text-lg mt-1">
                        Ethereum
                    </p>
                  </div>
                </div>
              </div>

              {/* A form */}
              <div className="p-5 sm:w-96 w-full flex flex-col justify-start items-center purple-glassmorphism">

                <Input placeholder="Address To" name="addressTo" type="text" handleChange={ handleChange } />
                <Input placeholder="Amount (ETH)" name="amount" type="number" handleChange={ handleChange } />
                <Input placeholder="Keyword (Gif)" name="keyword" type="text" handleChange={ handleChange } />
                <Input placeholder="Enter Message" name="message" type="text" handleChange={ handleChange } />

                <div className="h-[1px] w-full bg-gray-400 my-2" />
                {false ? (
                  <Loader />
                ) : (
                    <button
                    type="button"
                    onClick={handleSubmit}
                    className="text-white font-semibold w-full mt-2 border-[1px] p-2 border-[#580058] hover:bg-[#a828a8] rounded-full cursor-pointer">
                        Submit Now
                    </button>
                )}

              </div>

            </div>
          </div>
        </div>
      </div>
    );
  }
  
export default Welcome;