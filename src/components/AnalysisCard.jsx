import React from 'react';

const AnalysisCard = ({ item }) => {
  const { analysisRequest, analysisResult, storedTimestamp } = item;
  const timeStamp = `Analysis at ${storedTimestamp}`
  
  return ( 
    <div className="sm:w-[500px] w-full rounded-[15px] bg-[#1c1c24] cursor-pointer" >
      <div className="flex flex-col p-4">
        <div className="flex flex-row items-center mb-[18px]">
          <p className="ml-[12px] mt-[2px] font-epilogue font-medium text-[12px] text-[#808191]">
            {timeStamp}
          </p>
        </div>

        <div className="block">
          <h3 className="font-epilogue font-semibold text-[16px] text-white text-left leading-[26px] wrap">
            <pre style={{ whiteSpace: "pre-line" }}>
              {analysisRequest}
            </pre>
          </h3>
          <p className="mt-[5px] font-epilogue font-normal text-[#808191] text-left leading-[18px] wrap">
            {analysisResult}
          </p>
        </div>
      </div>
    </div>
  )
}

export default AnalysisCard