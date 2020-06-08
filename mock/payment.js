import {
  startsWith,
  endsWith,
  isArray,
  remove
} from 'lodash';
import moment from 'moment';

// eslint-disable-next-line import/no-extraneous-dependencies
const methodList = [{
  method_id: '10',
  method_name: '电脑网页支付',
  method_alias: ['WEB支付'],
  method_code: 'WEB',
  method_logo: '',
  method_desc: '电脑网页支付'
}, {
  method_id: '11',
  method_name: '手机网页支付',
  method_alias: ['H5支付', 'WAP支付'],
  method_code: 'WAP',
  method_logo: '',
  method_desc: '手机网页支付'
}, {
  method_id: '12',
  method_name: 'APP支付',
  method_alias: [],
  method_code: 'APP',
  method_logo: '',
  method_desc: 'APP支付适用于商家在App应用中集成支付宝、微信支付等移动应用支付功能'
}, {
  method_id: '13',
  method_name: '扫码支付',
  method_alias: ['Native支付'],
  method_code: 'QRCODE',
  method_logo: '',
  method_desc: '扫码支付，指用户打开手机应用中的“扫一扫”功能，扫描商家展示在某收银场景下的二维码并进行支付的模式'
}, {
  method_id: '14',
  method_name: '条码支付',
  method_alias: ['付款码支付'],
  method_code: 'SCAN',
  method_logo: '',
  method_desc: '条码支付是线下传统行业的一种收款方式。商家使用扫码枪等条码识别设备扫描用户支付宝钱包上的条码/二维码，完成收款。用户仅需出示付款码，所有收款操作由商家端完成'
}, {
  method_id: '15',
  method_name: '公众号支付',
  method_alias: [],
  method_code: 'JSAPI',
  method_logo: '',
  method_desc: '公众号支付用于在微信公众号、支付宝生活号中进行支付'
}, {
  method_id: '16',
  method_name: '小程序支付',
  method_alias: [],
  method_code: 'MAPP',
  method_logo: '',
  method_desc: '小程序支付用于微信小程序等快应用中进行支付'
}, {
  method_id: '17',
  method_name: '红包',
  method_alias: [],
  method_code: 'LUCKY',
  method_logo: '',
  method_desc: '红包支付用于微信中进行支付'
}, {
  method_id: '18',
  method_name: '消费贷',
  method_alias: [],
  method_code: 'LOAN',
  method_logo: '',
  method_desc: '消费贷用于小额消费支付'
},];

const vendorList = [{
  vendor_id: '12',
  vendor_name: '支付宝',
  vendor_code: 'ALIPAY',
  prod_code_prefix: 'ALI',
  vendor_logo: '',
  vendor_desc: '蚂蚁金服旗下第三方支付'
}, {
  vendor_id: '13',
  vendor_name: '微信支付',
  vendor_code: 'WECHATPAY',
  prod_code_prefix: 'WX',
  vendor_logo: '',
  vendor_desc: '微信支付'
}];

