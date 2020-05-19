import React, {
  // useRef,
  useState,
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

export const PaymentAccountConfigDrawer = props => {
  const {
    loading,
    dispatch,
    account,
    visible,
    onClose,
    paymentAccountManagement: {
      handlerList,
      rateList
    }
  } = props;
  const [currentTab, setCurrentTab] = useState('config');
  // useEffect(() => {
  //   if (account) {
  //     dispatch({
  //       type: 'paymentAccountManagement/fetchConfigs',
  //       payload: {
  //         account_id: account.account_id
  //       }
  //     });
  //   }
  // }, [1]);

  const paginationProps = {
    showSizeChanger: true,
    showQuickJumper: true,
    pageSize: 10,
    total: handlerList.length
  };

  const handleModifyRate = (item) => {
    // TODO
  };

  const handleModifyConfig = (item) => {
    // TODO
  }

  const moreAction = (key, currentItem) => {
    if (key === 'modifyRate') {
      handleModifyRate(currentItem);
    } else if (key === 'modifyConfig') {
      handleModifyConfig(currentItem);
    }
    else if (key === 'deleteHandler') {
      Modal.confirm({
        title: '删除支付受理',
        content: '确定删除该支付受理吗？',
        okText: '确认',
        cancelText: '取消',
        onOk: () => { }
      });
    }
  };

  const MoreButton = ({ item }) => (
    <Dropdown
      overlay={
        <Menu onClick={({ key }) => moreAction(key, item)}>
          <Menu.Item key="modifyRate">修改费率</Menu.Item>
          <Menu.Item key="modifyConfig">配置参数</Menu.Item>
          <Menu.Item key="deleteHandler">删除受理</Menu.Item>
        </Menu>
      }
    >
      <a>
        更多 <DownOutlined />
      </a>
    </Dropdown>
  );

  const drawerTitle = '支付配置';


  const accountConfig = (<p>config</p>);

  const accountHandlerList = (<List
    size="large"
    rowKey="handler_id"
    loading={loading}
    pagination={paginationProps}
    dataSource={handlerList}
    renderItem={item => (
      <List.Item
        actions={[
          <a
            key="view"
            onClick={e => {
              e.preventDefault();
              // showEditModal(item);
            }}
          >
            查看
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
  />);

  const tabList = [{
    key: 'config',
    tab: '参数配置'
  }, {
    key: 'handler',
    tab: '受理配置'
  }];

  const contentList = {
    config: accountConfig,
    handler: accountHandlerList
  };

  const handleTabChange = key => {
    setCurrentTab(key);
  }

  return (
    <Drawer
      title={drawerTitle}
      visible={visible}
      width={1080}
      bodyStyle={{ paddingBottom: 80 }}
      onClose={onClose}
    >
      <div className={styles.standardList}>
        <Card
          className={styles.listCard}
          bordered={false}
          // title={drawerTitle}
          // style={{
          //   marginTop: 24
          // }}
          bodyStyle={{
            padding: '0 32px 40px 32px'
          }}
          tabList={tabList}
          activeTabKey={currentTab}
          onTabChange={handleTabChange}
        // extra={extraContent}
        >
          {contentList[currentTab]}
        </Card>
      </div>
    </Drawer>
  );
};

export default connect(({ paymentAccountManagement, loading }) => ({
  paymentAccountManagement,
  loading: loading.models.paymentChannelManagement
}))(PaymentAccountConfigDrawer);