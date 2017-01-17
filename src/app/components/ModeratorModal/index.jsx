import './styles.less';
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
    isApproved: T.bool.isRequired,
    isRemoved: T.bool.isRequired,
    isSpam: T.bool.isRequired,
    modalId: T.string,
    removedBy: T.string,
    approvedBy: T.string,
  }

  render() {
    let bannerText;
    let approvalStatus;

    if (this.props.isSpam) {
      bannerText = `Removed as spam by ${this.props.removedBy}`;
      approvalStatus = 'spam';
    } else if (this.props.isRemoved) {
      bannerText = `Removed by ${this.props.removedBy}`;
      approvalStatus = 'removed';
    } else if (this.props.isApproved) {
      bannerText = `Approved by ${this.props.approvedBy}`;
      approvalStatus = 'approved';
    }

    const banner = (
      <div className={`ModeratorModal__banner ${approvalStatus}`}>
        <DropdownRow
          text={ bannerText }
        />
      </div>
    )

    return (
      <div className='ModeratorModalWrapper'>
        <Modal
          id={ this.props.modalId || this.props.id }
          className='DropdownModal ModeratorModal'
        >
          { banner }
          <div onClick={ this.props.onClick }>
            { this.props.children }
            <div className='ModeratorModalRowWrapper'>
              <DropdownRow icon='delete_remove' text='Remove' onClick={ this.props.onRemove } isSelected={ this.props.isRemoved }/>
              <DropdownRow icon='spam' text='Spam' onClick={ this.props.onSpam } isSelected={ this.props.isSpam }/>
              <DropdownRow icon='check-circled' text='Approve' onClick={ this.props.onApprove } isSelected={ this.props.isApproved }/>
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
