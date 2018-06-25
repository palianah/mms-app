// @flow


/**
* Issue type def.
*/
export type IssueType = {
  authorAvatarUrl: string,
  authorName: string,
  authorUrl: string,
  commentCount: number,
  id: string,
  participantCount: number,
  title: string,
};

const issueDefault = {
  authorAvatarUrl: '',
  authorName: '',
  authorUrl: '',
  commentCount: 0,
  id: '',
  participantCount: 0,
  title: '',
};

export default issueDefault;