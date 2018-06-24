// @flow


/**
* Graph QL query string to get the login name of the user.
*/

const userauthQuery = () => {
    return `
        {
            viewer { 
                login
            }
        }
    `;
};

export default userauthQuery;