// @flow


/**
* Graph QL query string to get comments.
*/

const issuesQuery = (config: Object) => {
    return `
    {
        repository(owner: "${config.repoOwner}", name: "${config.repoName}") {
            id,
            name,
            issues(last: ${config.issues.last}, states:${config.issues.states}, orderBy: {field: ${config.issues.ob.field}, direction: ${config.issues.ob.dir}}) {
                totalCount,
                edges {
                    node {
                        id,
                        title,
                        author {
                            url,
                            avatarUrl
                            login
                        },
                        participants(last: 10) {
                            totalCount
                        },
                        comments(last: 10) {
                            totalCount
                        }
                    }
                }
            }
        }
    }`
};

export default issuesQuery;