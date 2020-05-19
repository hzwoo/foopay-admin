import React, {
  useRef,
  useState,
  useEffect
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
import HandlerOperationModal from './PaymentHandlerOperationModal';
import RateListDrawer from './PaymentRateListDrawer';
import RateOperationModal from './PaymentRateOperationModal';
import styles from '../style.less';

const { Search } = Input;

const ListContent = ({ data: { product_code, product_name, product_desc } }) => (
  <div className={styles.listContent}>
    <div className={styles.listContentItem}>
      <span>产品名称</span>
      <p>{product_name}</p>
    </div>
    <div className={styles.listContentItem}>
      <span>产品代码</span>
      <p>{product_code}</p>
    </div>
    <div className={styles.listContentItem}>
      <span>产品说明</span>
      <p>{product_desc}</p>
    </div>
  </div>
);


export const PaymentHandlerList = props => {
  const addButton = useRef(null);
  const {
    loading,
    dispatch,
    paymentChannelManagement: {
      currentChannel,
      handlerList,
      rateList
    }
  } = props;
  const [done, setDone] = useState(false);
  const [visible, setVisible] = useState(false);
  const [current, setCurrent] = useState(undefined);
  const [rateDone, setRateDone] = useState(false);
  const [rateDrawerVisible, setRateDrawerVisible] = useState(false);
  const [rateModalVisible, setRateModalVisible] = useState(false);

  useEffect(() => {
    dispatch({
      type: 'paymentChannelManagement/fetchHandlers',
      payload: {
        channel_id: currentChannel.channel_id
      }
    });
  }, [1]);
  useEffect(() => {
    dispatch({
      type: 'paymentChannelManagement/fetchRates',
      payload: {
        channel_id: currentChannel.channel_id
      }
    });
  }, [1]);

  const paginationProps = {
    showSizeChanger: true,
    showQuickJumper: true,
    pageSize: 10,
    total: handlerList.length
  };

  const showModal = () => {
    setVisible(true);
    setCurrent(undefined);
  };

  const showEditModal = item => {
    setVisible(true);
    setCurrent(item);
  };

  const backToChannel = () => {
    dispatch({
      type: 'paymentChannelManagement/setChannel',
      payload: {
        channel: null
      }
    });
  }

  const deleteItem = channel_id => {
    dispatch({
      type: 'paymentChannelManagement/submitHandler',
      payload: {
        channel_id
      }
    });
  };

  const showRateDrawer = handler => {
    // console.log('show rate drawer:', handler);
    setRateDrawerVisible(true);
    setCurrent(handler);
  };

  const handleRateDrawerClose = () => {
    setRateDrawerVisible(false);
    setCurrent(null);
  }

  const showRateModal = handler => {
    setRateModalVisible(true);
    setCurrent(handler);
  }

  const moreAction = (key, currentItem) => {
    if (key === 'showRate') {
      showRateDrawer(currentItem);
    } else if (key === 'addRate') {
      showRateModal(currentItem);
    } else if (key === 'delete') {
      Modal.confirm({
        title: '删除受理产品',
        content: '确定删除该受理产品吗？',
        okText: '确认',
        cancelText: '取消',
        onOk: () => deleteItem(currentItem.handler_id)
      });
    }
  };

  const extraContent = (
    <div className={styles.extraContent}>
      <Button type="primary" onClick={backToChannel}>
        返回支付渠道
      </Button>
      <Search className={styles.extraContentSearch} placeholder="请输入" onSearch={() => ({})} />
    </div>
  );

  let rateMenuAction = null;
  if (current && current.has_rate) {
    rateMenuAction = (
      <Menu.Item key="showRate">查看受理费率</Menu.Item>
    );
  } else {
    rateMenuAction = (
      <Menu.Item key="addRate">添加受理费率</Menu.Item>
    );
  }

  const MoreButton = ({ item }) => (
    <Dropdown
      overlay={
        <Menu onClick={({ key }) => moreAction(key, item)}>
          {rateMenuAction}
          <Menu.Item key="delete">删除受理产品</Menu.Item>
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

  const handleDone = () => {
    setAddButtonBlur();
    setDone(false);
    setVisible(false);
  };

  const handleCancel = () => {
    setAddButtonBlur();
    setVisible(false);
  };

  const handleSubmit = values => {
    const handler_id = current ? current.handler_id : '';
    setAddButtonBlur();
    setDone(true);
    dispatch({
      type: 'paymentHandlerManagement/submitHandler',
      payload: {
        handler_id,
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

  const rateListDrawer = (
    <RateListDrawer
      visible={rateDrawerVisible}
      channel={currentChannel}
      handler={current}
      channelRateList={rateList}
      onClose={handleRateDrawerClose}
    />
  );

  const rateOperationModal = (
    <RateOperationModal
      done={rateDone}
      visible={rateModalVisible}
      channel={currentChannel}
      handler={current}
      rateList={rateList}
      onDone={handleRateDone}
      onCancel={handleRateCancel}
      onSubmit={handleRateSubmit}
    />
  );

  return (
    <div>
      <PageHeaderWrapper>
        <div className={styles.standardList}>
          <Card
            className={styles.listCard}
            bordered={false}
            title={`受理产品 - ${currentChannel.channel_name}受理`}
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
              onClick={showModal}
              ref={addButton}
            >
              <PlusOutlined />
            </Button>

            <List
              size="large"
              rowKey="handler_id"
              loading={loading}
              pagination={paginationProps}
              dataSource={handlerList}
              renderItem={item => (
                <List.Item
                  actions={[
                    <a
                      key="edit"
                      onClick={e => {
                        e.preventDefault();
                        showEditModal(item);
                      }}
                    >
                      编辑
                    </a>,
                    <MoreButton key="more" item={item} />
                  ]}
                >
                  <List.Item.Meta
                    avatar={<Avatar src={item.product_logo} shape="square" size="large" />}
                    title={item.vendor_name}
                    description={item.product_name}
                  />
                  <ListContent data={item} />
                </List.Item>
              )}
            />
          </Card>
        </div>
      </PageHeaderWrapper>

      <HandlerOperationModal
        vendorList={[]}
        done={done}
        channel={currentChannel}
        current={current}
        visible={visible}
        onDone={handleDone}
        onCancel={handleCancel}
        onSubmit={handleSubmit}
      />

      {rateListDrawer}

      {rateOperationModal}

    </div>
  );
};

export default connect(({ paymentChannelManagement, loading }) => ({
  paymentChannelManagement,
  loading: loading.models.paymentChannelManagement
}))(PaymentHandlerList);
