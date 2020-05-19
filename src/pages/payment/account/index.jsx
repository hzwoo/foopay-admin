import React, {
  useEffect
} from 'react';
import {
  connect
} from 'umi';
import GroupList from './components/PaymentAccountGroupList';
import AccountList from './components/PaymentAccountList';
import AccountHandlerOperation from './components/PaymentAccountHandlerOperation';

export const PaymentAccountManagement = props => {
  const {
    dispatch,
    paymentAccountManagement: {
      currentGroup,
      currentAccount,
      groupList,
    }
  } = props;

  useEffect(() => {
    dispatch({
      type: 'paymentAccountManagement/fetchGroups',
      payload: {}
    });
  }, [1]);

  let content;

  if (currentGroup) {
    if (currentAccount) {
      content = <AccountHandlerOperation />
    } else {
      content = <AccountList />;
    }

  } else {
    content = <GroupList
      groupList={groupList}
    />;
  }

  return (
    <div>
      {content}
    </div>
  );
};

export default connect(({ paymentAccountManagement, loading }) => ({
  paymentAccountManagement,
  loading: loading.models.paymentAccountManagement
}))(PaymentAccountManagement);