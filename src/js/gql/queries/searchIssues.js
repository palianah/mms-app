// @flow


/**
* Graph QL query string search issues.
*/

const searchIssuesQuery = (config: Object) => {
  const {
      endCursor,
      perPage,
      repoName,
      repoOwner,
      sort,
      sortField, 
      states,
      term,
  } = config;

  const after = (endCursor) ? "after: " + endCursor + ", " : '';
  const theTerm = (term !== '') ? ' ' + term : '';

  return `{
    search(first: ${perPage}, ${after}type: ISSUE, query: "is:${states} is:issue org:${repoOwner} repo:${repoName} sort:${sortField}-${sort}${theTerm}") {
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