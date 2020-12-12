import {database} from './firebase';

const db = database.ref('/products');

class DBController {
    getAll() {
        return db;
    }

    getProduct(key) {
        return db.child(key);
    }

    remove(key) {
        return db.child(key).remove();
    }

    update(key,value) {
        return db.child(key).update(value);
    }

    create(data) {
        return db.push(data);
    }
}

export default new DBController();