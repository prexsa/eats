import axios from 'axios';
import { browserHistory } from 'react-router';
import {
  AUTH_USER, 
  UNAUTH_USER, 
  AUTH_ERROR, 
  FETCH_MESSAGE, 
  FETCH_RESTAURANT,
  FETCH_BUSINESS_HOURS,
  FETCH_BUSINESS_REVIEWS,
  FETCH_SCRAPE,
  FETCH_GEOLOCATION_AREA,
  GET_LOCATION,
  GET_FOURSQUARES,
  GET_TRENDING,
  GET_HOT_AND_NEW
} from './types';

const ROOT_URL = 'http://localhost:3090';

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

export function getFoursquares() {
  return function(dispatch) {
    axios.get(`${ROOT_URL}/foursquare`)
      .then(resp => {
        dispatch({
          type: GET_FOURSQUARES,
          payload: resp.data
        })
      })
  }
}

export function getTrending() {
  return function(dispatch) {
    axios.get(`${ROOT_URL}/trending`)
      .then(resp => {
        dispatch({
          type: GET_TRENDING,
          payload: resp.data
        })
      })
  }
}

export function getHotAndNew() {
  return function(dispatch) {
    axios.get(`${ROOT_URL}/new`)
      .then(resp => {
        dispatch({
          type: GET_HOT_AND_NEW,
          payload: resp.data
        })
      })
  }
}

export function getlocation() {
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

export function fetchRestaurant(area) {
  // console.log('area: ', area)
  return function(dispatch) {
    axios.post(`${ROOT_URL}/api/search`, { area })
      .then(resp => {
        dispatch({
          type: FETCH_RESTAURANT,
          payload: resp.data
        })
        browserHistory.push('/restaurantdetails');
      })
      .catch(err => {
        console.log(err);
      })
  }
}

export function fetchGeolocationArea(geoCoords) {
  //console.log('geoCoords: ', geoCoords)
  return function(dispatch) {
    axios.post(`${ROOT_URL}/api/geolocation`, { geoCoords })
      .then(resp => {
        dispatch({
          type: FETCH_GEOLOCATION_AREA,
          payload: resp.data
        })
      })
      .catch(err => {
        console.log(err);
      })
  }
}

export function fetchBusinessHours(id) {
  return function(dispatch) {
    axios.post(`${ROOT_URL}/api/hours`, {id})
      .then(resp => {
        dispatch({
          type: FETCH_BUSINESS_HOURS,
          payload: resp.data
        })
      })
      .catch(err => {
        console.log(err);
      })
  }
}

export function fetchBusinessReviews(id) {
  return function(dispatch) {
    axios.post(`${ROOT_URL}/api/reviews`, {id})
      .then(resp => {
        dispatch({
          type: FETCH_BUSINESS_REVIEWS,
          payload: resp.data
        })
      })
      .catch(err => {
        console.log(err);
      })
  }
}

export function fetchScrape(urlLink) {
  return function(dispatch) {
    axios.post(`${ROOT_URL}/api/yelplink`, { urlLink })
      .then(resp => {
        dispatch({
          type: FETCH_SCRAPE,
          payload: resp.data
        })
      })
      .catch(err => {
        console.log(err);
      })
  }
}