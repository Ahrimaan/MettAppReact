const AUTH_INFO_KEY = 'authInfo';

export function getBearerToken(token){
    let idToken = token ? token : localStorage.getItem(AUTH_INFO_KEY);
    if(idToken){
        return `Bearer ${token ? token : JSON.parse(idToken).idToken}`; 
    }
    return null;
}