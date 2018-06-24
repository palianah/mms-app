// @flow

import AppStorage, { fixKey } from './local';


/**
* Local Storage Tests
*/

describe('Local Storage:', () => {
    test('Constructor cannot be used', () => {
        expect(() => {
            new AppStorage();
        }).toThrow('AppStorage cannot be constructed');
    });

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

    test('fixKey() should return a safe key to use', () => {
        expect(fixKey(' QWERTY--- 12345 ')).toBe('qwerty___12345');
        expect(fixKey(' QWERTY--- 12345 ')).not.toBe(' qwer___12345');
    });
});
