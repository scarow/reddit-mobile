import React from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { some } from 'lodash/collection';
import { has } from 'lodash/object';
import * as navigationActions from '@r/platform/actions';
import { METHODS } from '@r/platform/router';

import { flags } from 'app/constants';
import { featuresSelector } from 'app/selectors/features';
import crawlerRequestSelector from 'app/selectors/crawlerRequestSelector';

import CommentsList from 'app/components/CommentsList';
import CommentsPageTools from 'app/components/CommentsPage/CommentsPageTools';
import GoogleCarouselMetadata from 'app/components/GoogleCarouselMetadata';
import Post from 'app/components/Post';
import Loading from 'app/components/Loading';
import SubNav from 'app/components/SubNav';
import RelevantContent from 'app/components/RelevantContent';
import { RecommendedSubreddits } from 'app/components/RecommendedSubreddits';

import CommentsPageHandler from 'app/router/handlers/CommentsPage';
import { paramsToCommentsPageId } from 'app/models/CommentsPage';

const T = React.PropTypes;

const {
  VARIANT_NEXTCONTENT_BOTTOM,
  VARIANT_RECOMMENDED_BOTTOM,
  VARIANT_RECOMMENDED_TOP,
  VARIANT_RECOMMENDED_TOP_PLAIN,
  VARIANT_SUBREDDIT_HEADER,
} = flags;

const stateProps = createSelector(
  (state, props) => props,
  state => state.commentsPages,
  state => state.posts,
  state => state.platform.currentPage,
  state => state.recommendedSubreddits,
  state => state.subreddits,
  featuresSelector,
  crawlerRequestSelector,
  (pageProps, commentsPages, posts, currentPage, recommendedSrs, subreddits, feature, isCrawlerRequest) => {
    const commentsPageParams = CommentsPageHandler.pageParamsToCommentsPageParams(pageProps);
    const commentsPageId = paramsToCommentsPageId(commentsPageParams);
    const commentsPage = commentsPages[commentsPageId];
    const topLevelComments = (!commentsPage || commentsPage.loading)
      ? []
      : commentsPage.results;
    const post = posts[commentsPageParams.id];
    const postLoaded = !!post;
    const replying = currentPage.queryParams.commentReply === commentsPageParams.id;

    const recommendedSubredditNames = recommendedSrs[currentPage.urlParams.subredditName] || [];
    const recommendedSubreddits = recommendedSubredditNames.map(name => subreddits[name]);

    const currentSubreddit = subreddits[currentPage.urlParams.subredditName];

    return {
      op: postLoaded ? post.author : '',
      postLoaded,
      commentsPageParams,
      commentsPage,
      commentsPageId,
      topLevelComments,
      currentPage,
      replying,
      feature,
      isCrawlerRequest,
      post,
      recommendedSubreddits,
      currentSubreddit,
    };
  },
);

const dispatchProps = dispatch => ({
  navigateToUrl(url, query) {
    dispatch(navigationActions.navigateToUrl(METHODS.GET, url, query));
  },
});

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  const { currentPage, currentPage: { queryParams } } = stateProps;
  const { navigateToUrl } = dispatchProps;

  const onSortChange = sort => {
    navigateToUrl(currentPage.url, {
      queryParams: {
        ...queryParams,
        sort,
      },
    });
  };

  return {
    ...stateProps,
    ...ownProps,
    onSortChange,
  };
};

class _CommentsPage extends React.Component {
  static propTypes = {
    op: T.string,
    postLoaded: T.bool,
    commentsPageParams: T.object,
    commentsPage: T.object,
    commentsPageId: T.string,
    topLevelComments: T.arrayOf(T.object),
    currentPage: T.object,
    replying: T.bool,
    feature: T.object,
    isCrawlerRequest: T.bool,
    post: T.object,
    recommendedSubreddits: T.arrayOf(T.object),
    currentSubreddit: T.object,
  };

  constructor (props) {
    super(props);

    this.state = {
      expandComments: false,
    };

    this.expandComments = this.expandComments.bind(this);
  }

  expandComments() {
    this.setState({ expandComments: true });
  }

