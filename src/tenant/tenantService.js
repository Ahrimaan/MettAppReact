import { firestore,auth } from 'firebase';
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

export function setUserTenant(tenantid) {
    return new Promise((resolve, reject) => {
        firestore().collection(config.TenantCollectionName).doc(tenantid).get().then(result => {
            let userData = {displayName: auth().currentUser.displayName ? auth().currentUser.displayName : auth().currentUser.email, email: auth().currentUser.email};
            firestore().collection(config.UserCollectionName).doc(auth().currentUser.uid).set({ tenant: result.ref, userData }).then(result => {
                resolve(tenantid);
            }).catch(err => {
                reject(err);
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
        firestore().collection(config.AdminCollectionName).doc(userID).get().then(result => {
            resolve(result.data().tenantId.id)
        }).catch(adminErr => {
            firestore().collection(config.UserCollectionName).doc(userID).get().then(result => {
                resolve(result.data().tenant.id);
            }).catch(err => {
                reject(err);
            });
        });
    });
}