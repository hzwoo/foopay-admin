import {
  listPaymentVendors,
  listPaymentProducts,
  listPaymentChannels,
  addPaymentChannel,
  removePaymentChannel,
  updatePaymentChannel,
  listPaymentHandlers,
  addPaymentHandler,
  removePaymentHandler,
  updatePaymentHandler,
  listPaymentRates,
  addPaymentRate,
  removePaymentRate,
  updatePaymentRate
} from '@/pages/payment/service';

const Model = {
  namespace: 'paymentChannelManagement',
  state: {
    currentChannel: null,
    currentHandler: null,
    vendorList: [],
    productList: [],
    channelList: [],
    handlerList: [],
    rateList: []
  },
  effects: {
    *fetchVendors({ payload }, { call, put }) {
      const response = yield call(listPaymentVendors, payload);
      yield put({
        type: 'queryVendorList',
        payload: {
          vendorList: Array.isArray(response) ? response : []
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

    *fetchChannels({ payload }, { call, put }) {
      const response = yield call(listPaymentChannels, payload);
      yield put({
        type: 'queryChannelList',
        payload: {
          channelList: Array.isArray(response) ? response : []
        }
      });
    },

    *appendFetchChannels({ payload }, { call, put }) {
      const response = yield call(listPaymentChannels, payload);
      yield put({
        type: 'appendChannelList',
        payload: {
          channelList: Array.isArray(response) ? response : []
        }
      });
    },

    *submitChannel({ payload }, { call, put }) {
      let callback;

      if (payload.channel_id) {
        callback = Object.keys(payload).length === 1 ? removePaymentChannel : updatePaymentChannel
      } else {
        callback = addPaymentChannel;
      }

      const response = yield call(callback, payload); // post

      yield put({
        type: 'queryChannelList',
        payload: {
          channelList: response
        }
      });
    },

    *fetchHandlers({ payload }, { call, put }) {
      const response = yield call(listPaymentHandlers, payload);
      // console.log('fetch handler response:', response);
      yield put({
        type: 'queryHandlerList',
        payload: {
          channelId: payload.channel_id,
          handlerList: Array.isArray(response) ? response : []
        }
      });
    },

    *appendFetchHandlers({ payload }, { call, put }) {
      const response = yield call(listPaymentHandlers, payload);
      yield put({
        type: 'appendHandlerList',
        payload: {
          channelId: payload.channel_id,
          handlerList: Array.isArray(response) ? response : []
        }
      });
    },

    *submitHandler({ payload }, { call, put }) {
      let callback;

      if (payload.handler_id) {
        callback = Object.keys(payload).length === 1 ? removePaymentHandler : updatePaymentHandler
      } else {
        callback = addPaymentHandler;
      }

      const response = yield call(callback, payload); // post

      yield put({
        type: 'queryHandlerList',
        payload: {
          channelId: payload.channel_id,
          handlerList: response
        }
      });
    },

    *fetchRates({ payload }, { call, put }) {
      const response = yield call(listPaymentRates, payload);
      // console.log('fetch products response:', response);
      yield put({
        type: 'queryRateList',
        payload: {
          channelId: payload.channel_id,
          rateList: Array.isArray(response) ? response : []
        }
      });
    },

    *appendFetchRates({ payload }, { call, put }) {
      const response = yield call(listPaymentRates, payload);
      yield put({
        type: 'appendRateList',
        payload: {
          channelId: payload.channel_id,
          rateList: Array.isArray(response) ? response : []
        }
      });
    },

    *submitRate({ payload }, { call, put }) {
      let callback;

      if (payload.rate_id) {
        callback = Object.keys(payload).length === 1 ? removePaymentRate : updatePaymentRate
      } else {
        callback = addPaymentRate;
      }

      const response = yield call(callback, payload); // post

      yield put({
        type: 'queryRateList',
        payload: {
          channelId: payload.channel_id,
          rateList: response
        }
      });
    },
  },
  reducers: {
    setChannel(state, action) {
      return {
        ...state,
        currentChannel: action.payload.channel,
        handlerList: []
      };
    },

    resetProductList(state, action) {
      return {
        ...state,
        productList: []
      }
    },

    queryVendorList(state, action) {
      return {
        ...state,
        vendorList: action.payload.vendorList
      };
    },

    queryProductList(state, action) {
      return {
        ...state,
        productList: action.payload.productList
      };
    },

    queryChannelList(state, action) {
      return {
        ...state,
        channelList: action.payload.channelList
      };
    },

    appendChannelList(
      state = {
        channelList: [],
      },
      action,
    ) {
      return {
        ...state,
        channelList: state.channelList.concat(action.payload.channelList)
      };
    },

    queryHandlerList(state, action) {
      return {
        ...state,
        handlerList: action.payload.handlerList
      };
    },

    appendHandlerList(
      state = {
        handlerList: [],
      },
      action,
    ) {
      return {
        ...state,
        handlerList: state.handlerList.concat(action.payload.handlerList)
      };
    },

    queryRateList(state, action) {
      return {
        ...state,
        rateList: action.payload.rateList
      };
    },

    appendRateList(
      state = {
        rateList: [],
      },
      action,
    ) {
      return {
        ...state,
        rateList: state.rateList.concat(action.payload.rateList)
      };
    },
  }
};

export default Model;