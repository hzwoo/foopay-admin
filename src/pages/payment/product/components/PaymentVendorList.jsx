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
import VendorOperationModal from './VendorOperationModal';
import ProductOperationModal from './ProductOperationModal';
import styles from '../style.less';

const { Search } = Input;

const ListContent = ({ data: { vendor_code } }) => (
  <div className={styles.listContent}>
    <div className={styles.listContentItem}>
      <span>应用商代码</span>
      <p>{vendor_code}</p>
    </div>
  </div>
);


export const PaymentVendorList = props => {
  const addButton = useRef(null);
  const {
    loading,
    dispatch,
    methodList,
    vendorList,
    // paymentProductManagement: {
    //   // methodList,
    //   // vendorList
    // }
  } = props;
  const [vendorDone, setVendorDone] = useState(false);
  const [productDone, setProductDone] = useState(false);
  const [vendorVisible, setVendorVisible] = useState(false);
  const [productVisible, setProductVisible] = useState(false);
  const [current, setCurrent] = useState(null);
  // useEffect(() => {
  //   dispatch({
  //     type: 'paymentProductManagement/fetchMethods',
  //     payload: {}
  //   });
  // }, [1]);
  // useEffect(() => {
  //   console.log('VendorList dispatch fetch vendor');
  //   dispatch({
  //     type: 'paymentProductManagement/fetchVendors',
  //     payload: {}
  //   });
  // }, [1]);
  const paginationProps = {
    showSizeChanger: true,
    showQuickJumper: true,
    pageSize: 10,
    total: vendorList.length
  };

  const showVendorModal = () => {
    setVendorVisible(true);
    setCurrent(null);
  };

  const showEditVendorModal = vendor => {
    setVendorVisible(true);
    setCurrent(vendor);
  };

  const deleteVendor = vendor_id => {
    dispatch({
      type: 'paymentProductManagement/submitVendor',
      payload: {
        vendor_id
      }
    });
  };

  const showProducts = vendor => {
    // console.log('show products, vendorId:', vendor.vendor_id);
    dispatch({
      type: 'paymentProductManagement/setVendor',
      payload: {
        vendor
      }
    });
  }

  const showProductModal = vendor => {
    setProductVisible(true);
    setCurrent(vendor);
  };

  const moreAction = (key, currentItem) => {
    if (key === 'showProducts') {
      showProducts(currentItem);
    } else if (key === 'addProduct') {
      showProductModal(currentItem);
    } else if (key === 'deleteVendor') {
      Modal.confirm({
        title: '删除支付应用',
        content: '确定删除该支付应用吗？',
        okText: '确认',
        cancelText: '取消',
        onOk: () => deleteVendor(currentItem.vendor_id)
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
          <Menu.Item key="showProducts">查看支付产品</Menu.Item>
          <Menu.Item key="addProduct">添加支付产品</Menu.Item>
          <Menu.Item key="deleteVendor">删除支付应用</Menu.Item>
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

  const handleVendorDone = () => {
    setAddButtonBlur();
    setVendorDone(false);
    setVendorVisible(false);
  };

  const handleVendorCancel = () => {
    setAddButtonBlur();
    setVendorVisible(false);
  };

  const handleVendorSubmit = values => {
    const vendor_id = current ? current.vendor_id : null;
    setAddButtonBlur();
    setVendorDone(true);
    dispatch({
      type: 'paymentProductManagement/submitVendor',
      payload: {
        vendor_id,
        ...values
      },
    });
  };

  const handleProductDone = () => {
    setAddButtonBlur();
    setProductDone(false);
    setProductVisible(false);
  };

  const handleProductCancel = () => {
    setAddButtonBlur();
    setProductVisible(false);
  };

  const handleProductSubmit = values => {
    const vendor_id = current ? current.vendor_id : '';
    setAddButtonBlur();
    setProductDone(true);
    dispatch({
      type: 'paymentProductManagement/submitProduct',
      payload: {
        vendor_id,
        ...values
      },
    });
  };

  const vendorOperationModal = <VendorOperationModal
    done={vendorDone}
    current={current}
    visible={vendorVisible}
    onDone={handleVendorDone}
    onCancel={handleVendorCancel}
    onSubmit={handleVendorSubmit}
  />

  let productOperationModal = null;
  if (current) {
    // console.log('currentVendor:', currentVendor);
    // console.log('methodList:', methodList);
    productOperationModal = <ProductOperationModal
      done={productDone}
      methodList={methodList}
      vendor={current}
      current={null}
      visible={productVisible}
      onDone={handleProductDone}
      onCancel={handleProductCancel}
      onSubmit={handleProductSubmit}
    />
  }

  return (
    <div>
      <PageHeaderWrapper>
        <div className={styles.standardList}>
          <Card
            className={styles.listCard}
            bordered={false}
            title="支付应用"
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
              onClick={showVendorModal}
              ref={addButton}
            >
              <PlusOutlined />
            </Button>

            <List
              size="large"
              rowKey="vendor_id"
              loading={loading}
              pagination={paginationProps}
              dataSource={vendorList}
              renderItem={item => (
                <List.Item
                  actions={[
                    <a
                      key="edit"
                      onClick={e => {
                        e.preventDefault();
                        showEditVendorModal(item);
                      }}
                    >
                      编辑
                    </a>,
                    <MoreButton key="more" item={item} />
                  ]}
                >
                  <List.Item.Meta
                    avatar={<Avatar src={item.vendor_logo} shape="square" size="large" />}
                    title={item.vendor_name}
                    description={item.vendor_desc}
                  />
                  <ListContent data={item} />
                </List.Item>
              )}
            />
          </Card>
        </div>
      </PageHeaderWrapper>

      {vendorOperationModal}

      {productOperationModal}

    </div>
  );
};


export default connect(({ paymentProductManagement, loading }) => ({
  paymentProductManagement,
  loading: loading.models.paymentProductManagement
}))(PaymentVendorList);