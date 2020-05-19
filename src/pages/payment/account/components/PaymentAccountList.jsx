import React, {
  useRef,
  useState,
  // useEffect
} from 'react';
import {
  DownOutlined,
  // PlusOutlined
} from '@ant-design/icons';
import {
  // Avatar,
  Button,
  // Col,
  // Drawer,
  // Divider,
  Dropdown,
  // Input,
  // List,
  Menu,
  // message,
  // Modal,
  // Radio,
  // Row
} from 'antd';
// import { findDOMNode } from 'react-dom';
import {
  PageHeaderWrapper
} from '@ant-design/pro-layout';
import ProTable, {
  TableDropdown
} from '@ant-design/pro-table';
import {
  connect
} from 'umi';
import {
  listPaymentAccounts,
  addPaymentAccount,
  updatePaymentAccount,
  removePaymentAccount
} from '@/pages/payment/service';
// import GroupOperationModal from './PaymentAccountGroupOperationModal';
// import AccountOperationModal from './PaymentAccountOperationModal';
import AccountConfigDrawer from './PaymentAccountConfigDrawer';
// import AccountHandlerOperationModal from './PaymentAccountHandlerOperationModal';
import styles from '../style.less';

const PaymentAccountList = (props) => {
  const {
    // loading,
    dispatch,
    paymentAccountManagement: {
      currentGroup,
      // accountList,
    }
  } = props;
  const [sorter, setSorter] = useState('');
  const [current, setCurrent] = useState(null);
  const [configVisible, setConfigVisible] = useState(false);
  const actionRef = useRef();

  const showAccountHandlerOperation = (currentItem) => {
    // console.log('show account, accountId:', currentItem);
    // setAccountHandlerVisible(true);
    setCurrent(currentItem);
    dispatch({
      type: 'paymentAccountManagement/setAccount',
      payload: {
        account: currentItem
      }
    });
  };

  const showAccountConfigDrawer = (currentItem) => {
    setCurrent(currentItem);
    setConfigVisible(true);
    // setCurrent(handler);
  };

  const handleConfigClose = () => {
    // setAddButtonBlur();
    setConfigVisible(false);
  };

  const moreAction = (key, item) => {
    // console.log('key:', key);
    // console.log('item:', item);
    if (key === 'showConfig') {
      showAccountConfigDrawer(item);
    } else if (key === 'addHandler') {
      showAccountHandlerOperation(item);
    } else if (key === 'editAccount') {
      // TODO
    }
  };

  const columns = [
    {
      title: '账户号',
      dataIndex: 'account_id',
      hideInForm: true,
    },
    {
      title: '账户名',
      dataIndex: 'account_name',
    },
    {
      title: '账户类型',
      dataIndex: 'account_type',
      valueEnum: {
        'INCOME': {
          text: '收款账户',
        },
        'DEPOSIT': {
          text: '预存账户'
        }
      }
    },
    {
      title: '状态',
      dataIndex: 'status',
      hideInForm: true,
      valueEnum: {
        'DISABLED': {
          text: '未启用',
          status: 'Default'
        },
        'TEST': {
          text: '测试中',
          status: 'Processing'
        },
        'LIVE': {
          text: '已上线',
          status: 'Success'
        },
        'BLOCKED': {
          text: '禁用',
          status: 'Error'
        }
      }
    },
    {
      title: '有效截止日期',
      dataIndex: 'date_expire',
      hideInForm: true
    },
    {
      title: '账户余额',
      dataIndex: 'balance',
      hideInForm: true
    },
    {
      title: '冻结金额',
      dataIndex: 'frozen',
      hideInForm: true
    },
    {
      title: '已绑定',
      dataIndex: 'is_linked',
      hideInForm: true,
    },
    {
      title: '绑定类型',
      dataIndex: 'linked_type',
      hideInForm: true,
      valueEnum: {
        0: {
          text: '商户',
          linked_type: 'MERCHANT'
        },
        1: {
          text: '个人',
          linked_type: 'INDIVIDUAL'
        }
      }
    },
    {
      title: '绑定ID',
      dataIndex: 'linked_id',
      hideInForm: true,
    },
    {
      title: '绑定名称',
      dataIndex: 'linked_name',
      hideInForm: true,
    },
    {
      title: '操作',
      valueType: 'option',
      render: (text, row, _, action) => [
        <a
          href={row.html_url}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => { }}
        >
          查看收款码
        </a>,
        <a
          href={row.html_url}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => { }}
        >
          查询交易
      </a>,
        <TableDropdown
          // onSelect={() => action.reload()}
          onSelect={(key) => moreAction(key, row)}
          menus={[
            {
              key: 'showConfig',
              name: '查看支付配置'
            },
            {
              key: 'addHandler',
              name: '添加支付受理'
            },
            {
              key: 'editAccount',
              name: '修改账户信息'
            },
          ]}
        />
      ]
    }
  ];


  const backToGroup = () => {
    dispatch({
      type: 'paymentAccountManagement/setGroup',
      payload: {
        group: null
      }
    });
  }

  const accountConfigDrawer = (
    <AccountConfigDrawer
      account={current}
      visible={configVisible}
      onClose={handleConfigClose}
    />
  );

  return (
    <div>
      <PageHeaderWrapper>
        <ProTable
          headerTitle="虚拟账户列表"
          actionRef={actionRef}
          rowKey="key"
          onChange={(_, _filter, _sorter) => {
            const sorterResult = _sorter;

            if (sorterResult.field) {
              setSorter(`${sorterResult.field}_${sorterResult.order}`);
            }
          }}
          params={{
            sorter,
            group_id: currentGroup.group_id
          }}
          toolBarRender={(action, { selectedRows }) => [
            <Button type="primary" onClick={backToGroup}>
              返回虚拟账户组
          </Button>,
            selectedRows && selectedRows.length > 0 && (
              <Dropdown
                overlay={
                  <Menu
                    onClick={() => { }}
                    selectedKeys={[]}
                  >
                    <Menu.Item key="batchAddHandler">批量添加支付受理</Menu.Item>
                    <Menu.Item key="batchEditConfig">批量配置支付参数</Menu.Item>
                  </Menu>
                }
              >
                <Button>
                  批量操作 <DownOutlined />
                </Button>
              </Dropdown>
            )
          ]}
          request={(params) => listPaymentAccounts(params)}
          columns={columns}
          rowSelection={{}}
        />
      </PageHeaderWrapper>

      {accountConfigDrawer}
    </div>
  );
};

export default connect(({ paymentAccountManagement, loading }) => ({
  paymentAccountManagement,
  loading: loading.models.paymentAccountManagement
}))(PaymentAccountList);