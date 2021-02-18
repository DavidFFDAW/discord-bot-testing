let tr = false;

const promise = new Promise((resolve, reject) => {
    if (tr) {
        const successObject = {
            status: 'Success',
            content: 'Prueba de Promises',
        };
        resolve(successObject);
    } else {
        const errorObject = {
            status: 'Error',
            content: 'ERROR: tr is not true',
        }
        reject(errorObject);
    }
});