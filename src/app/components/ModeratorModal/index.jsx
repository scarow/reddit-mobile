import React from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { Modal } from '@r/widgets/modal';

import ModActions from 'app/actions/ModTools';

const T = React.PropTypes;

const T = React.PropTypes;

export function ModeratorModal(props) {
  const {
    onSpam,
    onApprove,
    onRemove
  } = props;

  return (
    <div className='ModeratorModalWrapper'>
      <Modal
        id={ props.id }
        className='DropdownModal ModeratorModal'
      >
        <div onClick={ props.onClick }>
          { props.children }
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
};

const selector = createSelector(
  (_, props) => props.id,
  (id) => {
    return {
      id,
    };
  }
);

const mapDispatchToProps = (dispatch, { id }) => ({
  onSpam: () => dispatch(modActions.remove(id, true)),
  onApprove: () => dispatch(modActions.approve(id)),
  onRemove: () => dispatch(modActions.remove(id, false)),
});

export default connect(selector, mapDispatchToProps)(ModeratorModal);
