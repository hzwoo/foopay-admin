import {
  listPaymentMethods,
  listPaymentVendors,
  addPaymentVendor,
  removePaymentVendor,
  updatePaymentVendor,
  listPaymentProducts,
  addPaymentProduct,
  removePaymentProduct,
  updatePaymentProduct
} from '@/pages/payment/service';

const Model = {
  namespace: 'paymentProductManagement',
  state: {
    currentVendor: null,
    methodList: [],
    vendorList: [],
    productList: []
  },
  effects: {
    *fetchMethods({ payload }, { call, put }) {
      const response = yield call(listPaymentMethods, payload);
      // console.log('fetch methods:', response);
      yield put({
        type: 'queryMethodList',
        payload: {
          methodList: Array.isArray(response) ? response : []
        }
      });
    },

    *fetchVendors({ payload }, { call, put }) {
      const response = yield call(listPaymentVendors, payload);
      yield put({
        type: 'queryVendorList',
        payload: {
          vendorList: Array.isArray(response) ? response : []
        }
      });
    },

    *appendFetchVendors({ payload }, { call, put }) {
      const response = yield call(listPaymentVendors, payload);
      yield put({
        type: 'appendVendorList',
        payload: {
          vendorList: Array.isArray(response) ? response : []
        }
      });
    },

    *submitVendor({ payload }, { call, put }) {
      let callback;

      if (payload.vendor_id) {
        callback = Object.keys(payload).length === 1 ? removePaymentVendor : updatePaymentVendor
      } else {
        callback = addPaymentVendor;
      }

      const response = yield call(callback, payload); // post

      yield put({
        type: 'queryVendorList',
        payload: {
          vendorList: response
        }
      });
    },

    *fetchProducts({ payload }, { call, put }) {
      const response = yield call(listPaymentProducts, payload);
      // console.log('fetch products response:', response);
      yield put({
        type: 'queryProductList',
        payload: {
          vendorId: payload.vendor_id,
          productList: Array.isArray(response) ? response : []
        }
      });
    },

    *appendFetchProducts({ payload }, { call, put }) {
      const response = yield call(listPaymentProducts, payload);
      yield put({
        type: 'appendProductList',
        payload: {
          vendorId: payload.vendor_id,
          productList: Array.isArray(response) ? response : []
        }
      });
    },

    *submitProduct({ payload }, { call, put }) {
      let callback;

      if (payload.product_id) {
        callback = Object.keys(payload).length === 1 ? removePaymentProduct : updatePaymentProduct
      } else {
        callback = addPaymentProduct;
      }

      const response = yield call(callback, payload); // post

      yield put({
        type: 'queryProductList',
        payload: {
          vendorId: payload.vendor_id,
          productList: response
        }
      });
    },
  },
  reducers: {
    setVendor(state, action) {
      // console.log('set vendor:', state, action.payload);
      return {
        ...state,
        currentVendor: action.payload.vendor,
        productList: []
      };
    },

    queryMethodList(state, action) {
      // console.log('query method list state:', state);
      // console.log('query method list action:', action);
      return {
        ...state,
        methodList: action.payload.methodList
      };
    },

    queryVendorList(state, action) {
      // console.log('query vendor list state:', state);
      // console.log('query vendor list action:', action);
      return {
        ...state,
        vendorList: action.payload.vendorList
      };
    },

    appendVendorList(
      state = {
        vendorList: [],
      },
      action,
    ) {
      return {
        ...state,
        vendorList: state.vendorList.concat(action.payload.vendorList)
      };
    },

    queryProductList(state, action) {
      return {
        ...state,
        productList: action.payload.productList
      };
    },

    appendProductList(
      state = {
        productList: [],
      },
      action,
    ) {
      return {
        ...state,
        productList: state.productList.concat(action.payload.productList)
      };
    },
  }
};

export default Model;