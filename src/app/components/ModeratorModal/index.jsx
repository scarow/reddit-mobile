import './styles.less';
import React from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { Modal } from '@r/widgets/modal';
import { DropdownRow } from 'app/components/Dropdown';

import * as modActions from 'app/actions/modTools';

const T = React.PropTypes;

<<<<<<< 6d86115a0f25df3a3025745c2423b84288f004f5
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
=======
export class ModeratorModal extends React.Component {
  static propTypes = {
    id: T.string.isRequired,
    children: T.array,
    onClick: T.func,
    onSpam: T.func.isRequired,
    onApprove: T.func.isRequired,
    onRemove: T.func.isRequired,
  }

  constructor(props) {
    super(props);

    this.state = {
      isSpam: props.isSpam,
      isRemoved: props.isRemoved,
      isApproved: props.isApproved,
    };
  }

  doRemove = () => {
    this.setState({
      isRemoved: true,
      isSpam: false,
      isApproved: true,
    });
    this.props.onRemove();
  }
>>>>>>> WIP

  doSpam = () => {
    this.setState({
      isRemoved: false,
      isApproved: false,
      isSpam: true
    });
    this.props.onSpam();
  }

  doApprove = () => {
    this.setState({
      isRemoved: false,
      isSpam: false,
      isApproved: true
    });
    this.props.onApprove();
  }

  render() {
    console.log(this.state)

    return (
      <div className='ModeratorModalWrapper'>
        <Modal
          id={ this.props.id }
          className='DropdownModal ModeratorModal'
        >
          <div onClick={ this.props.onClick }>
            { this.props.children }
            <div className='ModeratorModalRowWrapper'>
              <DropdownRow icon='delete_remove' text='Remove' onClick={ this.doRemove } isSelected={ this.state.isRemoved }/>
              <DropdownRow icon='spam' text='Spam' onClick={ this.doSpam } isSelected={ this.state.isSpam && !this.state.isRemoved }/>
              <DropdownRow icon='check-circled' text='Approve' onClick={ this.doApprove } isSelected={ this.state.isApproved }/>
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch, { id }) => ({
  onSpam: () => dispatch(modActions.remove(id, true)),
  onApprove: () => dispatch(modActions.approve(id)),
  onRemove: () => dispatch(modActions.remove(id, false)),
});

export default connect(null, mapDispatchToProps)(ModeratorModal);
