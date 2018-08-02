import { firestore } from 'firebase';
import 'firebase/firestore';
import config from '../config';

export function getAllTenants() {
    return new Promise((resolve, reject) => {
        firestore().collection(config.TenantCollectionName).get().then(result => {
            let data = [];
            result.forEach(doc => {
                data.push({ id: doc.id, name: doc.data().name });
            });
            resolve(data);

        }, err => {
            console.log(err);
            reject(err);
        })
    });

}

export function setUserTenant(userid, tenantid) {
    return new Promise((resolve, reject) => {
        firestore().collection(config.TenantCollectionName).doc(tenantid).get().then(result => {
            firestore().collection(config.UserCollectionName).doc(userid).set({ tenant: result.ref }).then(result => {
                resolve(tenantid);
            }).catch(err => {
                reject(err);
                //TODO: Error with notifictaion
                console.log(err);
            });
        }).catch(err => {
            reject(err);//TODO: Error with notifictaion
            console.log(err);
        });
    });
}

export function getUserTenant(userID){
    return new Promise((resolve, reject) => {
        firestore().collection(config.UserCollectionName).doc(userID).get().then(result => {
            resolve(result.data().tenant.id);
        }).catch(err => {
            reject(err);
        });
    })

}