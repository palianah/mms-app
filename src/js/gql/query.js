// @flow

import axios from 'axios';
import { GQL_ENDPOINT } from '../constants/gql';


/**
* An async function to make a GQL query.
* 
* @param { object } gqlClient The instance of the GQL Client.
* @return The response form the GQL Query.
*/
const gqlQuery = async (queryStr: string, token: string) => {
    const result = axios({
        method: 'post',
        url: GQL_ENDPOINT,
        data: {
            query: queryStr,
        },
        headers: {
            authorization: token ? `Bearer ${token}` : null,
        }
    });

    return result;
}

export default gqlQuery;