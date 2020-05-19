import React, {
  useEffect
} from 'react';
import {
  connect
} from 'umi';
import ChannelList from './components/PaymentChannelList';
import HandlerList from './components/PaymentHandlerList';

export const PaymentChannelManagement = props => {
  const {
    dispatch,
    paymentChannelManagement: {
      currentChannel,
      channelList,
    }
  } = props;

  useEffect(() => {
    dispatch({
      type: 'paymentChannelManagement/fetchChannels',
      payload: {}
    });
  }, [1]);

  let list;

  if (currentChannel) {
    list = <HandlerList />;
  } else {
    list = <ChannelList
      channelList={channelList}
    />;
  }

  return (
    <div>
      {list}
    </div>
  );
};

export default connect(({ paymentChannelManagement, loading }) => ({
  paymentChannelManagement,
  loading: loading.models.paymentChannelManagement
}))(PaymentChannelManagement);