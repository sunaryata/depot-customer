/* eslint-disable prettier/prettier */
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {BASE_URL} from '../config.js';

export const Init = () => {
  return async dispatch => {
    let token = await AsyncStorage.getItem('token');
    if (token !== null) {
      dispatch({
        type: 'LOGIN',
        payload: token,
      });
    }
  };
};

export const Login = (email, password) => {
  let token = null;
  let refresh = null;
  return async dispatch => {
    axios
      .post(`${BASE_URL}/v1/auth/login/manual`, {
        username: email,
        password: password,
      })
      .then(function (response) {
        token = response.data?.data?.token?.access_token;
        refresh = response.data?.data?.token?.refresh_token;
        AsyncStorage.setItem('token', token);
        AsyncStorage.setItem('refresh_token', refresh);
        dispatch({
          type: 'LOGIN',
          payload: token,
        });
      })
      .catch(function (error) {
        console.log(error.response?.data?.message);
      });
  };
};

export const Update = (email, password) => {
  let token = null;
  let refresh = null;
  return async dispatch => {
    axios
      .post(`${BASE_URL}/v1/transactions/`, {
        username: email,
        password: password,
      })
      .then(function (response) {
        token = response.data?.data?.token?.access_token;
        refresh = response.data?.data?.token?.refresh_token;
        AsyncStorage.setItem('token', token);
        AsyncStorage.setItem('refresh_token', refresh);
        dispatch({
          type: 'LOGIN',
          payload: token,
        });
      })
      .catch(function (error) {
        console.log(error.response?.data?.message);
      });
  };
};

export const Transaction = authAxios => {
  return async dispatch => {
    authAxios
      .get(`${BASE_URL}/v1/transactions`)
      .then(function (response) {
        dispatch({
          type: 'TRANSACTION',
          payload: response.data.data.rows,
        });
      })
      .catch(function (error) {
        console.log(error.response?.data?.message);
      });
  };
};

export const Logout = () => {
  return async dispatch => {
    await AsyncStorage.clear();
    dispatch({
      type: 'LOGOUT',
    });
  };
};