const productList = [{
  product_id: '1210',
  product_name: '支付宝-电脑网页支付',
  product_code: 'ALI_WEB',
  product_logo: '',
  product_desc: '电脑网页支付'
}, {
  product_id: '1211',
  product_name: '支付宝-手机网页支付',
  product_code: 'ALI_WAP',
  product_logo: '',
  product_desc: '手机网页支付'
}, {
  product_id: '1212',
  product_name: '支付宝-APP支付',
  product_code: 'ALI_APP',
  product_logo: '',
  product_desc: 'APP支付'
}, {
  product_id: '1213',
  product_name: '支付宝-扫码支付',
  product_code: 'ALI_QRCODE',
  product_logo: '',
  product_desc: '扫码支付'
}, {
  product_id: '1214',
  product_name: '支付宝-条码支付',
  product_code: 'ALI_SCAN',
  product_logo: '',
  product_desc: '条码支付'
}, {
  product_id: '1215',
  product_name: '支付宝-生活号支付',
  product_code: 'ALI_JSAPI',
  product_logo: '',
  product_desc: '生活号支付'
}, {
  product_id: '1216',
  product_name: '支付宝-小程序支付',
  product_code: 'ALI_MAPP',
  product_logo: '',
  product_desc: '小程序支付'
}, {
  product_id: '1218',
  product_name: '支付宝-花呗',
  product_code: 'ALI_LOAN',
  product_logo: '',
  product_desc: 'APP支付'
}, {
  product_id: '1312',
  product_name: '微信支付-APP支付',
  product_code: 'WX_APP',
  product_logo: '',
  product_desc: 'APP支付'
}, {
  product_id: '1313',
  product_name: '微信支付-Native支付',
  product_code: 'WX_QRCODE',
  product_logo: '',
  product_desc: 'Native支付'
}, {
  product_id: '1314',
  product_name: '微信支付-付款码支付',
  product_code: 'WX_SCAN',
  product_logo: '',
  product_desc: '付款码支付'
}, {
  product_id: '1315',
  product_name: '微信支付-公众号支付',
  product_code: 'WX_JSAPI',
  product_logo: '',
  product_desc: '公众号支付'
}, {
  product_id: '1316',
  product_name: '微信支付-小程序支付',
  product_code: 'WX_MAPP',
  product_logo: '',
  product_desc: '小程序支付'
}];

const channelList = [{
  channel_id: '2001',
  channel_name: '支付宝',
  channel_code: 'ALIPAY',
  channel_logo: '',
  channel_desc: '蚂蚁金服旗下支付品牌',
  webhook: '/webhook/alipay',
  num_of_handlers: 2
}, {
  channel_id: '2002',
  channel_name: '微信支付',
  channel_code: 'WECHATPAY',
  channel_logo: '',
  channel_desc: '腾讯旗下支付品牌',
  webhook: '/webhook/wechatpay',
  num_of_handlers: 2
}, {
  channel_id: '2003',
  channel_name: '平安银行',
  channel_code: 'PINGAN',
  channel_logo: '',
  channel_desc: '平安银行聚合支付',
  webhook: '/webhook/pingan',
  num_of_handlers: 2
}];

const handlerList = [{
  handler_id: '12132001',
  handler_name: '支付宝-扫码支付-支付宝受理',
  handler_code: 'ALI_QRCODE_ALIPAY',
  channel_id: '2001',
  channel_name: '支付宝',
  channel_code: 'ALIPAY',
  method_id: '13',
  method_code: 'QRCODE',
  method_name: '扫码支付',
  vendor_id: '12',
  vendor_name: '支付宝',
  vendor_code: 'ALIPAY',
  product_id: '1213',
  product_code: 'ALI_QRCODE',
  product_name: '支付宝-扫码支付',
  product_desc: '扫码支付',
  has_rate: false,
  rate_id: ''
}, {
  handler_id: '12142001',
  handler_name: '支付宝-条码支付-支付宝受理',
  handler_code: 'ALI_SCAN_ALIPAY',
  channel_id: '2001',
  channel_name: '支付宝',
  channel_code: 'ALIPAY',
  method_id: '14',
  method_code: 'SCAN',
  method_name: '条码支付',
  vendor_id: '12',
  vendor_name: '支付宝',
  vendor_code: 'ALIPAY',
  product_id: '1214',
  product_code: 'ALI_SCAN',
  product_name: '支付宝-条码支付',
  product_desc: '条码支付',
  has_rate: false,
  rate_id: ''
}, {
  handler_id: '13132002',
  handler_name: '微信支付-Native支付-微信受理',
  handler_code: 'WX_QRCODE_WECHATPAY',
  channel_id: '2002',
  channel_name: '微信支付',
  channel_code: 'WECHATPAY',
  method_id: '13',
  method_code: 'QRCODE',
  method_name: '扫码支付',
  vendor_id: '13',
  vendor_name: '微信支付',
  vendor_code: 'WECHATPAY',
  product_id: '1313',
  product_code: 'WX_QRCODE',
  product_name: '微信支付-Native支付',
  product_desc: 'Native支付',
  has_rate: false,
  rate_id: ''
}, {
  handler_id: '13142002',
  handler_name: '微信支付-付款码支付-微信受理',
  handler_code: 'WX_SCAN_WECHATPAY',
  channel_id: '2002',
  channel_name: '微信支付',
  channel_code: 'WECHATPAY',
  method_id: '14',
  method_code: 'SCAN',
  method_name: '条码支付',
  vendor_id: '13',
  vendor_name: '微信支付',
  vendor_code: 'WECHATPAY',
  product_id: '1314',
  product_code: 'WX_SCAN',
  product_name: '微信支付-付款码支付',
  product_desc: '付款码支付',
  has_rate: false,
  rate_id: ''
}, {
  handler_id: '13152003',
  handler_name: '微信支付-公众号支付-平安银行受理',
  handler_code: 'WX_JSAPI_PINGAN',
  channel_id: '2003',
  channel_name: '平安银行',
  channel_code: 'PINGAN',
  method_id: '15',
  method_code: 'JSAPI',
  method_name: '公众号支付',
  vendor_id: '13',
  vendor_name: '微信支付',
  vendor_code: 'WECHATPAY',
  product_id: '1315',
  product_code: 'WX_JSAPI',
  product_name: '微信支付-公众号支付',
  product_desc: '公众号支付',
  has_rate: false,
  rate_id: ''
}, {
  handler_id: '12152003',
  handler_name: '支付宝-生活号支付-平安银行受理',
  handler_code: 'ALI_JSAPI_PINGAN',
  channel_id: '2003',
  channel_name: '平安银行',
  channel_code: 'PINGAN',
  method_id: '15',
  method_code: 'JSAPI',
  method_name: '公众号支付',
  vendor_id: '12',
  vendor_name: '支付宝',
  vendor_code: 'ALIPAY',
  product_id: '1215',
  product_code: 'ALI_JSAPI',
  product_name: '支付宝-生活号支付',
  product_desc: '生活号支付',
  has_rate: false,
  rate_id: ''
}];

