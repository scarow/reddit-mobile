import './styles.less';

import React from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';

import map from 'lodash/map';

export const RecommendedSubreddits = (props) => {
  const { recommendedSubreddits, cssClass, variant, currentSubreddit } = props;

  let subredditListing, subredditHeader;

  let title = (
    <div>
      <div className='RecommendedSubreddits__title'>
        <div className='title-text'> Recommended Communities </div>
      </div>
      <hr/>
    </div>
  );

  if (variant == 'topPlain'){
    subredditListing = map(recommendedSubreddits, sr => {
      return (
        <div className={ cssClass }>
          <a href={sr.url} className='sr-url'> { formatSubredditHref(sr.url) } </a>
        </div>
      )
    })
  } else if (variant == 'subredditHeader'){
    title = null;
    subredditHeader = true;
    subredditListing = (
      <div className={ cssClass }>
        <a href={currentSubreddit.url} className='sr-url'> { 'See more at ' + formatSubredditHref(currentSubreddit.url) } </a>
      </div>
    );
  } else {
    subredditListing = map(recommendedSubreddits, sr => {
      return (
        <div className={ cssClass }>
          <div className='subreddit-icon-image' style={ sr.iconImage ? { 'backgroundImage': `url(${sr.iconImage})`, 'backgroundPosition': '-1px 0px' } : {} }/>
          <a href={sr.url} className='sr-url'> { formatSubredditHref(sr.url) } </a>
          <div className='sr-subscriber-count'> { Number(sr.subscribers).toLocaleString('en') } { sr.subscribers > 1 ? 'subscribers' : 'subscriber' } </div>
        </div>
      )
    })
  }

  return (
    <div className={'RecommendedSubreddits__container' + (subredditHeader ? ' sr-header' : '')}>
      { title }
      { subredditListing }
    </div>
  );
};

function formatSubredditHref(url){
  // remove leading & trailing slash if they exist
  let formattedUrl = url.replace(/^\//, "");
  formattedUrl = formattedUrl.replace(/\/$/, "");
  return formattedUrl;
};
