import config from '../config';
import axios from 'axios';

const options = {
    auth: {
        redirect: false
    },
    language:'de',
    primaryColor:'#31324F',
    languageDictionary: {
        title: "LOGIN"
      },
}

const lock = new Auth0Lock(
    "ksXjhEEZmYjoK3QtYyMpy6Ngnrpb2v0p",
    "chaosmett.eu.auth0.com",
    options);

const AUTH_INFO_KEY = 'authInfo';
const PROFILE_KEY = 'profile'
const USER_INFO_URL = 'https://mtuktf362a.execute-api.eu-central-1.amazonaws.com/prod/user';

export function login() {
    return new Promise((resolve, reject) => {
        lock.show();
        lock.on("authenticated", (authResult) => {
            let tokenInfo = {
                accessToken: authResult.accessToken,
                idToken:authResult.idToken,
                expires: calculateExpirationDate(authResult.expiresIn)
            };
            
            lock.getUserInfo(authResult.accessToken, (error, profile) => {
                if (error) {
                    // Handle error
                    return reject(error);
                }
                getUserInformation(profile.sub, tokenInfo.idToken).then(userInfo => {
                    let user = fetchUserProfile(profile,userInfo);
                    localStorage.setItem( AUTH_INFO_KEY, JSON.stringify(tokenInfo));
                    localStorage.setItem(PROFILE_KEY, JSON.stringify(user));
                    lock.hide();
                    return resolve({
                        user,
                        tokenInfo
                    });
                } ).catch(err => {
                    return reject(err);
                });
                
            });
        });
    });
}

export function fetchUserProfile(userProfile, userInfo){
    if(userInfo){
        let user = userInfo.data;
        userProfile.admin = user.isAdmin;
        userProfile.tenant = user.tenantId;
    }
    return userProfile;
}

export function getCurrentProfile(){
    let profile = localStorage.getItem(PROFILE_KEY);
    if (isExpired()){
        logout();
        return null;
    }

    return profile ? JSON.parse(profile) : null;
}

export function getBearerToken(token){
    let idToken = token ? token : localStorage.getItem(AUTH_INFO_KEY);
    if(idToken){
        return `Bearer ${token ? token : JSON.parse(idToken).idToken}`; 
    }
    return null;
}

export function logout(){
    localStorage.clear();
}

function getUserInformation(userId, idToken) {
    let splittedUserId = userId.split('|')[1];
    if(config.IsMock){
        return new Promise((resolve,reject) => {
            resolve({
                "userId": "104452206825748984601",
                "tenantId": "0",
                "isAdmin": "false"
            });
        })
    }
    return axios.get(`${USER_INFO_URL}/${splittedUserId}` , { headers: {
        'Authorization': getBearerToken(idToken)
    } });
}

function isExpired(){
    let tokenInfoString = localStorage.getItem(AUTH_INFO_KEY);
    if(tokenInfoString){
        let tokenInfo = JSON.parse(tokenInfoString);
        let expireDate = new Date(tokenInfo.expires);
        let curDate = new Date();
        return expireDate.getTime() < curDate.getTime();
    }
    return true;
}

function calculateExpirationDate(expiresIn){
    let cur = new Date();
    cur.setSeconds(cur.getSeconds() + expiresIn);
    return cur;
}