const rateList = [{
  rate_id: 1,
  channel_id: '2001',
  handler_id: undefined,
  rate_name: '支付宝受理-千五五',
  rate_mode: '渠道费率',
  rate_type: '费率（百分比）',
  rate: 0.55,
  min_fee: 0,
  max_fee: 0,
  min_applicable: 0,
  is_inherited: false,
  inherited_id: undefined,
  is_enabled: true
}, {
  rate_id: 2,
  channel_id: '2002',
  handler_id: undefined,
  rate_name: '微信支付受理-千六',
  rate_mode: '渠道费率',
  rate_type: '费率（百分比）',
  rate: 0.6,
  min_fee: 0,
  max_fee: 0,
  min_applicable: 0,
  is_inherited: false,
  inherited_id: undefined,
  is_enabled: true
}, {
  rate_id: 3,
  channel_id: '2003',
  handler_id: undefined,
  rate_name: '平安银行受理-千三五',
  rate_mode: '渠道费率',
  rate_type: '费率（百分比）',
  rate: 0.35,
  min_fee: 0,
  max_fee: 0,
  min_applicable: 0,
  is_inherited: false,
  inherited_id: undefined,
  is_enabled: true
}];

const groupList = [{
  group_id: 1,
  group_name: '虚拟账户组1',
  batch_no: '20200511',
  account_type: 'INCOME',
  batch_prefix: '200511',
  batch_size: 100,
  batch_start: 2005110000,
  batch_end: 2005110099,
  batch_remain: 97,
  next_account_id: 2005110003,
  num_of_linked: 0
}];

const accountList = [{
  account_id: 2005110000,
  group_id: 1,
  account_type: 'INCOME',
  account_name: '虚拟账户0',
  is_linked: false,
  linked_id: null,
  linked_name: null,
  time_created: new Date(),
  time_updated: new Date(),
  date_expire: moment().add(1, 'M').format('YYYY-MM-DD'),
  status: 'TEST',
  balance: 0,
  frozen: 0,
}, {
  account_id: 2005110001,
  group_id: 1,
  account_type: 'INCOME',
  account_name: '虚拟账户1',
  is_linked: false,
  linked_id: null,
  linked_name: null,
  time_created: new Date(),
  time_updated: new Date(),
  date_expire: moment().add(1, 'M').format('YYYY-MM-DD'),
  status: 'TEST',
  balance: 0,
  frozen: 0,
}, {
  account_id: 2005110002,
  group_id: 1,
  account_type: 'INCOME',
  account_name: '虚拟账户2',
  is_linked: false,
  linked_id: null,
  linked_name: null,
  time_created: new Date(),
  time_updated: new Date(),
  date_expire: moment().add(1, 'M').format('YYYY-MM-DD'),
  status: 'TEST',
  balance: 0,
  frozen: 0,
}];

