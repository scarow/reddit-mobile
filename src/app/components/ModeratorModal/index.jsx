import React from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { Modal } from '@r/widgets/modal';
import { DropdownRow } from 'app/components/Dropdown';

import * as modActions from 'app/actions/modTools';

const T = React.PropTypes;

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
    return (
      <div className='ModeratorModalWrapper'>
        <Modal
          id={ this.props.id }
          className='DropdownModal ModeratorModal'
        >
          <div onClick={ this.props.onClick }>
            { this.props.children }
            <DropdownRow icon='delete_remove' text='Remove' onClick={ this.doRemove } isSelected={ this.state.isRemoved }/>
            <DropdownRow icon='spam' text='Spam' onClick={ this.doSpam } isSelected={ this.state.isSpam }/>
            <DropdownRow icon='check-circled' text='Approve' onClick={ this.doApprove } isSelected={ this.state.isApproved }/>
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
