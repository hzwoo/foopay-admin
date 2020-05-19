import React, {
  // useRef,
  // useState,
  useEffect
} from 'react';
import {
  DownOutlined,
  // PlusOutlined,
} from '@ant-design/icons';
import {
  Avatar,
  // Button,
  Card,
  // Col,
  // Drawer,
  Dropdown,
  // Input,
  List,
  Menu,
  Modal,
  Drawer,
  // Radio,
  // Row
} from 'antd';
// import { findDOMNode } from 'react-dom';
import {
  connect
} from 'umi';
import styles from '../style.less';

const ListContent = ({ data: { rate_name, rate_mode, rate_type, rate } }) => (
  <div className={styles.listContent}>
    <div className={styles.listContentItem}>
      <span>费率名称</span>
      <p>{rate_name}</p>
    </div>
    <div className={styles.listContentItem}>
      <span>费率模式</span>
      <p>{rate_mode}</p>
    </div>
    <div className={styles.listContentItem}>
      <span>费率类型</span>
      <p>{rate_type}</p>
    </div>
    <div className={styles.listContentItem}>
      <span>费率</span>
      <p>{rate}</p>
    </div>
  </div>
);


export const PaymentRateListDrawer = props => {
  const {
    loading,
    dispatch,
    channel,
    handler,
    paymentChannelManagement: {
      rateList
    },
    visible,
    onClose
  } = props;
  // const [rateList, setRateList] = useState(channelRateList);

  useEffect(() => {
    dispatch({
      type: 'paymentChannelManagement/fetchRates',
      payload: {
        channel_id: channel.channel_id
      }
    });
  }, [1]);
  // if (handler) {
  //   setRateList(rateList.filter(item => item.handler_id === handler.handler_id));
  // }
  // console.log('drawer channel:', channel);
  // console.log('drawer handler:', handler);
  // console.log('drawer rate list:', rateList);
  // }, [props.channel, props.handler]);

  const paginationProps = {
    showSizeChanger: true,
    showQuickJumper: true,
    pageSize: 10,
    total: rateList.length
  };

  const deleteItem = rate_id => {
    dispatch({
      type: 'paymentChannelManagement/submitRate',
      payload: {
        rate_id
      }
    });
  };

  // const handleClose = () => {
  //   setVisible(false);
  // }

  const moreAction = (key, currentItem) => {
    if (key === 'delete') {
      Modal.confirm({
        title: '删除费率',
        content: '确定删除该费率吗？',
        okText: '确认',
        cancelText: '取消',
        onOk: () => deleteItem(currentItem.rate_id)
      });
    }
  };

  const MoreButton = ({ item }) => (
    <Dropdown
      overlay={
        <Menu onClick={({ key }) => moreAction(key, item)}>
          <Menu.Item key="delete">删除费率</Menu.Item>
        </Menu>
      }
    >
      <a>
        更多 <DownOutlined />
      </a>
    </Dropdown>
  );

  let drawerTitle = '费率列表';
  if (channel) {
    if (handler) {
      drawerTitle = '受理费率';
    } else {
      drawerTitle = '渠道费率';
    }
  }

  return (
    // <div>
    <Drawer
      title={drawerTitle}
      visible={visible}
      width={1080}
      bodyStyle={{ paddingBottom: 80 }}
      onClose={onClose}
    // destroyOnClose
    >
      <div className={styles.standardList}>
        <Card
          className={styles.listCard}
          bordered={false}
          title={drawerTitle}
          style={{
            marginTop: 24
          }}
          bodyStyle={{
            padding: '0 32px 40px 32px'
          }}
        // extra={extraContent}
        >
          {/* <Button
              type="dashed"
              style={{
                width: '100%',
                marginBottom: 8
              }}
              onClick={showModal}
              ref={addButton}
            >
              <PlusOutlined />
            </Button> */}

          <List
            size="large"
            rowKey="rate_id"
            loading={loading}
            pagination={paginationProps}
            dataSource={rateList}
            renderItem={item => (
              <List.Item
                actions={[
                  <a
                    key="edit"
                    onClick={e => {
                      e.preventDefault();
                      // showEditModal(item);
                    }}
                  >
                    修改
                    </a>,
                  <MoreButton key="more" item={item} />
                ]}
              >
                <List.Item.Meta
                  avatar={<Avatar src={item.channel_logo} shape="square" size="large" />}
                  title={item.rate_name}
                // description={item.product_name}
                />
                <ListContent data={item} />
              </List.Item>
            )}
          />
        </Card>
      </div>
    </Drawer>
    // </div>
  );
};


// export default PaymentRateListDrawer;
export default connect(({ paymentChannelManagement, loading }) => ({
  paymentChannelManagement,
  loading: loading.models.paymentChannelManagement
}))(PaymentRateListDrawer);