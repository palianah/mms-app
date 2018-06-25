// @flow

import * as yup from 'yup';

yup.addMethod(yup.string, 'sanitizesearch', function() {
    return this.transform(function(value, originalValue){
        return value.replace(/<|>|{|}/g, '');
    })
});


/**
* Validation scheme for a the search term.
* 
* @return object
*/
export default yup.string().trim().sanitizesearch();