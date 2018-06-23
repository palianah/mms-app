import 'jest-localstorage-mock';

window.qlClient = {
    query(queryObject: Object) {
        return new Promise((resolve, reject) => {
            resolve();
        });
    }
}