// @flow

import reducer from '../repo';
import repoDefault from '../../types/repo';
import {
  REPO_CHANGE,
} from '../../constants/actionTypes';


/**
* Repo Reducer Tests
*/

describe('Reducer: Repo', () => {
  const INITIAL_STATE = {...repoDefault};

  test('Should return the initial state if no type matches', () => {
    expect(reducer(INITIAL_STATE, { type: 'IGNORE'})).toEqual(INITIAL_STATE);
  });

  test('Should update the repo if payload exists', () => {
    const testAction = {
      type: REPO_CHANGE,
      payload: { owner: 'Test', name: 'Repo' },
    };
    const noPayloadAction = {
      type: REPO_CHANGE,
    };
    expect(reducer(INITIAL_STATE, testAction)).toEqual(testAction.payload);
    expect(reducer(INITIAL_STATE, noPayloadAction)).toEqual(INITIAL_STATE);
  });

  test('Should return existing state if the not all parts of the repo data exist', () => {
    const nameWrongAction = {
      type: REPO_CHANGE,
      payload: { owner: 'Test', namewrong: 'Wrong' },
    };
    const ownerWrongAction = {
      type: REPO_CHANGE,
      payload: { ownerwrong: 'Wrong', name: 'Repo' },
    };
    const payloadWrongAction = {
      type: REPO_CHANGE,
      payload: {},
    };
    expect(reducer(INITIAL_STATE, nameWrongAction)).toEqual(INITIAL_STATE);
    expect(reducer(INITIAL_STATE, ownerWrongAction)).toEqual(INITIAL_STATE);
    expect(reducer(INITIAL_STATE, payloadWrongAction)).toEqual(INITIAL_STATE);
  });
});
