import axios from 'axios';
import config from '../config';
import { GetAuthenticationHeaderToken } from '../authentication';

const getTentants = () => {
    if(config.IsMock){
        return new Promise((resolve,reject) => {
            return resolve({
                "data":[
                    {
                        "id": 1,
                        "tenantName": "IH-IAFF"
                    }
                ]
            })
        })
    }
    else{
        return axios.get(config.TenantURL, { headers:{ 'Authorization': GetAuthenticationHeaderToken() } });
    }
}

export {
    getTentants
};