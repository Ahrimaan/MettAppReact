import axios from 'axios';
import {hideLoading, showLoading} from './actions';
import {getIdToken} from './authenticationService';

class httpClient {
    constructor() {
        axios.interceptors.request.use(request => {
                console.debug(request);
                showLoading();
                return request;
            }, reject => {
                console.error(reject);
                hideLoading();                
                return reject;
            });
        axios.interceptors.response.use(response => {
            hideLoading();
            console.debug(response);
            return response;
        }, reject => {
            console.error(reject);
            hideLoading();           
            return reject;
        });
    }

    get(url, header) {
        let axiosHeader = {
            Authorization: `Bearer ${getIdToken()}`
        };
        if (header) {
            Object.assign(axiosHeader, axiosHeader, header);
        }

        return axios.get(url, {headers: axiosHeader});
    }
    
    post(url,body, header) {
        let axiosHeader = {
            Authorization: `Bearer ${getIdToken()}`
        };
        if (header) {
            Object.assign(axiosHeader, axiosHeader, header);
        }

        return axios.post(url,body, {headers: axiosHeader});
    }
}

export default(new httpClient());