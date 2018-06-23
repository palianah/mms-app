// @flow


/**
* User type def.
*/

export type UserType = {
  loggedin: boolean,
  token: string,
  username: string,
};

const userDefault = {
  loggedin: false,
  token: '',
  username: '',
};

export default userDefault;