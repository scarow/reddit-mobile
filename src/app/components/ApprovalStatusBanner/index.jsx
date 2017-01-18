import './styles.less';
import React from 'react';
import { DropdownRow } from 'app/components/Dropdown';

const T = React.PropTypes;

const status_text = {
  spam: 'Removed as spam',
  removed: 'Removed',
  approved: 'Approved',
};

export function ApprovalStatusBanner(props) {
  const {
    status,
    statusBy,
    pageName,
  } = props;

  const bannerText = `${status_text[status]} by ${statusBy}`;

  return (
    <div className={ `ApprovalStatusBanner ${status} ${pageName}` }>
      <DropdownRow
        text={ bannerText }
      />
    </div>
  );
}

ApprovalStatusBanner.propTypes = {
  status: T.string,
  statusBy: T.string,
  pageName: T.string,
};

ApprovalStatusBanner.defaultProps = {
  status: null,
  pageName: null,
};
