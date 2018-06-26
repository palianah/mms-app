// @flow

import reduce from '../utils/reducers';
import type { IssuesType } from '../types/issues';
import type { IssueType } from '../types/issue';


export const MS_IN_A_DAY = 86400000;
export const ISSUE_TOTAL_KEY = 'issue_count';
export const ISSUE_PAGING_KEY = 'issue_paging';
export const ISSUE_DATA_KEY = 'issue_data';
export const ISSUE_DATA_KEY_TS = 'issue_data_ts';
export const ISSUE_DATA_CACHE_DURATION = MS_IN_A_DAY * 2;

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
    static addItems(items: Array<IssueType>, settings: IssuesType): boolean {
        const cacheKey = getQueryItemKey(settings);
        const existingItemsTS = AppStorage.get(ISSUE_DATA_KEY_TS);
        const existingItems = AppStorage.get(cacheKey);
        const newTs = Date.now();
        const isStale = (existingItemsTS === null) ? false : AppStorage.isStale(existingItemsTS, newTs, ISSUE_DATA_CACHE_DURATION);

        if (existingItems === null || isStale) {
            AppStorage.set(cacheKey, items, true);
            AppStorage.set(ISSUE_DATA_KEY_TS, newTs, true);
            return true;

        } else {
            let newData = [...items];
            items.forEach(i => {
                newData = reduce.arr.addObj(newData, i);
            });

            AppStorage.set(cacheKey, newData, true);
            AppStorage.set(ISSUE_DATA_KEY_TS, newTs, true);
            return false;
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
  export function getQueryItemKey(settings: IssuesType, key?: string): string {
    const BASE_KEY = key || ISSUE_DATA_KEY;
    let newKey = `${BASE_KEY}_${settings.sort}_${settings.sortField}_${settings.term}_${settings.states}_${settings.perPage}`;
    return fixKey(newKey);
  }

 export default AppStorage;