const iddb = {
  next_method_id: 19,
  next_vendor_id: 14,
  next_channel_id: 2004
};

const methodSourceData = [];

function initMethodSourceData() {
  methodList.forEach(item => {
    methodSourceData.push(item);
  });
}

const vendorSourceData = [];

function initVendorSourceData() {
  vendorList.forEach(item => {
    vendorSourceData.push(item);
  });
}

const productSourceData = [];

function initProductSourceData() {
  productList.forEach(item => {
    productSourceData.push(item);
  });
}

const channelSourceData = [];

function initChannelSourceData() {
  channelList.forEach(item => {
    channelSourceData.push(item);
  });
}

const handlerSourceData = [];

function initHandlerSourceData() {
  handlerList.forEach(item => {
    handlerSourceData.push(item);
  });
}

const rateSourceData = [];

function initRateSourceData() {
  rateList.forEach(item => {
    rateSourceData.push(item);
  });
}

const groupSourceData = [];

function initGroupSourceData() {
  groupList.forEach(item => {
    groupSourceData.push(item);
  });
}

const accountSourceData = [];

function initAccountSourceData() {
  accountList.forEach(item => {
    accountSourceData.push(item);
  });
}

function getNextMethodId() {
  const next_method_id = iddb.next_method_id.toString();
  iddb.next_method_id += 1;
  return next_method_id;
}

function getNextVendorId() {
  const next_vendor_id = iddb.next_vendor_id.toString();
  iddb.next_vendor_id += 1;
  return next_vendor_id;
}

function getProductId(vendorId, methodId) {
  return `${vendorId}${methodId}`;
}

function getNextChannelId() {
  const next_channel_id = iddb.next_channel_id.toString();
  iddb.next_channel_id += 1;
  return next_channel_id;
}

// payment method

function listPaymentMethods(req, res) {
  // const params = req.query;
  if (isArray(methodSourceData) && methodSourceData.length === 0) {
    initMethodSourceData();
  }
  const result = methodSourceData || [];
  return res.json(result);
}

function postPaymentMethod(req, res) {
  const {
    body
  } = req;

  const { method, method_id } = body;

  let result = methodSourceData || [];

  switch (method) {
    case 'delete':
      // result = result.filter(item => item.method_id !== method_id);
      result = remove(result, item => {
        return item.method_id === method_id;
      });
      break;
    case 'update':
      result.forEach((item, i) => {
        if (item.method_id === method_id) {
          result[i] = { ...item, ...body };
        }
      });
      break;
    case 'add':
      result.unshift({
        ...body,
        method_id: getNextMethodId()
      });
      break;
    default:
      break;
  }

  return res.json(result);
}

// payment vendor

function listPaymentVendors(req, res) {
  const params = req.query;
  if (isArray(vendorSourceData) && vendorSourceData.length === 0) {
    initVendorSourceData();
  }
  let result = [];
  // console.log('list payment vendors:', params.vendor_code);
  if (params && params.vendor_code) {
    result = vendorSourceData.filter(item => item.vendor_code === params.vendor_code);
  }
  if (result.length === 0) {
    result = vendorSourceData || [];
  }
  // console.log('list payment vendors result:', result);
  return res.json(result);
}

function postPaymentVendor(req, res) {
  const {
    body
  } = req;

  const { method, vendor_id } = body;

  let result = vendorSourceData || [];

  switch (method) {
    case 'delete':
      // result = result.filter(item => item.vendor_id !== vendor_id);
      result = remove(result, item => {
        return item.vendor_id === vendor_id;
      });
      break;
    case 'update':
      result.forEach((item, i) => {
        if (item.vendor_id === vendor_id) {
          result[i] = { ...item, ...body };
        }
      });
      break;
    case 'add':
      result.unshift({
        ...body,
        vendor_id: getNextVendorId()
      })
      break;
    default:
      break;
  }

  return res.json(result);
}

