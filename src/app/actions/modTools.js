import { endpoints, collections, errors } from '@r/api-client';
const { Modtools } = endpoints;
const { ModeratingSubreddits } = collections;
const { ResponseError } = errors;

import { apiOptionsFromState } from 'lib/apiOptionsFromState';

export const MODERATOR_REMOVAL_PENDING = 'MODERATOR_REMOVAL_PENDING';
export const removalPending = (spam) => ({
  type: MODERATOR_REMOVAL_PENDING,
  spam: spam,
});

export const MODERATOR_REMOVAL_ERROR = 'MODERATOR_REMOVAL_ERROR';
export const removalError = (spam) => ({
  type: MODERATOR_REMOVAL_ERROR,
  spam: spam,
});

export const MODERATOR_REMOVAL_SUCCESS = 'MODERATOR_REMOVAL_SUCCESS';
export const removalSuccess = (spam) => ({
  type: MODERATOR_REMOVAL_SUCCESS,
  spam: spam,
});

export const remove = (id, spam) => async (dispatch, getState) => {
  const apiOptions = apiOptionsFromState(getState());
  dispatch(removalPending(spam));
  try {
    await Modtools.remove(apiOptions, id, spam);
    dispatch(removalSuccess(spam));
  } catch (e) {
    dispatch(removalError(spam));
    throw e;
  }
};

export const MODERATOR_APPROVAL_PENDING = 'MODERATOR_APPROVAL_PENDING';
export const approvalPending = () => ({
  type: MODERATOR_APPROVAL_PENDING,
});

export const MODERATOR_APPROVAL_ERROR = 'MODERATOR_APPROVAL_ERROR';
export const approvalError = () => ({
  type: MODERATOR_APPROVAL_ERROR,
});

export const MODERATOR_APPROVAL_SUCCESS = 'MODERATOR_APPROVAL_SUCCESS';
export const approvalSuccess = () => ({
  type: MODERATOR_APPROVAL_SUCCESS,
});

export const approve = (id) => async (dispatch, getState) => {
  const apiOptions = apiOptionsFromState(getState());
  console.log('here')
  dispatch(approvalPending());
  try {
    await Modtools.approve(apiOptions, id);
    dispatch(approvalSuccess());
  } catch (e) {
    dispatch(approvalError());
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
