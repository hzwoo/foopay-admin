import request from 'umi-request';

// payment method

export async function listPaymentMethods(params) {
  return request('/api/admin/payment/methods', {
    params
  });
}
export async function addPaymentMethod(params) {
  const { count = 5, ...restParams } = params;
  return request('/api/admin/payment/method', {
    method: 'POST',
    params: {
      count
    },
    data: {
      ...restParams,
      method: 'add'
    }
  });
}
export async function updatePaymentMethod(params) {
  const { count = 5, ...restParams } = params;
  return request('/api/admin/payment/method', {
    method: 'POST',
    params: {
      count
    },
    data: {
      ...restParams,
      method: 'update'
    }
  });
}
export async function removePaymentMethod(params) {
  const { count = 5, ...restParams } = params;
  return request('/api/admin/payment/method', {
    method: 'POST',
    params: {
      count,
    },
    data: {
      ...restParams,
      method: 'delete'
    }
  });
}

// payment vendor

export async function listPaymentVendors(params) {
  return request('/api/admin/payment/vendors', {
    params
  });
}
export async function addPaymentVendor(params) {
  const { count = 5, ...restParams } = params;
  return request('/api/admin/payment/vendor', {
    method: 'POST',
    params: {
      count
    },
    data: {
      ...restParams,
      method: 'add'
    }
  });
}
export async function updatePaymentVendor(params) {
  const { count = 5, ...restParams } = params;
  return request('/api/admin/payment/vendor', {
    method: 'POST',
    params: {
      count
    },
    data: {
      ...restParams,
      method: 'update'
    }
  });
}
export async function removePaymentVendor(params) {
  const { count = 5, ...restParams } = params;
  return request('/api/admin/payment/vendor', {
    method: 'POST',
    params: {
      count,
    },
    data: {
      ...restParams,
      method: 'delete'
    }
  });
}

// payment product

export async function listPaymentProducts(params) {
  return request('/api/admin/payment/products', {
    params
  });
}
export async function addPaymentProduct(params) {
  const { count = 5, ...restParams } = params;
  return request('/api/admin/payment/product', {
    method: 'POST',
    params: {
      count
    },
    data: {
      ...restParams,
      method: 'add'
    }
  });
}
export async function updatePaymentProduct(params) {
  const { count = 5, ...restParams } = params;
  return request('/api/admin/payment/product', {
    method: 'POST',
    params: {
      count
    },
    data: {
      ...restParams,
      method: 'update'
    }
  });
}
export async function removePaymentProduct(params) {
  const { count = 5, ...restParams } = params;
  return request('/api/admin/payment/product', {
    method: 'POST',
    params: {
      count,
    },
    data: {
      ...restParams,
      method: 'delete'
    }
  });
}

// payment channel

export async function listPaymentChannels(params) {
  return request('/api/admin/payment/channels', {
    params
  });
}
export async function addPaymentChannel(params) {
  const { count = 5, ...restParams } = params;
  return request('/api/admin/payment/channel', {
    method: 'POST',
    params: {
      count
    },
    data: {
      ...restParams,
      method: 'add'
    }
  });
}
export async function updatePaymentChannel(params) {
  const { count = 5, ...restParams } = params;
  return request('/api/admin/payment/channel', {
    method: 'POST',
    params: {
      count
    },
    data: {
      ...restParams,
      method: 'update'
    }
  });
}
export async function removePaymentChannel(params) {
  const { count = 5, ...restParams } = params;
  return request('/api/admin/payment/channel', {
    method: 'POST',
    params: {
      count,
    },
    data: {
      ...restParams,
      method: 'delete'
    }
  });
}

// payment handlers

export async function listPaymentHandlers(params) {
  // console.log('list handlers: ', params)
  return request('/api/admin/payment/handlers', {
    params
  });
}
export async function addPaymentHandler(params) {
  const { count = 5, ...restParams } = params;
  return request('/api/admin/payment/handler', {
    method: 'POST',
    params: {
      count
    },
    data: {
      ...restParams,
      method: 'add'
    }
  });
}
export async function updatePaymentHandler(params) {
  const { count = 5, ...restParams } = params;
  return request('/api/admin/payment/handler', {
    method: 'POST',
    params: {
      count
    },
    data: {
      ...restParams,
      method: 'update'
    }
  });
}
export async function removePaymentHandler(params) {
  const { count = 5, ...restParams } = params;
  return request('/api/admin/payment/handler', {
    method: 'POST',
    params: {
      count,
    },
    data: {
      ...restParams,
      method: 'delete'
    }
  });
}

// payment rate

export async function listPaymentRates(params) {
  return request('/api/admin/payment/rates', {
    params
  });
}
export async function addPaymentRate(params) {
  const { count = 5, ...restParams } = params;
  return request('/api/admin/payment/rate', {
    method: 'POST',
    params: {
      count
    },
    data: {
      ...restParams,
      method: 'add'
    }
  });
}
export async function updatePaymentRate(params) {
  const { count = 5, ...restParams } = params;
  return request('/api/admin/payment/rate', {
    method: 'POST',
    params: {
      count
    },
    data: {
      ...restParams,
      method: 'update'
    }
  });
}
export async function removePaymentRate(params) {
  const { count = 5, ...restParams } = params;
  return request('/api/admin/payment/rate', {
    method: 'POST',
    params: {
      count,
    },
    data: {
      ...restParams,
      method: 'delete'
    }
  });
}

// payment account group

export async function listPaymentAccountGroups(params) {
  return request('/api/admin/payment/accountgroups', {
    params
  });
}
export async function addPaymentAccountGroup(params) {
  const { count = 5, ...restParams } = params;
  return request('/api/admin/payment/accountgroup', {
    method: 'POST',
    params: {
      count
    },
    data: {
      ...restParams,
      method: 'add'
    }
  });
}
export async function updatePaymentAccountGroup(params) {
  const { count = 5, ...restParams } = params;
  return request('/api/admin/payment/accountgroup', {
    method: 'POST',
    params: {
      count
    },
    data: {
      ...restParams,
      method: 'update'
    }
  });
}
export async function removePaymentAccountGroup(params) {
  const { count = 5, ...restParams } = params;
  return request('/api/admin/payment/accountgroup', {
    method: 'POST',
    params: {
      count,
    },
    data: {
      ...restParams,
      method: 'delete'
    }
  });
}

// payment account

export async function listPaymentAccounts(params) {
  return request('/api/admin/payment/accounts', {
    params
  });
}
export async function addPaymentAccount(params) {
  const { count = 5, ...restParams } = params;
  return request('/api/admin/payment/account', {
    method: 'POST',
    params: {
      count
    },
    data: {
      ...restParams,
      method: 'add'
    }
  });
}
export async function updatePaymentAccount(params) {
  const { count = 5, ...restParams } = params;
  return request('/api/admin/payment/account', {
    method: 'POST',
    params: {
      count
    },
    data: {
      ...restParams,
      method: 'update'
    }
  });
}
export async function removePaymentAccount(params) {
  const { count = 5, ...restParams } = params;
  return request('/api/admin/payment/account', {
    method: 'POST',
    params: {
      count,
    },
    data: {
      ...restParams,
      method: 'delete'
    }
  });
}