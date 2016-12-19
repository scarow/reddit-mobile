import React from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { Modal } from '@r/widgets/modal';
import { DropdownRow } from 'app/components/Dropdown';

import * as modActions from 'app/actions/modTools';

const T = React.PropTypes;

const T = React.PropTypes;

export function ModeratorModal(props) {
  const {
    onSpam,
    onApprove,
    onRemove,
    onClick,
    children,
    id,
  } = props;

  return (
    <div className='ModeratorModalWrapper'>
      <Modal
        id={ id }
        className='DropdownModal ModeratorModal'
      >
        <div onClick={ onClick }>
          { children }
        </div>
        <DropdownRow icon='post_edit' text='Remove' onClick={ onRemove } />
        <DropdownRow icon='post_edit' text='Spam' onClick={ onSpam } />
        <DropdownRow icon='post_edit' text='Approve' onClick={ onApprove } />
      </Modal>
    </div>
  );
}

ModeratorModal.propTypes = {
  id: T.string.isRequired,
  onClick: T.func,
  onSpam: T.func.isRequired,
  onApprove: T.func.isRequired,
  onRemove: T.func.isRequired,
};

const mapDispatchToProps = (dispatch, { id }) => ({
  onSpam: () => dispatch(modActions.remove(id, true)),
  onApprove: () => dispatch(modActions.approve(id)),
  onRemove: () => dispatch(modActions.remove(id, false)),
});

export default connect(null, mapDispatchToProps)(ModeratorModal);
