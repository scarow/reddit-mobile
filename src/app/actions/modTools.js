import { endpoints, collections, errors } from '@r/api-client';
const { Modtools } = endpoints;
const { ModeratingSubreddits } = collections;
const { ResponseError } = errors;

import { apiOptionsFromState } from 'lib/apiOptionsFromState';

export const remove = (postId, spam) => async (dispatch, getState) => {
  const apiOptions = apiOptionsFromState(getState());

  try {
    await Modtools.remove(apiOptions, postId, spam);
  } catch (e) {
    throw e;
  }
};

export const approve = (postId) => async (dispatch, getState) => {
  const apiOptions = apiOptionsFromState(getState());

  try {
    await Modtools.approve(apiOptions, postId);
  } catch (e) {
    throw e;
  }
};

export const FETCHING_MODERATING_SUBREDDITS = 'FETCHING_MODERATING_SUBREDDITS';
export const fetchingSubs = () => ({
  type: FETCHING_MODERATING_SUBREDDITS,
});

export const RECEIVED_MODERATING_SUBREDDITS = 'RECEIVED_MODERATING_SUBREDDITS';
export const receivedSubs = apiResponse => ({
  type: RECEIVED_MODERATING_SUBREDDITS,
  apiResponse,
});

export const FETCH_FAILED_MODERATING_SUBREDDITS = 'FETCH_FAILED_MODERATING_SUBREDDITS';
export const fetchSubsFailed = error => ({
  type: FETCH_FAILED_MODERATING_SUBREDDITS,
  error,
});

export const fetchModeratingSubreddits = () => async (dispatch, getState) => {
  const state = getState();
  const apiOptions = apiOptionsFromState(state);

  const subredditsAlreadyFetched = (
    state.moderatingSubreddits.loading === true ||
    state.moderatingSubreddits.responseCode === 200);

  // don't make API call again
  if (subredditsAlreadyFetched) { return; }

  dispatch(fetchingSubs());

  try {
    const moderatingSubs = await ModeratingSubreddits.fetch(apiOptions);
    dispatch(receivedSubs(moderatingSubs.apiResponse));
  } catch (e) {
    if (e instanceof ResponseError) {
      dispatch(fetchSubsFailed(e));
    } else {
      throw e;
    }
  }
};
