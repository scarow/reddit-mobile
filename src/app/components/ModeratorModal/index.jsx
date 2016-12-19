import React from 'react';
import { Modal } from '@r/widgets/modal';

const T = React.PropTypes;

const T = React.PropTypes;

export function ModeratorModal(props) {

  return (
    <div className='ModeratorModalWrapper'>
      <Modal
        id={ props.id }
        className='DropdownModal ModeratorModal'
      >
        <div onClick={ props.onClick }>
          { props.children }
        </div>
      </Modal>
    </div>
  );
}

ModeratorModal.propTypes = {
  id: T.string.isRequired,
  onClick: T.func,
};

// to do: wait wat dis do again?
const selector = createSelector(
  (_, props) => props.postId => {
    return {
      postId,
    };
  }
);

const mapDispatchToProps = (dispatch, { postId }) => ({
  onSpam: () => dispatch(modActions.remove(postId, true)),
  onApprove: () => dispatch(modActions.approve(postId)),
  onRemove: () => dispatch(modActions.remove(postId, false)),
});

export default connect(selector, mapDispatchToProps)(ModeratorModal);