// payment product

function listPaymentProducts(req, res) {
  const params = req.query;
  if (isArray(productSourceData) && productSourceData.length === 0) {
    initProductSourceData();
  }
  const result = productSourceData.filter(item => startsWith(item.product_id, params.vendor_id));
  return res.json(result);
}

function postPaymentProduct(req, res) {
  const {
    body
  } = req;

  const { method, product_id, vendor_id, method_id } = body;

  let result = productSourceData || [];

  switch (method) {
    case 'delete':
      // result = result.filter(item => item.product_id !== product_id);
      result = remove(result, item => {
        return item.product_id === product_id;
      });
      break;
    case 'update':
      result.forEach((item, i) => {
        if (item.product_id === product_id) {
          result[i] = { ...item, ...body };
        }
      });
      break;
    case 'add':
      result.unshift({
        product_id: `${vendor_id}${method_id}`,
        product_name: body.product_name,
        product_code: body.product_code,
        product_logo: body.product_logo || '',
        product_desc: body.product_desc || ''
      })
      break;
    default:
      break;
  }

  return res.json(result);
}

// payment channel

function listPaymentChannels(req, res) {
  // const params = req.query;
  if (isArray(channelSourceData) && channelSourceData.length === 0) {
    initChannelSourceData();
  }
  const result = channelSourceData;
  return res.json(result);
}

function postPaymentChannel(req, res) {
  const {
    body
  } = req;

  const { method, channel_id } = body;

  let result = channelSourceData || [];

  switch (method) {
    case 'delete':
      result = remove(result, item => {
        return item.channel_id === channel_id;
      });
      break;
    case 'update':
      result.forEach((item, i) => {
        if (item.channel_id === channel_id) {
          result[i] = { ...item, ...body };
        }
      });
      break;
    case 'add':
      result.unshift({
        ...body,
        channel_id: getNextChannelId()
      })
      break;
    default:
      break;
  }

  return res.json(result);
}

// payment handler

function listPaymentHandlers(req, res) {
  const params = req.query;
  if (isArray(handlerSourceData) && handlerSourceData.length === 0) {
    initHandlerSourceData();
  }
  let result = handlerSourceData || [];

  if (params.channel_id) {
    result = result.filter(item => item.channel_id === params.channel_id);
  }

  if (params.vendor_id) {
    result = result.filter(item => item.vendor_id === params.vendor_id);
  }

  if (params.method_id) {
    result = result.filter(item => item.method_id === params.method_id);
  }
  // console.log('list handler result:', result);
  return res.json(result);
}

function postPaymentHandler(req, res) {
  const {
    body
  } = req;

  const { method, handler_id, product_id, channel_id } = body;

  let result = handlerSourceData || [];

  switch (method) {
    case 'delete':
      // result = result.filter(item => item.product_id !== product_id);
      result = remove(result, item => {
        return item.handler_id === handler_id;
      });
      break;
    case 'update':
      result.forEach((item, i) => {
        if (item.handler_id === handler_id) {
          result[i] = { ...item, ...body };
        }
      });
      break;
    case 'add':
      result.unshift({
        ...body,
        handler_id: `${product_id}${channel_id}`,
      })
      break;
    default:
      break;
  }

  return res.json(result);
}

// payment rate

function listPaymentRates(req, res) {
  const params = req.query;
  if (isArray(rateSourceData) && rateSourceData.length === 0) {
    initRateSourceData();
  }
  // console.log('list rates:', params);
  let result = rateSourceData || [];
  if (params.channel_id) {
    if (params.handler_id) {
      result = rateSourceData.filter(item =>
        item.channel_id === params.channel_id &&
        item.handler_id === params.handler_id
      );
    } else {
      result = rateSourceData.filter(item =>
        item.channel_id === params.channel_id
      );
    }
  }

  return res.json(result);
}

