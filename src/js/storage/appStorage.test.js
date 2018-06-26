// @flow

import AppStorage, { fixKey, getQueryItemKey, ISSUE_DATA_KEY } from './appStorage';
import issuesDefault from '../types/issues';
import issueDefault from '../types/issue';
import issuesDataDefault from '../types/issueData';


/**
* Local Storage Tests
*/

describe('Local Storage:', () => {
    test('Constructor cannot be used', () => {
        expect(() => {
            new AppStorage();
        }).toThrow('AppStorage cannot be constructed');
    });

    describe('get(), set(), del():', () => {
        test('Should return null for a key that doesn exist.', () => {
            expect(AppStorage.get('reddwarf')).toBe(null);
        });

        test('Should set the item', () => {
            expect(AppStorage.set('reddwarf', 'starbug')).toBe(true);
            expect(AppStorage.get('reddwarf')).toBe('starbug');
        });

        test('Should return keys as they were', () => {
            expect(AppStorage.set('queeg', false)).toBe(true);
            expect(AppStorage.get('queeg')).toBe(false);

            expect(AppStorage.set('holly', { talky: 'toaster' })).toBe(true);
            expect(AppStorage.get('holly')).toEqual({ talky: 'toaster' });

            expect(AppStorage.set('whitemidget', 345)).toBe(true);
            expect(AppStorage.get('whitemidget')).toBe(345);

            expect(AppStorage.set('holoship', 1.5)).toBe(true);
            expect(AppStorage.get('holoship')).toBe(1.5);
        });

        test('Should remove the item', () => {
            expect(AppStorage.del('reddwarf')).toBe(true);
        });

        test('set() should return undefined if skeip is true', () => {
            expect(AppStorage.set('jupitermining', 'corporation', true)).toBe(undefined);
        });

        test('del() should return true if the key was deleted', () => {
            expect(AppStorage.set('io', 'titan')).toBe(true);
            expect(AppStorage.del('io')).toBe(true);
            expect(AppStorage.get('io')).toBe(null);
        });
    });

    describe('addItems():', () => {
        const settings = {...issuesDefault};
        const CACHE_KEY = getQueryItemKey(settings);
        const issues = {...issuesDataDefault};
        issues[CACHE_KEY] = [{...issueDefault}];

        test('Should return true if the items did not exist in the cache', () => {
            expect(AppStorage.addItems(issues[CACHE_KEY], settings)).toBe(true);
        });

        test('Should return false if the items did not exist in the cache and they were updated', () => {
            expect(AppStorage.addItems(issues[CACHE_KEY], settings)).toBe(false);
        });
    });

    describe('isStale():', () => {
        const duration = 5000;
        const tsNow = Date.now();

        test('Should return true if the ts has expired', () => {
            const tsCache = tsNow - (2 * duration);
            expect(AppStorage.isStale(tsCache, tsNow, duration)).toBe(true);
        });

        test('Should return false if the ts is still fresh', () => {
            const tsCache = tsNow + (2 * duration);
            expect(AppStorage.isStale(tsCache, tsNow, duration)).toBe(false);
        });
    });

    test('fixKey() should return a safe key to use', () => {
        expect(fixKey(' QWERTY--- 12345 ')).toBe('qwerty___12345');
        expect(fixKey(' QWERTY--- 12345 ')).not.toBe(' qwer___12345');
    });

    test('getQueryItemKey() should return the correct key to use', () => {
        const settings = {...issuesDefault};
        const expectedKey = `${ISSUE_DATA_KEY}_${settings.sort}_${settings.sortField}_${settings.term}_${settings.states}_${settings.perPage}`
        const settings2 = {...issuesDefault, term: 'test', sort: 'asc', states: 'closed', sortField: 'updated'};
        const expectedKey2 = `${ISSUE_DATA_KEY}_${settings2.sort}_${settings2.sortField}_${settings2.term}_${settings2.states}_${settings2.perPage}`
        expect(getQueryItemKey(settings)).toBe(expectedKey);
        expect(getQueryItemKey(settings2)).toBe(expectedKey2);
    });
});
