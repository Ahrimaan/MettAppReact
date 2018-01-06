import config from '../config';
import axios from 'axios';
import { getBearerToken } from './bearerToken';

export function getUserInformation (userId,idToken) {
    console.log([userId,idToken,config.IsMock, config.UserInfoUrl, getBearerToken(idToken)]);
    if(config.IsMock){
        return {
            "userId": "104452206825748984601",
            "tenantId": "1",
            "isAdmin": "false"
        };
    }
    axios.get(`${config.UserInfoUrl}/${userId}` , { headers: {
        'Authorization': getBearerToken(idToken)
    } }).then(result => {
        
    });
}