function postPaymentRate(req, res) {
  const {
    body
  } = req;

  const { method, rate_id, channel_id, handler_id } = body;

  let result = rateSourceData || [];

  switch (method) {
    case 'delete':
      // result = result.filter(item => item.product_id !== product_id);
      result = remove(result, item => {
        return item.rate_id === rate_id;
      });
      break;
    case 'update':
      result.forEach((item, i) => {
        if (item.rate_id === rate_id) {
          result[i] = { ...item, ...body };
        }
      });
      break;
    case 'add':
      result.unshift({
        ...body,
        rate_id: `${result.length}`,
      })
      break;
    default:
      break;
  }

  return res.json(result);
}

// payment account group

function listPaymentAccountGroups(req, res) {
  const params = req.query;
  if (isArray(groupSourceData) && groupSourceData.length === 0) {
    initGroupSourceData();
  }

  let result = groupSourceData || [];
  if (params.group_id) {
    result = rateSourceData.filter(item =>
      item.group_id === params.group_id
    );
  }

  return res.json(result);
}

function postPaymentAccountGroup(req, res) {
  const {
    body
  } = req;

  const { method, group_id } = body;

  let result = groupSourceData || [];

  switch (method) {
    case 'delete':
      // result = result.filter(item => item.product_id !== product_id);
      result = remove(result, item => {
        return item.group_id === group_id;
      });
      break;
    case 'update':
      result.forEach((item, i) => {
        if (item.group_id === group_id) {
          result[i] = { ...item, ...body };
        }
      });
      break;
    case 'add':
      result.unshift({
        ...body,
        group_id: `${result.length}`,
      })
      break;
    default:
      break;
  }

  return res.json(result);
}

// payment account

function listPaymentAccounts(req, res) {
  const params = req.query;
  const { current = 1, pageSize = 10, group_id } = params;

  if (isArray(accountSourceData) && accountSourceData.length === 0) {
    initAccountSourceData();
  }

  // console.log('group id', group_id);

  let dataSource = accountSourceData || [];
  if (params.group_id) {
    dataSource = [...accountSourceData]
      .slice((current - 1) * pageSize, current * pageSize)
      .filter(item =>
        item.group_id !== group_id
      );
  }



  const result = {
    data: dataSource,
    total: accountSourceData.length,
    success: true,
    pageSize,
    current: parseInt(`${params.currentPage}`, 10) || 1,
  };
  return res.json(result);
}

function postPaymentAccount(req, res) {
  const {
    body
  } = req;

  const { method, account_id } = body;

  let result = accountSourceData || [];

  switch (method) {
    case 'delete':
      // result = result.filter(item => item.product_id !== product_id);
      result = remove(result, item => {
        return item.account_id === account_id;
      });
      break;
    case 'update':
      result.forEach((item, i) => {
        if (item.account_id === account_id) {
          result[i] = { ...item, ...body };
        }
      });
      break;
    case 'add':
      result.unshift({
        ...body,
        account_id: `${account_id}`,
      })
      break;
    default:
      break;
  }

  return res.json(result);
}

export default {
  'GET /admin/payment/methods': listPaymentMethods,
  'POST /admin/payment/method': postPaymentMethod,
  'GET /admin/payment/vendors': listPaymentVendors,
  'POST /admin/payment/vendor': postPaymentVendor,
  'GET /admin/payment/products': listPaymentProducts,
  'POST /admin/payment/product': postPaymentProduct,
  'GET /admin/payment/channels': listPaymentChannels,
  'POST /admin/payment/channel': postPaymentChannel,
  'GET /admin/payment/handlers': listPaymentHandlers,
  'POST /admin/payment/handler': postPaymentHandler,
  'GET /admin/payment/rates': listPaymentRates,
  'POST /admin/payment/rate': postPaymentRate,
  'GET /admin/payment/accountgroups': listPaymentAccountGroups,
  'POST /admin/payment/accountgroup': postPaymentAccountGroup,
  'GET /admin/payment/accounts': listPaymentAccounts,
  'POST /admin/payment/account': postPaymentAccount,
};