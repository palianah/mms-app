// @flow


/**
* Graph QL query string search issues.
*/

const searchIssuesQuery = (config: Object) => {
    const {
        last,
        repoName,
        repoOwner,
        sort,
        sortField, 
        states,
        term,
    } = config;

    return `
    {
        search(
            last: ${last}, 
            type: ISSUE, 
            query: "
                is:${states} 
                is:issue 
                org:${repoOwner} 
                repo:${repoName} 
                sort:${sortField}-${sort} 
                ${term} 
            "
        ) {
          issueCount
          pageInfo {
            hasNextPage
            endCursor
          }
          edges {
            node {
              ... on Issue {
                createdAt
                title
                url
                id
                author {
                  url
                  avatarUrl
                  login
                }
                participants(last: 10) {
                  totalCount
                }
                comments(last: 10) {
                  totalCount
                }
              }
            }
          }
        }
    }`
};

export default searchIssuesQuery;