import './styles.less';

import React from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';

import cx from 'lib/classNames';
import url from 'url';

export const RecommendedSubreddits = (props) => {
  const { recommendedSubreddits, cssClass, variant, currentSubreddit } = props;

  let subredditListing, subredditHeader;

  let title = [
    <div className='RecommendedSubreddits__title'>
      <div className='title-text'> Recommended Communities </div>
    </div>,
    <hr/>
  ];

  if (variant === 'topPlain'){
    subredditListing = recommendedSubreddits.map(function(sr, index){
      return (
        <div className={ cssClass }>
          <a href={addUtmTracking(sr.url, index, variant)} className='sr-url'> { formatSubredditHref(sr.url) } </a>
        </div>
      );
    });
  } else if (variant === 'subredditHeader'){
    title = null;
    subredditHeader = true;
    subredditListing = (
      <div className={ cssClass }>
        <a href={addUtmTracking(currentSubreddit.url, 0, variant)} className='sr-url'> { 'See more at ' + formatSubredditHref(currentSubreddit.url) } </a>
      </div>
    );
  } else {
    subredditListing = recommendedSubreddits.map(function(sr, index){
      return (
        <div className={ cssClass }>
          <div className='subreddit-icon-image' style={ sr.iconImage ? { 'backgroundImage': `url(${sr.iconImage})`, 'backgroundPosition': '-1px 0px' } : {} }/>
          <a href={addUtmTracking(sr.url, index, variant)} className='sr-url'> { formatSubredditHref(sr.url) } </a>
          <div className='sr-subscriber-count'> { Number(sr.subscribers).toLocaleString('en') } { sr.subscribers > 1 ? 'subscribers' : 'subscriber' } </div>
        </div>
      );
    });
  }

  return (
    <div className={cx('RecommendedSubreddits__container', { 'sr-header' : subredditHeader })}>
      { title }
      { subredditListing }
    </div>
  );
};


function addUtmTracking(urlString, position, variant) {
  const urlObject = url.parse(urlString, true);

  return url.format({
    pathname: urlObject.pathname,
    query: { // we're appending utm params to the query. to do so we need to
      // splat the query object from the parsed url and add the utm params
      ...urlObject.query,
      utm_source: 'mweb',
      utm_medium: 'sr_recommendations',
      utm_name: 'experiment_70',
      utm_content: position,
      utm_term: variant,
    },
  });
};

function formatSubredditHref(url){
  // remove leading & trailing slash if they exist
  return url.replace(/^\//, '').replace(/\/$/, '');
};