  limitTrees(limit, trees) {
    if (limit === 0 || !trees || trees.length === 0) {
      return [0, []];
    }
    const first = trees[0];
    const rest = trees.slice(1);
    const [count, pruned] = this.limitTree(limit, first);
    if (limit > count) {
      const [restCount, restPruned] = this.limitTrees(limit - count, rest);
      return [count + restCount, [pruned].concat(restPruned)];
    }
    return [count, [pruned]];
  }

  limitTree(limit, tree) {
    if (limit === 0) {
      return [0, null];
    } else if (limit === 1) {
      return [1, { ...tree, replies: [] }];
    }
    const [count, children] = this.limitTrees(limit - 1, tree.replies);
    return [count + 1, { ...tree, replies: children }];
  }

  render () {
    const {
      op,
      commentsPage,
      commentsPageParams,
      topLevelComments,
      postLoaded,
      currentPage,
      replying,
      feature,
      onSortChange,
      isCrawlerRequest,
      post,
      recommendedSubreddits,
      currentSubreddit,
    } = this.props;

    if (!postLoaded) {
      return (
        <div className='CommentsPage BelowTopNav'>
          <Loading />
        </div>
      );
    }

    const shouldAbbreviateComments = !this.state.expandComments && feature.enabled(VARIANT_RECOMMENDED_BOTTOM);
    const hasRecommendations = recommendedSubreddits.length > 0 ? true : false;
    let abbreviatedComments;

    if (shouldAbbreviateComments){
      abbreviatedComments = this.limitTrees(3, topLevelComments)[1];
    }

    return (

      <div className='CommentsPage BelowTopNav'>
        <SubNav />
        {
          feature.enabled(VARIANT_SUBREDDIT_HEADER) &&
          (<div>
            <RecommendedSubreddits
              cssClass='RecommendedSubreddits__header'
              recommendedSubreddits={ recommendedSubreddits }
              variant='subredditHeader'
              currentSubreddit={ currentSubreddit }
            />
          </div>)
        }
        <Post postId={ commentsPageParams.id } single={ true } key='post' />
        <CommentsPageTools
          key='tools'
          replying={ replying }
          post={ post }
          hasSingleComment={ has(commentsPageParams, 'query.comment') }
          currentPage={ currentPage }
          id={ commentsPageParams.id }
          onSortChange={ onSortChange }
        />
        {
          feature.enabled(VARIANT_RECOMMENDED_TOP) && hasRecommendations &&
          (<div>
            <RecommendedSubreddits
              cssClass='RecommendedSubreddits__top'
              recommendedSubreddits={recommendedSubreddits}
              variant='top'
            />
          </div>)
        }
        {
          feature.enabled(VARIANT_RECOMMENDED_TOP_PLAIN) && hasRecommendations &&
          (<div>
            <RecommendedSubreddits
              cssClass='RecommendedSubreddits__top-plain'
              recommendedSubreddits={recommendedSubreddits}
              variant='topPlain'
            />
          </div>)
        }

        { !commentsPage || commentsPage.loading
          ? <Loading />
          : <CommentsList
              op={ op }
              commentRecords={ abbreviatedComments ? abbreviatedComments : topLevelComments }
              className='CommentsList__topLevel'
              nestingLevel={ 0 }
            />
        }

        { isCrawlerRequest && commentsPage && topLevelComments.length ?
          <GoogleCarouselMetadata
            postId={ commentsPageParams.id }
            commentRecords={ topLevelComments }
            pageUrl={ currentPage.url }
          />
          : null
        }

        { some([
          VARIANT_NEXTCONTENT_BOTTOM,
        ], x => feature.enabled(x)) &&
          <RelevantContent
            postId={ commentsPageParams.id }
          />
        }
        {
          shouldAbbreviateComments && hasRecommendations &&
          (<div className='RecommendedSubredditsBottom__wrapper'>
            <div className='RecommendedSubreddits__button_wrapper'>
              <button
                className='listing-comment-collapsed-more'
                onClick={ this.expandComments }
                key='comment-collapsed-more'
              >
                View More Comments
              </button>
            </div>
            <RecommendedSubreddits
              cssClass='RecommendedSubreddits__bottom'
              recommendedSubreddits={recommendedSubreddits}
              variant='bottom'
            />
          </div>)
        }
      </div>
    )
  }
}

export const CommentsPage = connect(stateProps, dispatchProps, mergeProps)(_CommentsPage);
