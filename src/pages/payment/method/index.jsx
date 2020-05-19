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
import OperationModal from './components/OperationModal';
// import OperationDrawer from './components/OperationDrawer';
import styles from './style.less';

const { Search } = Input;

const ListContent = ({ data: { method_code } }) => (
  <div className={styles.listContent}>
    <div className={styles.listContentItem}>
      <span>方式代码</span>
      <p>{method_code}</p>
    </div>
  </div>
);

export const PaymentMethod = props => {
  const addButton = useRef(null);
  const {
    loading,
    dispatch,
    paymentMethodManagement: { list }
  } = props;
  const [done, setDone] = useState(false);
  const [visible, setVisible] = useState(false);
  // const [drawerVisible, setDrawerVisible] = useState(false);
  const [current, setCurrent] = useState(undefined);
  useEffect(() => {
    dispatch({
      type: 'paymentMethodManagement/fetch',
      payload: {}
    });
  }, [1]);
  const paginationProps = {
    showSizeChanger: true,
    showQuickJumper: true,
    pageSize: 10,
    total: list.length
  };

  const showModal = () => {
    setVisible(true);
    setCurrent(undefined);
  };

  const showEditModal = item => {
    setVisible(true);
    setCurrent(item);
  };

  const deleteItem = method_id => {
    dispatch({
      type: 'paymentMethodManagement/submit',
      payload: {
        method_id
      }
    });
  };

  const editAndDelete = (key, currentItem) => {
    if (key === 'edit') {
      showEditModal(currentItem);
    } else if (key === 'delete') {
      Modal.confirm({
        title: '删除支付方式',
        content: '确定删除该支付方式吗？',
        okText: '确认',
        cancelText: '取消',
        onOk: () => deleteItem(currentItem.method_id)
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
        <Menu onClick={({ key }) => editAndDelete(key, item)}>
          <Menu.Item key="edit">编辑</Menu.Item>
          <Menu.Item key="delete">删除</Menu.Item>
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
    const method_id = current ? current.method_id : '';
    setAddButtonBlur();
    setDone(true);
    dispatch({
      type: 'paymentMethodManagement/submit',
      payload: {
        method_id,
        ...values
      },
    });
  };

  return (
    <div>
      <PageHeaderWrapper>
        <div className={styles.standardList}>
          <Card
            className={styles.listCard}
            bordered={false}
            title="支付方式"
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
              rowKey="method_id"
              loading={loading}
              pagination={paginationProps}
              dataSource={list}
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
                    avatar={<Avatar src={item.method_logo} shape="square" size="large" />}
                    title={item.method_name}
                    description={item.method_desc}
                  />
                  <ListContent data={item} />
                </List.Item>
              )}
            />
          </Card>
        </div>
      </PageHeaderWrapper>

      <OperationModal
        done={done}
        current={current}
        visible={visible}
        onDone={handleDone}
        onCancel={handleCancel}
        onSubmit={handleSubmit}
      />

      {/* <OperationDrawer
        done={done}
        current={current}
        visible={visible}
        onDone={handleDone}
        onCancel={handleCancel}
        onSubmit={handleSubmit}
      /> */}
    </div>
  );
};
export default connect(({ paymentMethodManagement, loading }) => ({
  paymentMethodManagement,
  loading: loading.models.paymentMethodManagement
}))(PaymentMethod);