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
import ProductOperationModal from './ProductOperationModal';
import styles from '../style.less';

const { Search } = Input;

const ListContent = ({ data: { product_code } }) => (
  <div className={styles.listContent}>
    <div className={styles.listContentItem}>
      <span>产品代码</span>
      <p>{product_code}</p>
    </div>
  </div>
);


export const PaymentProductList = props => {
  const addButton = useRef(null);
  const {
    loading,
    dispatch,
    methodList,
    // currentVendor,
    // productList,
    // vendor,
    paymentProductManagement: {
      currentVendor,
      // currentProduct,
      // methodList,
      productList
    }
  } = props;
  const [done, setDone] = useState(false);
  const [visible, setVisible] = useState(false);
  const [current, setCurrent] = useState(undefined);
  // useEffect(() => {
  //   dispatch({
  //     type: 'paymentProductManagement/fetchMethods',
  //     payload: {}
  //   });
  // }, [1]);
  useEffect(() => {
    // console.log('ProductList dispatch fetch vendor');
    dispatch({
      type: 'paymentProductManagement/fetchProducts',
      payload: {
        vendor_id: currentVendor.vendor_id
      }
    });
  }, [1]);
  const paginationProps = {
    showSizeChanger: true,
    showQuickJumper: true,
    pageSize: 10,
    total: productList.length
  };

  const showModal = () => {
    setVisible(true);
    setCurrent(undefined);
  };

  const showEditModal = item => {
    setVisible(true);
    setCurrent(item);
  };

  const backToVendor = () => {
    dispatch({
      type: 'paymentProductManagement/setVendor',
      payload: {
        vendor: null
      }
    });
  }

  const deleteItem = vendor_id => {
    dispatch({
      type: 'paymentProductManagement/submitProduct',
      payload: {
        vendor_id
      }
    });
  };

  const editAndDelete = (key, currentItem) => {
    if (key === 'edit') {
      showEditModal(currentItem);
    } else if (key === 'delete') {
      Modal.confirm({
        title: '删除支付产品',
        content: '确定删除该支付产品吗？',
        okText: '确认',
        cancelText: '取消',
        onOk: () => deleteItem(currentItem.product_id)
      });
    }
  };

  const extraContent = (
    <div className={styles.extraContent}>
      <Button type="primary" onClick={backToVendor}>
        返回支付应用商
      </Button>
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
    const product_id = current ? current.product_id : '';
    setAddButtonBlur();
    setDone(true);
    dispatch({
      type: 'paymentProductManagement/submitProduct',
      payload: {
        product_id,
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
            title="支付产品"
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
              rowKey="product_id"
              loading={loading}
              pagination={paginationProps}
              dataSource={productList}
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
                    title={item.product_name}
                    description={item.product_desc}
                  />
                  <ListContent data={item} />
                </List.Item>
              )}
            />
          </Card>
        </div>
      </PageHeaderWrapper>

      <ProductOperationModal
        methodList={methodList}
        done={done}
        vendor={currentVendor}
        current={current}
        visible={visible}
        onDone={handleDone}
        onCancel={handleCancel}
        onSubmit={handleSubmit}
      />

    </div>
  );
};

export default connect(({ paymentProductManagement, loading }) => ({
  paymentProductManagement,
  loading: loading.models.paymentProductManagement
}))(PaymentProductList);
