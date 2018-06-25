// @flow

import * as yup from 'yup';

yup.addMethod(yup.string, 'removeWhitespace', function() {
    return this.transform(function(value, originalValue){
        return value.replace(/ /g, '');
    })
});

/**
* Validation scheme for a github token.
* 
* @return object
*/
export const tokenMatch = /^[a-z0-9]+$/;

/**
* Validation scheme for a github token.
* 
* @return object
*/
export default yup.string().trim().lowercase().removeWhitespace().matches(tokenMatch, { excludeEmptyString: true });