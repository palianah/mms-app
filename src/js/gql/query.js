// @flow

import gql from 'graphql-tag';


/**
* An async function to make a GQL query.
* 
* @param { object } gqlClient The instance of the GQL Client.
* @return The response form the GQL Query.
*/
const gqlQuery = async (gqlClient: any, queryStr: string) => {
    const result = await gqlClient.query({
         query: gql`
            {
                viewer { 
                    login
                }
            }
         `
     });

     return result;
}

export default gqlQuery;