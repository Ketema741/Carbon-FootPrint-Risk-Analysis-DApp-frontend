import React from 'react';

const SelectWithLabel = ({ label, value, onChange, options }) => {
  return (
    <div className="mb-[10px]">
      <div className="font-epilogue font-medium text-[14px] leading-[22px] text-[#808191] mb-[10px]">
        {label}
      </div> 
      <select
        value={value}
        onChange={(e) => onChange(e)}
        className="text-white bg-[#4b5264] border-[#3a3a43]  rounded p-2"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectWithLabel;
