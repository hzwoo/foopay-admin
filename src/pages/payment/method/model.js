import {
  listPaymentMethods,
  addPaymentMethod,
  removePaymentMethod,
  updatePaymentMethod
} from '@/pages/payment/service';

const Model = {
  namespace: 'paymentMethodManagement',
  state: {
    list: [],
  },
  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(listPaymentMethods, payload);
      yield put({
        type: 'queryList',
        payload: Array.isArray(response) ? response : []
      });
    },

    *appendFetch({ payload }, { call, put }) {
      const response = yield call(listPaymentMethods, payload);
      yield put({
        type: 'appendList',
        payload: Array.isArray(response) ? response : []
      });
    },

    *submit({ payload }, { call, put }) {
      let callback;

      if (payload.method_id) {
        callback = Object.keys(payload).length === 1 ? removePaymentMethod : updatePaymentMethod;
      } else {
        callback = addPaymentMethod;
      }

      const response = yield call(callback, payload); // post

      yield put({
        type: 'queryList',
        payload: response
      });
    }
  },
  reducers: {
    queryList(state, action) {
      return { ...state, list: action.payload };
    },

    appendList(
      state = {
        list: [],
      },
      action,
    ) {
      return { ...state, list: state.list.concat(action.payload) }
    }
  }
};
export default Model;