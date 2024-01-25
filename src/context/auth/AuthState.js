import React, { useReducer, useEffect } from 'react';
import setAuthToken from '../../utils/setAuthToken';
import axios from '../axiosConfig';
import { toast } from 'react-toastify';
import AuthContext from './authContext';
import authReducer from './authReducer';
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  SET_CURRENT,
  LOGIN_FAIL,
  LOGOUT,
} from '../Types';

const AuthState = (props) => {
  const initialState = {
    user: null,
    currentUser: null,
    token: localStorage.token,
    isUserAuthenticated: null,
    updatedSuccessfully: false,
    userLoading: true,
    error: null,
  };

  const [state, dispatch] = useReducer(authReducer, initialState);

  // Register user
  const register = async (formData) => {

    try {
      const registrationPromise = new Promise((resolve, reject) => {
        axios
          .post('/api/user/register', JSON.stringify(formData))
          .then((res) => {
            dispatch({
              type: REGISTER_SUCCESS,
              payload: res.data,
            });

            resolve(res);
          })
          .catch((err) => {
            dispatch({
              type: REGISTER_FAIL,
              payload: err.response.data,
            });

            reject(err);
          });
      });

      toast.promise(registrationPromise, {
        pending: 'Registering...',
        success: 'Registration successful! If you are a supplier, you will receive an acceptance email. Otherwise, please return to the homepage and log in.',
        error: `Registration failed: ${state.error ? state.error.error : "Try again!"}`,
      });
      state.error = null;
    } catch (error) {
      toast.error(`${state.error.error}`);
    }

  };



  // login user
  const userLogin = async (formData) => {
    try {
      const res = await axios.post('api/user/login', formData);

      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      });
      loadUser();
      toast.success('Login successful!');
      console.log(res);
    } catch (err) {
      dispatch({
        type: LOGIN_FAIL,
        payload: err.response.data.error,
      });


      console.log('error ', err.response.data);
    }
  };

  // logout
  const logout = () => dispatch({ type: LOGOUT });

  // load user
  const loadUser = async () => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }


    try {
      const res = await axios.get('api/user');
      dispatch({
        type: USER_LOADED,
        payload: res.data,
      });
    } catch (error) {
      dispatch({
        type: AUTH_ERROR,
      });
    }
  };


 

  // set current
  const setCurrent = (user) => {
    dispatch({ tpe: SET_CURRENT, payload: user });
  };

  // set token on initial app loading
  setAuthToken(state.token);

  // load user on first run or refresh
  if (state.userLoading) {
    loadUser();
  }

  // 'watch' state.token and set headers and local storage on any change
  useEffect(() => {
    setAuthToken(state.token);
  }, [state.token]);

  // AuthState Provider Component
  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        currentUser: state.currentUser,
        error: state.error,
        userLoading: state.userLoading,
        isUserAuthenticated: state.isUserAuthenticated,
        register,
        userLogin,
        setCurrent,
        logout,
        loadUser,

      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
export default AuthState;
