import merge from '@r/platform/merge';

import * as recommendedSubredditsActions from 'app/actions/recommendedSubreddits';

const DEFAULT = {};

export default (state=DEFAULT, action={}) => {
  switch (action.type) {
    case recommendedSubredditsActions.RECEIVED_RECOMMENDED_SUBREDDITS: {
      
      // recommendedSubreddits contain the referrer subreddit, and a list
      // of recommended subreddit names
      // i.e { recommendedSubreddits: { 'askreddit': ['pics', 'wow'] } }
      return merge(state, {
        [action.subredditName]: action.apiResponse.results.map(function(sr) { return sr.uuid; }),
      });
    }

    default:
      return state;
  }
};
