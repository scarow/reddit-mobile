import React from 'react';

import { DropdownModal, DropdownRow, DropdownLinkRow } from 'app/components/Dropdown';
import ModeratorModal from 'app/components/ModeratorModal';

const T = React.PropTypes;

const renderSubredditDropdownLinkRow = subreddit => (
  <DropdownLinkRow
    href={ `/r/${subreddit}` }
    icon='snoosilhouette'
    text={ `More from r/${subreddit}` }
  />
);

export default function PostDropdown(props) {
  const {
    id,
    canModify,
    permalink,
    subreddit,
    author,
    isLoggedIn,
    isSaved,
    onToggleEdit,
    onToggleHide,
    onReportPost,
    onToggleSave,
    onToggleModal,
    isSubredditModerator,
  } = props;

  const modalContent = [
    canModify && <DropdownRow icon='post_edit' text='Edit Post' onClick={ onToggleEdit } />,
    <DropdownLinkRow href={ permalink } icon='link' text='Permalink'/>,
    subreddit && renderSubredditDropdownLinkRow(subreddit),
    <DropdownLinkRow href={ `/user/${author}` } icon='user-account' text={ `${author}'s profile` }/>,
    isLoggedIn ? <DropdownRow icon='save' text={ isSaved ? 'Saved' : 'Save' } onClick={ onToggleSave } isSelected={ isSaved }/> : null,
    isLoggedIn ? <DropdownRow icon='hide' text='Hide' onClick={ onToggleHide }/> : null,
    isLoggedIn ? <DropdownRow onClick={ onReportPost } icon='flag' text='Report'/> : null,
  ];

  let modal;

  if (isSubredditModerator) {
    modal = (
      <ModeratorModal id={ id } onClick={ onToggleModal }>
        { modalContent }
      </ModeratorModal>
    );
  } else {
    modal = (
      <DropdownModal id={ id } onClick={ onToggleModal }>
        { modalContent }
      </DropdownModal>
    );
  }

  return modal;
}

PostDropdown.propTypes = {
  id: T.string.isRequired,
  canModify: T.bool, // can edit / can delete
  permalink: T.string.isRequired,
  author: T.string.isRequired,
  isSaved: T.bool,
  isLoggedIn: T.bool,
  subreddit: T.string,
  onToggleSave: T.func,
  onToggleHide: T.func,
  onReportPost: T.func.isRequired,
  onToggleEdit: T.func,
  onToggleModal: T.func,
};

PostDropdown.defaultProps = {
  canModify: false,
  isSaved: false,
  isLoggedIn: false,
  onToggleSave: () => {},
  onToggleHide: () => {},
  onToggleEdit: () => {},
  onToggleModal: () => {},
};
