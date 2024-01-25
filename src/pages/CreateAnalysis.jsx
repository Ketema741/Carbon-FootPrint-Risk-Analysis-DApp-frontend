import React, { useState, useEffect } from "react";
import { ethers } from "ethers";

import abi from "../contractJson/Carbon_Foot_print.json";
import { CustomButton } from "../components";
import SelectWithLabel from "../components/SelectWithLabel";

import { 
  currencies,
  preferredBlockchainTechnologies,
  investmentSize,
  investmentDuration, 
  riskTolerance,
  carbonFootprintConcerns,
} from "../constants";
import axios from "axios";

const CreateAnalysis = () => {

  const [form, setForm] = useState({
    coinType: "Bitcoin",
    coinTypeinvestmentSize: "Small (up to $1,000)",
    investmentDuration: "Bitcoin",
    riskTolerance: "Short-term (less than 6 months)",
    preferredBlockchainTechnologies: "Proof-of-Work",
    carbonFootprintConcerns: "Low",
  });

  const handleFormFieldChange = (fieldName, e) => {
    setForm({ ...form, [fieldName]: e.target.value });
  };

  const [state, setState] = useState({
    provider: null,
    signer: null,
    contract: null,
  });

  const [account, setAccount] = useState("Not connected");
  useEffect(() => {
    const template = async () => {
      const contractAddres = "0xc261c4f47bC0E7DD86bd9ba5dEa8B7775F023501";
      const contractABI = abi.abi;
      // Metamask part
      // 1. In order do transactions on sepolia testnet
      // 2. Metmask consists of infura api which actually help in connectig to the blockhain

      try {
        const { ethereum } = window;
        const account = await ethereum.request({
          method: "eth_requestAccounts",
        });

        window.ethereum.on("accountsChanged", () => {
          window.location.reload();
        });
        setAccount(account);
        const provider = new ethers.providers.Web3Provider(ethereum); //read the Blockn
        const signer = provider.getSigner(); //write the blockchain

        const contract = new ethers.Contract(
          contractAddres,
          contractABI,
          signer
        );
        console.log(contract);
        setState({ provider, signer, contract });
      } catch (error) {
        console.log(error);
      }
    };
    template();
  }, []);

  const storeAnalyzedResult = async (analysisResult) => {
    const { contract } = state;
    const analysisRequest =  `Carbon Footprint Risk Analysis for  ${form.coinType} Investments`;
    const transaction = await contract.addAnalyzedData(
      analysisRequest,
      analysisResult
    );
    await transaction.wait();
    alert("Transaction is successul");
    window.location.reload();
    console.log(transaction)
  };

  // analysis related

  const [analysisresult, setanalysisresult] = useState();
  const [isloadingAnalysis, setisloadingAnalysis] = useState(false)
  const handleSubmit = async (e) => {
    setisloadingAnalysis(true);
    e.preventDefault();

    axios
      .post("http://dawitiscomming.pythonanywhere.com/endpoint", form)
      .then((response) => {
        setisloadingAnalysis(false);
        setanalysisresult(response.data.chatgpt_response);
      })
      .catch((error) => {
        setisloadingAnalysis(false);
        console.log(error);
      });

    };
  const handleSave = () => {
    storeAnalyzedResult(analysisresult)
  }

  return (
    <div className="bg-[#1c1c24] flex justify-center items-center flex-col rounded-[10px] sm:p-10 p-4">
      <div className="flex justify-center items-center p-[16px] sm:min-w-[380px] bg-[#3a3a43] rounded-[10px]">
        <h1 className="font-epilogue font-bold sm:text-[25px] text-[18px] leading-[38px] text-white">
          Carbon Footprint Risk Analysis for Investments
        </h1>
      </div>
      <h1 className="font-epilogue font-medium sm:text-[20px] text-[13px] leading-[33px] text-white">
        <small>Connected Account - {account}</small>
      </h1>
      {analysisresult && analysisresult.length > 0 ? (
        <>
          <div className="text-gray-100 bg-gray-700 p-5 rounded-lg">
            <pre style={{ whiteSpace: "pre-line" }}>{analysisresult}</pre>
          </div>
          <div className="flex w-full justify-end items-center mt-[10px]">
            <button
              onClick={()=>handleSave()}
              className="bg-[#1dc071] px-5 py-2 rounded-lg mr-10"
            >
              Save
            </button>
            <button
              onClick={() => setanalysisresult("")}
              className="bg-[#1dc071] px-5 py-2 rounded-lg "
            >
              {"Let's"} analyse again
            </button>
          </div>
        </>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="w-full mt-[65px] flex flex-col gap-[30px]"
        >
          <div className="flex flex-wrap gap-[40px]">
            <SelectWithLabel
              label="Coin Type"
              value={form.coinType}
              onChange={(value) => handleFormFieldChange("coinType", value)}
              options={currencies}
            />

            <SelectWithLabel
              label="Investment Size"
              value={form.investmentSize}
              onChange={(value) =>
                handleFormFieldChange("investmentSize", value)
              }
              options={investmentSize}
            />
            <SelectWithLabel
              label="Investment Duration"
              value={form.investmentDuration}
              onChange={(value) =>
                handleFormFieldChange("investmentDuration", value)
              }
              options={investmentDuration}
            />
            <SelectWithLabel 
              label="Risk Tolerance"
              value={form.riskTolerance}
              onChange={(value) =>
                handleFormFieldChange("riskTolerance", value)
              }
              options={riskTolerance}
            />
            <SelectWithLabel
              label="Preferred Blockchain Technologies"
              value={form.preferredBlockchainTechnologies}
              onChange={(value) =>
                handleFormFieldChange("preferredBlockchainTechnologies", value)
              }
              options={preferredBlockchainTechnologies}
            />
            <SelectWithLabel
              label="Carbon Footprint Concerns"
              value={form.carbonFootprintConcerns}
              onChange={(value) =>
                handleFormFieldChange("carbonFootprintConcerns", value)
              }
              options={carbonFootprintConcerns}
            />
          </div>

          <div className="flex justify-center items-center mt-[40px]">
            <CustomButton
              btnType="submit"
              title={isloadingAnalysis ? 'Analysing . . . .' : 'Analyze Investment'}
              styles="bg-[#1dc071]"
            />
          </div>
        </form>
      )}
    </div>
  );
};

export default CreateAnalysis;
