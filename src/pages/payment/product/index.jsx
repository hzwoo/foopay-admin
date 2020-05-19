import React, {
  useEffect
} from 'react';
import {
  connect
} from 'umi';
import VendorList from './components/PaymentVendorList';
import ProductList from './components/PaymentProductList';

export const PaymentProductManagement = props => {
  const {
    dispatch,
    paymentProductManagement: {
      currentVendor,
      methodList,
      vendorList,
    }
  } = props;
  useEffect(() => {
    dispatch({
      type: 'paymentProductManagement/fetchMethods',
      payload: {}
    });
  }, [1]);
  useEffect(() => {
    dispatch({
      type: 'paymentProductManagement/fetchVendors',
      payload: {}
    });
  }, [1]);

  let list;

  if (currentVendor) {
    list = <ProductList
      methodList={methodList}
    />;
  } else {
    list = <VendorList
      methodList={methodList}
      vendorList={vendorList}
    />;
  }

  return (
    <div>
      {list}
    </div>
  );
};

export default connect(({ paymentProductManagement, loading }) => ({
  paymentProductManagement,
  loading: loading.models.paymentProductManagement
}))(PaymentProductManagement);