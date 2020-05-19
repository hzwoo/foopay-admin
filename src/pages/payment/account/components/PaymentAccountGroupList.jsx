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
import GroupOperationModal from './PaymentAccountGroupOperationModal';
import AccountOperationModal from './PaymentAccountOperationModal';
import styles from '../style.less';

const { Search } = Input;

const ListContent = ({ data: { batch_no, account_type, batch_size, batch_remain } }) => (
  <div className={styles.listContent}>
    <div className={styles.listContentItem}>
      <span>批次编号</span>
      <p>{batch_no}</p>
    </div>
    <div className={styles.listContentItem}>
      <span>账户类型</span>
      <p>{account_type}</p>
    </div>
    <div className={styles.listContentItem}>
      <span>账户总数</span>
      <p>{batch_size}</p>
    </div>
    <div className={styles.listContentItem}>
      <span>未分配账户数</span>
      <p>{batch_remain}</p>
    </div>
  </div>
);

export const PaymentAccountGroupList = props => {
  const addButton = useRef(null);
  const {
    loading,
    dispatch,
    groupList,
  } = props;
  const [groupDone, setGroupDone] = useState(false);
  const [accountDone, setAccountDone] = useState(false);
  // const [rateDone, setRateDone] = useState(false);
  const [groupVisible, setGroupVisible] = useState(false);
  const [accountVisible, setAccountVisible] = useState(false);
  const [current, setCurrent] = useState(null);
  const [batchMode, setBatchMode] = useState(false);

  const paginationProps = {
    showSizeChanger: true,
    showQuickJumper: true,
    pageSize: 10,
    total: groupList.length
  };

  const showGroupModal = () => {
    setGroupVisible(true);
    setCurrent(null);
  };

  const showEditGroupModal = group => {
    setGroupVisible(true);
    setCurrent(group);
  };

  const deleteGroup = group_id => {
    dispatch({
      type: 'paymentAccountManagement/submitGroup',
      payload: {
        group_id
      }
    });
  };

  const showAccounts = group => {
    // console.log('show account, groupId:', group.group_id);
    dispatch({
      type: 'paymentAccountManagement/setGroup',
      payload: {
        group
      }
    });
  }

  const showAccountModal = (group, batch) => {
    // console.log('show account, groupId:', group.group_id);
    setAccountVisible(true);
    setBatchMode(batch || false);
    setCurrent(group);
  }

  const moreAction = (key, currentItem) => {
    if (key === 'batchAllotAccounts') {
      showAccountModal(currentItem, true);
    } else if (key === 'editGroup') {
      showEditGroupModal(currentItem);
    } else if (key === 'deleteGroup') {
      Modal.confirm({
        title: '删除账户组',
        content: '确定删除该账户组吗？',
        okText: '确认',
        cancelText: '取消',
        onOk: () => deleteGroup(currentItem.group_id)
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
          <Menu.Item key="batchAllotAccounts">批量分配账户</Menu.Item>
          <Menu.Item key="editGroup">修改账户组</Menu.Item>
          <Menu.Item key="deleteGroup">删除账户组</Menu.Item>
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

  const handleGroupDone = () => {
    setAddButtonBlur();
    setGroupDone(false);
    setGroupVisible(false);
  };

  const handleGroupCancel = () => {
    setAddButtonBlur();
    setGroupVisible(false);
  };

  const handleGroupSubmit = values => {
    const group_id = current ? current.group_id : null;
    setAddButtonBlur();
    setGroupDone(true);
    dispatch({
      type: 'paymentAccountManagement/submitGroup',
      payload: {
        group_id,
        ...values
      },
    });
  };

  const handleAccountDone = () => {
    setAddButtonBlur();
    setAccountDone(false);
    setAccountVisible(false);
  };

  const handleAccountCancel = () => {
    setAddButtonBlur();
    setAccountVisible(false);
    // dispatch({
    //   type: 'paymentAccountManagement/resetProductList',
    //   payload: {},
    // });
  };

  const handleAccountSubmit = values => {
    const group_id = current ? current.group_id : '';
    setAddButtonBlur();
    setAccountDone(true);
    dispatch({
      type: 'paymentAccountManagement/submitAccount',
      payload: {
        group_id,
        ...values
      },
    });
  };

  const groupOperationModal = (
    <GroupOperationModal
      done={groupDone}
      current={current}
      visible={groupVisible}
      onDone={handleGroupDone}
      onCancel={handleGroupCancel}
      onSubmit={handleGroupSubmit}
    />
  );

  let accountOperationModal = null;

  if (current) {
    accountOperationModal = (
      <AccountOperationModal
        done={accountDone}
        group={current}
        batch={batchMode}
        // current={null}
        visible={accountVisible}
        onDone={handleAccountDone}
        onCancel={handleAccountCancel}
        onSubmit={handleAccountSubmit}
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
            title="支付账户组"
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
              onClick={showGroupModal}
              ref={addButton}
            >
              <PlusOutlined />
            </Button>

            <List
              size="large"
              rowKey="group_id"
              loading={loading}
              pagination={paginationProps}
              dataSource={groupList}
              renderItem={item => (
                <List.Item
                  actions={[
                    <a
                      key="enter"
                      onClick={e => {
                        e.preventDefault();
                        showAccounts(item);
                      }}
                    >
                      进入账户列表
                    </a>,
                    <a
                      key="allot"
                      onClick={e => {
                        e.preventDefault();
                        showAccountModal(item);
                      }}
                    >
                      分配账户
                  </a>,
                    <MoreButton key="more" item={item} />
                  ]}
                >
                  <List.Item.Meta
                    avatar={<Avatar src={item.group_logo} shape="square" size="large" />}
                    title={item.group_name}
                  // description={item.channel_desc}
                  />
                  <ListContent data={item} />
                </List.Item>
              )}
            />
          </Card>
        </div>
      </PageHeaderWrapper>

      {groupOperationModal}

      {accountOperationModal}

    </div>
  );

};

export default connect(({ paymentAccountManagement, loading }) => ({
  paymentAccountManagement,
  loading: loading.models.paymentAccountManagement
}))(PaymentAccountGroupList);