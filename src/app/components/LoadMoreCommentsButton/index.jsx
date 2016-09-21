import React from 'react';

// to do: does this need to be its own component? we will see once we
// add API action to this
export default (props) => {
  return (
    <div>
      <a
        className='listing-comment-collapsed-more'
        onClick={ this.expandComments }
        href='#'
        key='comment-collapsed-more'
      >
        Show All Comments
      </a>
    </div>
  );
};
