import { every, has } from 'lodash-es';

export function hasKeys(obj, keys) {
    return every(keys, key => has(obj, key));
}
