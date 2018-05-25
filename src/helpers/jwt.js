import jwt from 'jsonwebtoken';
import { LocalStorage } from 'quasar';
import { get } from 'lodash-es';


export default class JWT {

    constructor(key) {
        this.key = key;
    }

    hasToken() {
        return LocalStorage.has(this.key);
    }

    getToken() {
        return LocalStorage.get.item(this.key);
    }

    setToken(token) {
        LocalStorage.set(this.key, token);
        return this;
    }

    removeToken() {
        LocalStorage.remove(this.key);
        return this;
    }

    decode(path = null, defaultValue = null) {
        const decoded = jwt.decode(this.getToken(), {
            complete: true,
            force: true
        });

        if (!path) {
            return decoded;
        }

        return get(decoded, path, defaultValue);
    }
}
