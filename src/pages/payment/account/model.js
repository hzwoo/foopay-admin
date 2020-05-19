import {
  listPaymentVendors,
  listPaymentMethods,
  listPaymentChannels,
  listPaymentHandlers,
  listPaymentRates,
  listPaymentAccountGroups,
  addPaymentAccountGroup,
  updatePaymentAccountGroup,
  removePaymentAccountGroup,
  listPaymentAccounts,
  addPaymentAccount,
  updatePaymentAccount,
  removePaymentAccount,
  addPaymentRate
} from '@/pages/payment/service';

const Model = {
  namespace: 'paymentAccountManagement',
  state: {
    currentGroup: null,
    currentAccount: null,
    groupList: [],
    accountList: [],
    vendorList: [],
    methodList: [],
    channelList: [],
    handlerList: [],
    rateList: []
  },
  effects: {
    *fetchVendors({ payload }, { call, put }) {
      const response = yield call(listPaymentVendors, payload);
      // console.log('fetch handler response:', response);
      yield put({
        type: 'queryVendorList',
        payload: {
          vendorList: Array.isArray(response) ? response : []
        }
      });
    },

    *fetchMethods({ payload }, { call, put }) {
      const response = yield call(listPaymentMethods, payload);
      // console.log('fetch handler response:', response);
      yield put({
        type: 'queryMethodList',
        payload: {
          // vendorId: payload.vendor_id,
          methodList: Array.isArray(response) ? response : []
        }
      });
    },

    *fetchChannels({ payload }, { call, put }) {
      const response = yield call(listPaymentChannels, payload);
      // console.log('fetch handler response:', response);
      yield put({
        type: 'queryChannelList',
        payload: {
          channelList: Array.isArray(response) ? response : []
        }
      });
    },

    *fetchHandlers({ payload }, { call, put }) {
      const response = yield call(listPaymentHandlers, payload);
      // console.log('fetch handler response:', response);
      yield put({
        type: 'queryHandlerList',
        payload: {
          // channelId: payload.channel_id,
          handlerList: Array.isArray(response) ? response : []
        }
      });
    },


    *fetchRates({ payload }, { call, put }) {
      const response = yield call(listPaymentRates, payload);
      // console.log('fetch rates response:', response);
      yield put({
        type: 'queryRateList',
        payload: {
          // channelId: payload.channel_id,
          rateList: Array.isArray(response) ? response : []
        }
      });
    },

    *fetchGroups({ payload }, { call, put }) {
      const response = yield call(listPaymentAccountGroups, payload);
      // console.log('fetch products response:', response);
      yield put({
        type: 'queryGroupList',
        payload: {
          groupList: Array.isArray(response) ? response : []
        }
      });
    },

    *appendFetchGroups({ payload }, { call, put }) {
      const response = yield call(listPaymentAccountGroups, payload);
      yield put({
        type: 'appendGroupList',
        payload: {
          groupList: Array.isArray(response) ? response : []
        }
      });
    },

    *submitGroup({ payload }, { call, put }) {
      let callback;

      if (payload.rate_id) {
        callback = Object.keys(payload).length === 1 ? removePaymentAccountGroup : updatePaymentAccountGroup
      } else {
        callback = addPaymentAccountGroup;
      }

      const response = yield call(callback, payload); // post

      yield put({
        type: 'queryGroupList',
        payload: {
          groupList: response
        }
      });
    },

    *fetchAccounts({ payload }, { call, put }) {
      const response = yield call(listPaymentAccounts, payload);
      // console.log('fetch products response:', response);
      yield put({
        type: 'queryAccountList',
        payload: {
          accountList: Array.isArray(response) ? response : []
        }
      });
    },

    *appendFetchAccounts({ payload }, { call, put }) {
      const response = yield call(listPaymentAccounts, payload);
      yield put({
        type: 'appendAccountList',
        payload: {
          accountList: Array.isArray(response) ? response : []
        }
      });
    },

    *submitAccount({ payload }, { call, put }) {
      let callback;

      if (payload.rate_id) {
        callback = Object.keys(payload).length === 1 ? removePaymentAccount : updatePaymentAccount
      } else {
        callback = addPaymentAccount;
      }

      const response = yield call(callback, payload); // post

      yield put({
        type: 'queryAccountList',
        payload: {
          accountList: response
        }
      });
    },

    *submitRate({ payload }, { call, put }) {
      const callback = addPaymentRate;

      const response = yield call(callback, payload); // post

      yield put({
        type: 'queryRateList',
        payload: {
          rateList: response
        }
      });
    },
  },
  reducers: {
    setGroup(state, action) {
      return {
        ...state,
        currentGroup: action.payload.group,
        accountList: []
      };
    },

    setAccount(state, action) {
      return {
        ...state,
        currentAccount: action.payload.account,
        // accountList: []
      };
    },


    queryVendorList(state, action) {
      return {
        ...state,
        vendorList: action.payload.vendorList
      };
    },

    queryMethodList(state, action) {
      return {
        ...state,
        methodList: action.payload.methodList
      };
    },

    queryChannelList(state, action) {
      return {
        ...state,
        channelList: action.payload.channelList
      };
    },

    queryHandlerList(state, action) {
      return {
        ...state,
        handlerList: action.payload.handlerList
      };
    },

    queryRateList(state, action) {
      return {
        ...state,
        rateList: action.payload.rateList
      };
    },

    queryGroupList(state, action) {
      return {
        ...state,
        groupList: action.payload.groupList
      };
    },


    appendGroupList(
      state = {
        groupList: [],
      },
      action,
    ) {
      return {
        ...state,
        groupList: state.groupList.concat(action.payload.groupList)
      };
    },

    queryAccountList(state, action) {
      return {
        ...state,
        accountList: action.payload.accountList
      };
    },

    appendAccountList(
      state = {
        accountList: [],
      },
      action,
    ) {
      return {
        ...state,
        accountList: state.accountList.concat(action.payload.accountList)
      };
    },
  }
};

export default Model;