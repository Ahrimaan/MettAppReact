import userService from './userService';

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
                let userInfo = getUserInformation(profile.sub, tokenInfo.idToken);

                let user = fetchUserProfile(profile, userInfo);
                localStorage.setItem(AUTH_INFO_KEY, JSON.stringify(tokenInfo));
                localStorage.setItem(PROFILE_KEY, JSON.stringify(user));
                lock.hide();
                return resolve({user, tokenInfo});

            });
        });
    });
}

export function fetchUserProfile(userProfile, userInfo) {
    if (userInfo) {
        let user = userInfo.data;
        userProfile.admin = user.isAdmin;
        userProfile.tenant = user.tenantId;
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

function getUserInformation(userId, idToken) {
    let splittedUserId = userId.split('|')[1];
    userService.getUserInformation(splittedUserId, idToken).then(result => {
        return result.data;
    }).catch(err => {
        throw err;
    });
    
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