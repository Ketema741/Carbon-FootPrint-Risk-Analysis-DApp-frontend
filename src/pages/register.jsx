import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from "../context/auth/authContext";

import { CustomButton, FormField } from '../components';


const Register = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  }); 
 
  const handleFormFieldChange = (fieldName, e) => {
    setForm({ ...form, [fieldName]: e.target.value })
  }

  const authContext = useContext(AuthContext);


  const { error, isUserAuthenticated, loadUser, register } = authContext;

  useEffect(() => {
    if (isUserAuthenticated) {
      loadUser();
      navigate("/");
    }
    if (error === "Invalid Credentials") {
      // setAlert(error, 'danger');
    }

    // eslint-disable-next-line
  }, [error, isUserAuthenticated]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    register(form);

  }

  return (
    <div className=" min-w-screen  bg-[#3a3a43] flex items-center justify-center px-5 py-1">

      <div className="mt-24 bg-[#1c1c24] flex justify-center items-center flex-col rounded-[10px] sm:p-10 p-4">
        <div className="flex justify-center items-center p-[16px] sm:min-w-[380px] bg-[#3a3a43] rounded-[10px]">
          <h1 className="font-epilogue font-bold sm:text-[25px] text-[18px] leading-[38px] text-white">Join the CO2 Footprint Risk Analysis  DAPP</h1>
        </div>
        <h1 className="font-epilogue font-medium sm:text-[20px] text-[13px] leading-[33px] text-white">
          <small>Create Account</small>
        </h1>

        <form onSubmit={handleSubmit} className="w-full mt-[65px] flex flex-col gap-[30px]">
          <div className="flex flex-wrap gap-[40px]">
            <FormField
              labelName="First Name *"
              placeholder="Amber"
              inputType="text"
              value={form.firstName}
              handleChange={(e) => handleFormFieldChange('firstName', e)}
            />
            <FormField
              labelName="Last Name *"
              placeholder="Girma"
              inputType="text"
              value={form.lastName}
              handleChange={(e) => handleFormFieldChange('lastName', e)}
            />
          </div>
          <div className="flex flex-wrap gap-[40px]">
            <FormField
              labelName="Email *"
              placeholder="someone@gmail.com"
              inputType="text"
              value={form.email}
              handleChange={(e) => handleFormFieldChange('email', e)}
            />

          </div>

          <div className="flex flex-wrap gap-[40px]">
            <FormField
              labelName="Password *"
              placeholder=""
              inputType="text"
              value={form.password}
              handleChange={(e) => handleFormFieldChange('password', e)}
            />

          </div>

          <div className="flex justify-center items-center mt-[40px]">
            <CustomButton
              btnType="submit"
              title="Register"
              styles="bg-[#1dc071]"
            />
          </div>
        </form>
      </div>
    </div>
  )
}

export default Register