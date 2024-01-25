import React, { useState, useEffect } from 'react'
import abi from "../contractJson/Carbon_Foot_print.json"
import { ethers } from "ethers"
import { DisplayAnalysis } from '../components';

const Home = () => {
  const [state, setState] = useState({
    provider: null,
    signer: null,
    contract: null,
  }) 
 
  const [account, setAccount] = useState('Not connected');
  useEffect(() => {
    const template = async () => {

      const contractAddres = "0xc261c4f47bC0E7DD86bd9ba5dEa8B7775F023501";
      const contractABI = abi.abi;

      // Metamask part
      // 1. In order do transactions on sepholi testnet
      // 2. Metmask consists of infura api which actually help in connectig to the blockhain

      try {
        const { ethereum } = window;
        const account = await ethereum.request({
          method: "eth_requestAccounts"
        })

        window.ethereum.on("accountsChanged", () => {
          window.location.reload()
        })
        setAccount(account);
        const provider = new ethers.providers.Web3Provider(ethereum); //read the Blockchain
        const signer = provider.getSigner(); //write the blockchain

        const contract = new ethers.Contract(
          contractAddres,
          contractABI,
          signer
        )
        setState({ provider, signer, contract });

        console.log(contract)

      } catch (error) {
        console.log(error)
      }
    }
    template();
  }, [])

  const [prevAnalysis, setPrevAnalysis] = useState([]);
  const { contract } = state;

  useEffect(() => {
    const getPrevAnalysis = async () => {
      const analysis = await contract.getAllAnalyzedData();

      // Convert BigNumber timestamps to readable format
      const formattedAnalysis = analysis.map(item => {
        const timestamp = new Date(item[2]._hex * 1000).toLocaleString();
        return { analysisRequest: item[0], analysisResult: item[1], storedTimestamp: timestamp };
      });

      setPrevAnalysis(formattedAnalysis);

    }
    contract && getPrevAnalysis();
  }, [contract])

  return (
    <div>
      <h1 className="font-epilogue font-medium sm:text-[20px] text-[13px] leading-[33px] text-white pb-12">
        <small>
          Connected Account - {account}
        </small>
      </h1>
      {prevAnalysis &&
        <DisplayAnalysis
          title="All Campaigns"
          isLoading={false}
          analysis={prevAnalysis}
        />
      }
    </div>
  )
}

export default Home