import firebase from '../shared/firebase';

const appointmentKey = 'appointment'


export function getAppointments() {
    return new Promise((resolve, reject) => {
        firebase.database().ref(appointmentKey).orderByPriority('date').once('value').then(result => {
            return resolve(result.val());
        }).catch(err => {
            return reject(err);
        })
    });
}

export function addAppointment(appointmentData) {
    return new Promise((resolve, reject) => {
        firebase.database().ref('appointment').child('items')
            .push(JSON.stringify(appointmentData)).then((value, err) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve();
                }

            });
    })
}
