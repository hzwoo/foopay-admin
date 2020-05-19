import React, {
  useRef,
  useState,
  // useEffect
} from 'react';
import {
  DownOutlined,
  PlusOutlined
} from '@ant-design/icons';
import {
  Avatar,
  Button,
  Card,
  // Col,
  // Drawer,
  Dropdown,
  Input,
  List,
  Menu,
  Modal,
  // Radio,
  // Row
} from 'antd';
import { findDOMNode } from 'react-dom';
import {
  PageHeaderWrapper
} from '@ant-design/pro-layout';
import {
  connect
} from 'umi';
import ChannelOperationModal from './PaymentChannelOperationModal';
import HandlerOperationModal from './PaymentHandlerOperationModal';
import RateListDrawer from './PaymentRateListDrawer';
import RateOperationModal from './PaymentRateOperationModal';
import styles from '../style.less';

const { Search } = Input;

const ListContent = ({ data: { channel_code, num_of_handlers } }) => (
  <div className={styles.listContent}>
    <div className={styles.listContentItem}>
      <span>渠道代码</span>
      <p>{channel_code}</p>
    </div>
    <div className={styles.listContentItem}>
      <span>受理产品数</span>
      <p>{num_of_handlers}</p>
    </div>
  </div>
);

export const PaymentChannelList = props => {
  const addButton = useRef(null);
  const {
    loading,
    dispatch,
    channelList,
    // paymentChannelManagement: {
    //   rateList
    // }
  } = props;
  const [channelDone, setChannelDone] = useState(false);
  const [handlerDone, setHandlerDone] = useState(false);
  const [rateDone, setRateDone] = useState(false);
  const [channelVisible, setChannelVisible] = useState(false);
  const [handlerVisible, setHandlerVisible] = useState(false);
  const [rateDrawerVisible, setRateDrawerVisible] = useState(false);
  const [rateModalVisible, setRateModalVisible] = useState(false);
  const [current, setCurrent] = useState(null);

  const paginationProps = {
    showSizeChanger: true,
    showQuickJumper: true,
    pageSize: 10,
    total: channelList.length
  };

  const showChannelModal = () => {
    setChannelVisible(true);
    setCurrent(null);
  };

  const showEditChannelModal = channel => {
    setChannelVisible(true);
    setCurrent(channel);
  };

  const deleteChannel = channel_id => {
    dispatch({
      type: 'paymentChannelManagement/submitChannel',
      payload: {
        channel_id
      }
    });
  };

  const showHandlers = channel => {
    // console.log('show handlers, channelId:', channel.channel_id);
    dispatch({
      type: 'paymentChannelManagement/setChannel',
      payload: {
        channel
      }
    });
  }

  const showHandlerModal = channel => {
    setHandlerVisible(true);
    setCurrent(channel);
  };

  const showRateDrawer = channel => {
    // console.log('show rate drawer:', channel);
    setRateDrawerVisible(true);
    setCurrent(channel);
    // dispatch({
    //   type: 'paymentChannelManagement/fetchRates',
    //   payload: {
    //     channel_id: channel.channel_id
    //   }
    // });
  };

  const handleRateDrawerClose = () => {
    setRateDrawerVisible(false);
    setCurrent(null);
  }

  const showRateModal = channel => {
    setRateModalVisible(true);
    setCurrent(channel);
    // dispatch({
    //   type: 'paymentChannelManagement/fetchRates',
    //   payload: {
    //     channel_id: channel.channel_id
    //   }
    // });
  }

  const moreAction = (key, currentItem) => {
    if (key === 'showHandlers') {
      showHandlers(currentItem);
    } else if (key === 'addHandler') {
      showHandlerModal(currentItem);
    } else if (key === 'showRates') {
      showRateDrawer(currentItem);
    } else if (key === 'addRate') {
      showRateModal(currentItem);
    } else if (key === 'deleteChannel') {
      Modal.confirm({
        title: '删除支付渠道',
        content: '确定删除该支付渠道吗？',
        okText: '确认',
        cancelText: '取消',
        onOk: () => deleteChannel(currentItem.channel_id)
      });
    }
  };

  const extraContent = (
    <div className={styles.extraContent}>
      <Search className={styles.extraContentSearch} placeholder="请输入" onSearch={() => ({})} />
    </div>
  );

  const MoreButton = ({ item }) => (
    <Dropdown
      overlay={
        <Menu onClick={({ key }) => moreAction(key, item)}>
          <Menu.Item key="showHandlers">查看受理产品</Menu.Item>
          <Menu.Item key="addHandler">添加受理产品</Menu.Item>
          <Menu.Item key="showRates">查看渠道费率</Menu.Item>
          <Menu.Item key="addRate">添加渠道费率</Menu.Item>
          <Menu.Item key="deleteChannel">删除支付渠道</Menu.Item>
        </Menu>
      }
    >
      <a>
        更多 <DownOutlined />
      </a>
    </Dropdown>
  );



  const setAddButtonBlur = () => {
    if (addButton.current) {
      // eslint-disable-next-line react/no-find-dom-node
      const addButtonDom = findDOMNode(addButton.current);
      setTimeout(() => addButtonDom.blur(), 0);
    }
  };

  const handleChannelDone = () => {
    setAddButtonBlur();
    setChannelDone(false);
    setChannelVisible(false);
  };

  const handleChannelCancel = () => {
    setAddButtonBlur();
    setChannelVisible(false);
  };

  const handleChannelSubmit = values => {
    const channel_id = current ? current.channel_id : null;
    setAddButtonBlur();
    setChannelDone(true);
    dispatch({
      type: 'paymentChannelManagement/submitChannel',
      payload: {
        channel_id,
        ...values
      },
    });
  };

  const handleHandlerDone = () => {
    setAddButtonBlur();
    setHandlerDone(false);
    setHandlerVisible(false);
  };

  const handleHandlerCancel = () => {
    setAddButtonBlur();
    setHandlerVisible(false);
    dispatch({
      type: 'paymentChannelManagement/resetProductList',
      payload: {},
    });
  };

  const handleHandlerSubmit = values => {
    const channel_id = current ? current.channel_id : '';
    setAddButtonBlur();
    setHandlerDone(true);
    dispatch({
      type: 'paymentChannelManagement/submitHandler',
      payload: {
        channel_id,
        ...values
      },
    });
  };

  const handleRateDone = () => {
    setAddButtonBlur();
    setRateDone(false);
    setRateModalVisible(false);
  };

  const handleRateCancel = () => {
    setAddButtonBlur();
    setRateModalVisible(false);
  };

  const handleRateSubmit = values => {
    const channel_id = current ? current.channel_id : '';
    setAddButtonBlur();
    setRateDone(true);
    dispatch({
      type: 'paymentChannelManagement/submitRate',
      payload: {
        channel_id,
        ...values
      },
    });
  };

  const channelOperationModal = (
    <ChannelOperationModal
      done={channelDone}
      current={current}
      visible={channelVisible}
      onDone={handleChannelDone}
      onCancel={handleChannelCancel}
      onSubmit={handleChannelSubmit}
    />
  );

  let handlerOperationModal = null;
  let rateListDrawer = null;
  let rateOperationModal = null;

  if (current) {
    handlerOperationModal = (
      <HandlerOperationModal
        done={handlerDone}
        channel={current}
        current={null}
        visible={handlerVisible}
        onDone={handleHandlerDone}
        onCancel={handleHandlerCancel}
        onSubmit={handleHandlerSubmit}
      />
    );

    rateListDrawer = (
      <RateListDrawer
        visible={rateDrawerVisible}
        channel={current}
        // channelRateList={rateList}
        onClose={handleRateDrawerClose}
      />
    );

    rateOperationModal = (
      <RateOperationModal
        done={rateDone}
        visible={rateModalVisible}
        channel={current}
        // rateList={rateList}
        onDone={handleRateDone}
        onCancel={handleRateCancel}
        onSubmit={handleRateSubmit}
      />
    );
  }

  return (
    <div>
      <PageHeaderWrapper>
        <div className={styles.standardList}>
          <Card
            className={styles.listCard}
            bordered={false}
            title="支付渠道"
            style={{
              marginTop: 24
            }}
            bodyStyle={{
              padding: '0 32px 40px 32px'
            }}
            extra={extraContent}
          >
            <Button
              type="dashed"
              style={{
                width: '100%',
                marginBottom: 8
              }}
              onClick={showChannelModal}
              ref={addButton}
            >
              <PlusOutlined />
            </Button>

            <List
              size="large"
              rowKey="channel_id"
              loading={loading}
              pagination={paginationProps}
              dataSource={channelList}
              renderItem={item => (
                <List.Item
                  actions={[
                    <a
                      key="edit"
                      onClick={e => {
                        e.preventDefault();
                        showEditChannelModal(item);
                      }}
                    >
                      查看
                    </a>,
                    <MoreButton key="more" item={item} />
                  ]}
                >
                  <List.Item.Meta
                    avatar={<Avatar src={item.channel_logo} shape="square" size="large" />}
                    title={item.channel_name}
                    description={item.channel_desc}
                  />
                  <ListContent data={item} />
                </List.Item>
              )}
            />
          </Card>
        </div>
      </PageHeaderWrapper>

      {channelOperationModal}

      {handlerOperationModal}

      {rateListDrawer}

      {rateOperationModal}

    </div>
  );
};

export default connect(({ paymentChannelManagement, loading }) => ({
  paymentChannelManagement,
  loading: loading.models.paymentChannelManagement
}))(PaymentChannelList);
