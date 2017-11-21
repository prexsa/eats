import axios from 'axios';
import { browserHistory } from 'react-router';
import {
  YELP_BUSINESS_DETAILS,
  YELP_AREA_SEARCH,
  YELP_TRANSACTION_TYPE,
  FOURSQUARES_AREA_SEARCH,
  AUTH_USER, 
  UNAUTH_USER, 
  AUTH_ERROR, 
  GET_LOCATION
} from './types';

const ROOT_URL = 'http://localhost:3090';
/********************************************************************
  Get user's geolocation via browser's navigation object
********************************************************************/
export function getLocation() {
  return function(dispatch) {
    const geolocation = navigator.geolocation;

    const location = new Promise((resolve, reject) => {
      if(!geolocation) reject(new Error('Not Supported'));

      geolocation.getCurrentPosition(position => {
        resolve(position);
      }, () => {
        reject(new Error('Permission Denied'))
      })
    }).then(resp => {
      dispatch({
        type: GET_LOCATION,
        payload: resp
      })
    })
  }
}

/********************************************************************
  Yelp API Endpoints
********************************************************************/

export function yelpAreaSearch(geoCoords) {
  //console.log('geoCoords: ', geoCoords)
  return function(dispatch) {
    axios.post(`${ROOT_URL}/yelp/area`, { geoCoords })
      .then(resp => {
        dispatch({
          type: YELP_AREA_SEARCH,
          payload: resp.data
        })
      })
      .catch(err => {
        console.log(err);
      })
  }
}

export function yelpBusinessDetails(id) {
  return function(dispatch) {
    axios.post(`${ROOT_URL}/yelp/business-details`, {id})
      .then(resp => {
        dispatch({
          type: YELP_BUSINESS_DETAILS,
          payload: resp.data
        })
      })
      .catch(err => {
        console.log(err);
      })
  }
}

export function yelpTransactionType() {
  return function(dispatch) {
    axios.post(`${ROOT_URL}/yelp/transaction`)
      .then(resp => {
        dispatch({
          type: YELP_TRANSACTION_TYPE,
          payload: resp.data
        })
      })
      .catch(err => {
        console.log(err);
      })
  }
}

/*export function getHotAndNew() {
  return function(dispatch) {
    axios.get(`${ROOT_URL}/new`)
      .then(resp => {
        dispatch({
          type: GET_HOT_AND_NEW,
          payload: resp.data
        })
      })
  }
}*/



/********************************************************************
  Foursquares API Endpoints
********************************************************************/

export function foursquareAreaSearch(coords) {
  return function(dispatch) {
    axios.post(`${ROOT_URL}/foursquare/search`, { coords })
      .then(resp => {
        dispatch({
          type: FOURSQUARES_AREA_SEARCH,
          payload: resp.data
        })
      })
  }
}

/********************************************************************
  Auth
********************************************************************/

/*
export function login(loginInfo) {
  return function(dispatch) {
    axios.post(`${ROOT_URL}/login`, loginInfo)
      .then(response => {
        dispatch({ type: AUTH_USER });
        localStorage.setItem('token', response.data.token);
        browserHistory.push('/dashboard');
      })
      .catch(() => {
        dispatch(authError('Bad Login Info'));
      });
  }
}

export function register(registerInfo) {
  return function(dispatch) {
    axios.post(`${ROOT_URL}/register`, registerInfo)
      .then(response => {
        dispatch({ type: AUTH_USER });
        localStorage.setItem('token', response.data.token);
        browserHistory.push('/dashboard');
      })
      .catch(() => {
        dispatch(authError('Bad Login Info'));
      });
  }
}

export function logout() {
  localStorage.removeItem('token');
  return function(dispatch) {
    dispatch({ type: UNAUTH_USER });
    browserHistory.push('/');
  }
}*/