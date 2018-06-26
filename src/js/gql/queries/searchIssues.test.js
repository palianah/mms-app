// @flow

import searchIssuesQuery from './searchIssues';
import issuesDefault from '../../types/issues';

/**
 * Quick and dirty test of the string, that all placeholders have been replaced.
 * 
 * @todo Impove if time...
 */
describe('searchIssuesQuery()', () => {
    function trimTs(str) {
        return str.trim().replace(/ /g, '').replace(/\n/g, '');
    };

    test('Placeholders replaced correctly', () => {
        const result = searchIssuesQuery({...issuesDefault});
        const trimmedResult = trimTs(result);
        expect(trimmedResult.includes('${')).toBe(false);
        expect(trimmedResult.includes('after:')).toBe(false);
    });
    test('"after:" is set if there is a endCursor in the config', () => {
        const result = searchIssuesQuery({...issuesDefault, endCursor: '23g4zu23g4u'});
        expect(trimTs(result).includes('after:')).toBe(true);
    });
});
