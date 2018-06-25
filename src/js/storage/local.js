// @flow

/**
 * A storage wrapper to hide the storage used from the rest of the app.
 * Currently localStorage is used but maybe sessionStorage will be used or
 * some other storage system.
 */
 class AppStorage {
    constructor() {
      throw new Error('AppStorage cannot be constructed');
    }

    static get(unsafeKey: string): any {
        const key = fixKey(unsafeKey);
        const value = localStorage.getItem(key);
        return (value === null || value === undefined) ? value : JSON.parse(value);
    }

    static set(unsafeKey: string, value: mixed): boolean {
        const key = fixKey(unsafeKey);
        value = JSON.stringify(value);
        localStorage.setItem(key, value);
        
        return (localStorage.getItem(key) !== null) ? true : false;
    }

    static del(unsafeKey: string): boolean {
        const key = fixKey(unsafeKey);
        localStorage.removeItem(key);

        return (localStorage.getItem(key) === null) ? true : false;
    }
 }

/**
 * Adjusts the key suitable for storage.
 */
 export function fixKey(key: string): string {
    return key.trim().toLowerCase().replace(/-/g, '_').replace(/ /g, '');
 }

 export default AppStorage;