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

export function login() {
    return new Promise((resolve, reject) => {
        lock.show();
        lock.on("authenticated", (authResult) => {
            let tokenInfo = {
                accessToken: authResult.accessToken,
                expires: calculateExpirationDate(authResult.expiresIn)
            };
            localStorage.setItem("authInfo", JSON.stringify(tokenInfo));
            lock.getUserInfo(authResult.accessToken, (error, profile) => {
                if (error) {
                    // Handle error
                    return reject(error);
                }

                localStorage.setItem("profile", JSON.stringify(profile));
                lock.hide();
                return resolve(profile);
            });
        });
    });
}

export function getCurrentProfile(){
    let profile = localStorage.getItem("profile");
    return profile ? JSON.parse(profile) : null;
}

export function logout(){
    localStorage.clear();
}

function calculateExpirationDate(expiresIn){
    let cur = new Date();
    cur.setSeconds(cur.getSeconds() + expiresIn);
    return cur;
}