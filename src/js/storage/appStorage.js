// @flow

import reduce from '../utils/reducers';
import type { IssuesType } from '../types/issues';
import type { IssueType } from '../types/issue';


const MS_IN_A_DAY = 86400000;
const ISSUE_DATA_KEY = 'issue_data';
const ISSUE_DATA_KEY_TS = 'issue_data_ts';
const ISSUE_DATA_CACHE_DURATION = MS_IN_A_DAY * 2;

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

    static set(unsafeKey: string, value: mixed, skipCheck?: boolean): boolean | void {
        const key = fixKey(unsafeKey);
        value = JSON.stringify(value);
        localStorage.setItem(key, value);
        
        if (skipCheck !== true) return (localStorage.getItem(key) !== null) ? true : false;
    }

    static del(unsafeKey: string): boolean {
        const key = fixKey(unsafeKey);
        localStorage.removeItem(key);

        return (localStorage.getItem(key) === null) ? true : false;
    }

    /**
    * Adds items to the cache. If there are none or the cache is stale they are added as is,
    * else they are appended if they don't exist.
    */
    static addItems(items: Array<IssueType>, settings: IssuesType) {
        const cacheKey = getQueryItemKey(settings);
        const existingItemsTS = AppStorage.get(ISSUE_DATA_KEY_TS);
        const existingItems = AppStorage.get(cacheKey);
        const newTs = Date.now();
        const isStale = (existingItemsTS === null) ? false : AppStorage.isStale(existingItemsTS, newTs, ISSUE_DATA_CACHE_DURATION);

        if (existingItems === null || isStale) {
            AppStorage.set(cacheKey, items, true);
            AppStorage.set(ISSUE_DATA_KEY_TS, newTs, true);
        } else {
            let newData = [...items];

            if (Array.isArray(items)) {
                items.forEach(i => {
                    newData = reduce.arr.addObj(newData, i);
                });
            }

            AppStorage.set(cacheKey, newData, true);
            AppStorage.set(ISSUE_DATA_KEY_TS, newTs, true);
        }
    }

    static isStale(tsCache: number, tsNow: number, duration: number): boolean {
        var tsExpires = tsCache + duration;
        if (tsNow > tsExpires) return true;
        return false
    }
 }

/**
 * Adjusts the key suitable for storage.
 * 
 * @todo Remove special chars
 */
 export function fixKey(key: string): string {
    return key.trim()
        .toLowerCase()
        .replace(/-/g, '_')
        .replace(/ /g, '');
 }

 /**
  * Makes a cache key for items from the repo.
  */
  export function getQueryItemKey(settings: IssuesType): string {
    let newKey = `${ISSUE_DATA_KEY}_${settings.sort}_${settings.sortField}_${settings.term}_${settings.states}`;
    return fixKey(newKey);
  }

 export default AppStorage;