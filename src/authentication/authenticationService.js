import config from '../config';
import axios from 'axios';
import { getBearerToken } from './bearerToken';

const options = {
    auth: {
        redirect: false
    },
    language: 'de',
    primaryColor: '#31324F',
    languageDictionary: {
        title: "LOGIN"
    }
}

const lock = new Auth0Lock("ksXjhEEZmYjoK3QtYyMpy6Ngnrpb2v0p", "chaosmett.eu.auth0.com", options);

const AUTH_INFO_KEY = 'authInfo';
const PROFILE_KEY = 'profile'

export function login() {
    return new Promise((resolve, reject) => {
        lock.show();
        lock.on("authenticated", (authResult) => {
            let tokenInfo = {
                accessToken: authResult.accessToken,
                idToken: authResult.idToken,
                expires: calculateExpirationDate(authResult.expiresIn)
            };

            lock.getUserInfo(authResult.accessToken, (error, profile) => {
                if (error) {
                    // Handle error
                    return reject(error);
                }
                getUserInformation(profile.sub, tokenInfo.idToken).then(result => {
                    let userInfo = result.data;
                    let user = Object.assign({}, profile, userInfo);
                    localStorage.setItem(AUTH_INFO_KEY, JSON.stringify(tokenInfo));
                    setCurrentProfile(user);
                    lock.hide();
                    return resolve({ user, tokenInfo });
                }).catch(err => {
                    console.error(err);
                });
            });
        });
    });
}

export function fetchUserProfile(userProfile, userInfo) {
    if (userInfo) {
        userProfile.admin = userInfo.isAdmin;
        userProfile.tenant = userInfo.tenantId;
    }
    return userProfile;
}

export function getCurrentProfile() {
    let profile = localStorage.getItem(PROFILE_KEY);
    if (isExpired()) {
        logout();
        return null;
    }

    return profile
        ? JSON.parse(profile)
        : null;
}

export function logout() {
    localStorage.clear();
}

export function updateUser(tentantId) {
    let currentProfile = getCurrentProfile();

    return new Promise((resolve, reject) => {
        let item = {
            tenantId: tentantId,
            mail: currentProfile.email, 
            username: currentProfile.name
        }
        if (config.IsMock) {
            return resolve(item);
        };
        axios.post(config.UserInfoUrl, item, {
            headers: {
                'Authorization': getBearerToken()
            }
        }).then(result => {
            updateStorageUser({ tenant: tentantId });
            resolve({ tenant: tentantId });
        }).catch(err => {
            console.error(err);
            return reject(err);
        })
    });
}

function getUserInformation(userId, idToken) {
    let splittedUserId = userId.split('|')[1];
    console.log([userId, idToken, config.IsMock, config.UserInfoUrl, getBearerToken(idToken)]);
    if (config.IsMock) {
        return {
            "userId": "104452206825748984601",
            "tenantId": "1",
            "isAdmin": "false"
        };
    }
    return axios.get(`${config.UserInfoUrl}/${splittedUserId}`, {
        headers: {
            'Authorization': getBearerToken(idToken)
        }
    });
}

function getUserId() {
    let curProfile = getCurrentProfile();
    let userIdLong = curProfile.sub;
    return userIdLong.split('|')[1];
}

function setCurrentProfile(profile) {
    localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
}

function updateStorageUser(information) {
    let curProfile = getCurrentProfile();
    let newProfile = Object.assign({}, curProfile, information);
    setCurrentProfile(newProfile);
}

function isExpired() {
    let tokenInfoString = localStorage.getItem(AUTH_INFO_KEY);
    if (tokenInfoString) {
        let tokenInfo = JSON.parse(tokenInfoString);
        let expireDate = new Date(tokenInfo.expires);
        let curDate = new Date();
        return expireDate.getTime() < curDate.getTime();
    }
    return true;
}

function calculateExpirationDate(expiresIn) {
    let cur = new Date();
    cur.setSeconds(cur.getSeconds() + expiresIn);
    return cur;
}