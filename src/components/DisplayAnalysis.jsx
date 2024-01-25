import React from 'react'
import { v4 as uuidv4 } from "uuid";
import FundCard from './AnalysisCard';


const DisplayAnalysis = ({ analysis }) => {
  const title = "Carbon Footprint Risk Analysis"
  return (
    <div>
      <h1 className="font-epilogue font-semibold text-[18px] text-white text-left">{title} ({analysis.length})</h1>
      <div className="flex flex-wrap mt-[20px] gap-[26px]">


        {analysis.length === 0 && (
          <p className="font-epilogue font-semibold text-[14px] leading-[30px] text-[#818183]">
            You have not created any analysis yet
          </p>
        )}

        {analysis.length > 0 && analysis.map((item) => <FundCard
          key={uuidv4()}
          item={item}
          handleClick={() => { }}
        />)}
      </div>
    </div>
  )
}

export default DisplayAnalysis