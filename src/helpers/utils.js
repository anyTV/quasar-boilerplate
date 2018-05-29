import { every, has } from 'lodash';

export function hasKeys(obj, keys) {
    return every(keys, key => has(obj, key));
}
