// @flow


/**
* Graph QL query string to get the login name of the user.
*/

const userauthQuery = `
{
    viewer { 
        login
    }
}
`;

export default userauthQuery;