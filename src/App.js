import React, { Component } from 'react';
import { StyleSheet, Text, View, SafeAreaView,YellowBox } from 'react-native';
import { createStore, applyMiddleware, combineReducers } from "redux";
import { Provider } from "react-redux";
import { COLOR } from './config/styles';
import axios from 'axios';
import axiosMiddleware from 'redux-axios-middleware';
import { AuthStack } from './config/router';
import ROOT from "./screens/root";
import * as reducers from './reducers';
import thunk from "redux-thunk";

import {
  createStackNavigator
} from "react-navigation-stack";
import FlashMessage from "react-native-flash-message";

console.disableYellowBox = true;

const client = axios.create({
    baseURL: 'https://www.begalileo.com/',
    responseType: 'json'
  });

  client.interceptors.request.use(request=>{
    console.log('Starting Request', JSON.stringify(request, null, 2));
    return request;
  })
  client.interceptors.response.use(response=>{
    console.log('Response:', JSON.stringify(response.data, null, 2))
    return response;
  })
  
  const reducer = combineReducers(reducers);


  const store = createStore(reducer, applyMiddleware(thunk,axiosMiddleware(client)));


  export default class App extends Component {
    render() {
      return (
        <Provider store={store}>
          <SafeAreaView style={styles.container}>
            <ROOT />
            <FlashMessage position="top" />
          </SafeAreaView>
        </Provider>
      );
    }
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: COLOR.WHITE
    }
  });