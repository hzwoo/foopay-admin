import React, {
  useEffect,
  useState
} from 'react';
import {
  Avatar,
  Card,
  Checkbox,
  Modal,
  Result,
  Button,
  Form,
  List,
  Input,
  // InputNumber,
  Select,
  Steps,
  Transfer
} from 'antd';
import {
  PageHeaderWrapper
} from '@ant-design/pro-layout';
import {
  connect
} from 'umi';
import {
  map,
  includes,
  indexOf,
  union,
  remove
} from 'lodash';
import AccountRateModal from './PaymentAccountRateModal';

import styles from '../style.less';
// import { LeftCircleFilled } from '@ant-design/icons';

const { Option } = Select;
const { Step } = Steps;
const formLayout = {
  labelCol: {
    span: 7
  },
  wrapperCol: {
    span: 13
  }
};

const ListContent = ({ data: { is_rate_set, is_param_set } }) => (
  <div className={styles.listContent}>
    <div className={styles.listContentItem}>
      <span>受理费率</span>
      <p>{is_rate_set ? '已设置' : '未设置'}</p>
    </div>
    <div className={styles.listContentItem}>
      <span>受理参数</span>
      <p>{is_param_set ? '已设置' : '未设置'}</p>
    </div>
  </div>
);

export const PaymentAccountHandlerOperation = props => {
  const {
    // done,
    // visible,
    // values,
    // onDone,
    onCancel,
    onSubmit,
    // loading,
    dispatch,
    paymentAccountManagement: {
      // currentAccount,
      vendorList,
      // methodList,
      channelList,
      handlerList,
      rateList
    }
  } = props;
  const [formValues, setFormValues] = useState({
    config_type: 'MERCHANT',
    account_id: null,
    handler_id: null,
    handler_name: null,
    handler_code: null,
    channel_code: null,
    product_code: null,
    has_inherited_rate: false,
    inherited_rate_id: null,
    has_handling_rate: false,
    handling_rate_id: null
  });
  const [currentStep, setCurrentStep] = useState(0);
  const [filteredChannel, setFilteredChannel] = useState(null);
  const [filteredVendor, setFilteredVendor] = useState(null);
  const [sourceData, setSourceData] = useState([]);
  const [targetKeys, setTargetKeys] = useState([]);
  const [selectedKeys, setSelectedKeys] = useState([]);
  const [selectedHandlers, setSelectedHandlers] = useState([]);
  const [checkedHandlers, setCheckedHandlers] = useState([]);
  const [checkAllIndeterminate, setCheckAllIndeterminate] = useState(false);
  const [checkAll, setCheckAll] = useState(false);
  const [batchDisabled, setBatchDisabled] = useState(true);
  const [accountRateDone, setAccountRateDone] = useState(false);
  const [accountRateVisible, setAccountRateVisible] = useState(false);


  const [form] = Form.useForm();

  useEffect(() => {
    dispatch({
      type: 'paymentAccountManagement/fetchChannels',
      payload: {}
    });
  }, [1]);
  useEffect(() => {
    dispatch({
      type: 'paymentAccountManagement/fetchVendors',
      payload: {}
    });
  }, [1]);
  useEffect(() => {
    dispatch({
      type: 'paymentAccountManagement/fetchHandlers',
      payload: {}
    });
  }, [1]);
  // useEffect(() => {
  //   dispatch({
  //     type: 'paymentAccountManagement/fetchRates',
  //     payload: {}
  //   });
  // }, [1]);
  useEffect(() => {
    const data = [];
    for (let i = 0; i < handlerList.length; i += 1) {
      data.push({
        key: handlerList[i].handler_code,
        title: handlerList[i].handler_name,
        // description: handlerList[i].handler_name,
        // disabled: false
      });
    }
    setSourceData(data);
  }, [handlerList]);

  const forward = () => {
    setCurrentStep(currentStep + 1);
  };

  const backward = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleNext = async () => {
    const fieldsValue = await form.validateFields();
    setFormValues({ ...formValues, ...fieldsValue });

    if (currentStep < 2) {
      forward();
    } else {
      onSubmit(formValues);
    }
  };

  const handleCancel = () => {
    dispatch({
      type: 'paymentAccountManagement/setAccount',
      payload: {
        account: null
      }
    });
  };

  const handleChannelChange = selected => {
    const payload = {};
    if (selected !== null && channelList && channelList[selected]) {
      setFilteredChannel(channelList[selected]);
      payload.channel_id = channelList[selected].channel_id;
    } else {
      setFilteredChannel(null);
    }

    if (filteredVendor) {
      payload.vendor_id = filteredVendor.vendor_id;
    }
    dispatch({
      type: 'paymentAccountManagement/fetchHandlers',
      payload
    });
  };

  const handleVendorChange = selected => {
    const payload = {};
    if (vendorList && vendorList[selected]) {
      setFilteredVendor(vendorList[selected]);
      payload.vendor_id = vendorList[selected].vendor_id;
    } else {
      setFilteredVendor(null);
    }

    if (filteredChannel) {
      payload.channel_id = filteredChannel.channel_id;
    }
    dispatch({
      type: 'paymentAccountManagement/fetchHandlers',
      payload
    });
  };

  const channelOptions = [];
  channelOptions.push(
    <Option
      value={null}
    >
      全部
  </Option>
  );
  if (channelList) {
    for (let i = 0; i < channelList.length; i += 1) {
      channelOptions.push(
        <Option
          key={channelList[i].channel_code}
          value={i}
        >
          {channelList[i].channel_name}
        </Option>
      );
    }
  }

  const vendorOptions = [];
  vendorOptions.push(
    <Option
      value={null}
    >
      全部
  </Option>
  );
  if (vendorList) {
    for (let i = 0; i < vendorList.length; i += 1) {
      vendorOptions.push(
        <Option
          key={vendorList[i].vendor_code}
          value={i}
        >
          {vendorList[i].vendor_name}
        </Option>
      );
    }
  }

  const paginationProps = {
    showSizeChanger: true,
    showQuickJumper: true,
    pageSize: 10,
    total: handlerList.length
  };

  const handleTransferChange = (nextTargetKeys, direction, moveKeys) => {
    setTargetKeys(nextTargetKeys);
  };

  const handleTransferSelectChange = (sourceSelectedKeys, targetSelectedKeys) => {
    setSelectedKeys([
      ...sourceSelectedKeys,
      ...targetSelectedKeys
    ]);
    // console.log('selected keys:', selectedKeys);

    setSelectedHandlers(
      handlerList.filter(
        item => includes(selectedKeys, item.handler_code)
      )
    );
  };

  const handleTransferScroll = (direction, e) => {

  };

  const handleCheckboxAllChange = (e) => {
    setCheckAll(e.target.checked);
    setCheckAllIndeterminate(false);
    if (e.target.checked) {
      setCheckedHandlers(
        map(selectedHandlers, 'handler_id')
      );
      setBatchDisabled(false);
    } else {
      setCheckedHandlers([]);
      setBatchDisabled(true);
    }
  };

  const handleCheckboxChange = (checkedValues) => {
    setCheckAll(checkedValues.length === selectedHandlers.length);
    setCheckAllIndeterminate(!!checkedValues.length && checkedValues.length < selectedHandlers.length);
    setCheckedHandlers(checkedValues);
    setBatchDisabled(checkedValues.length <= 0);
  };

  const showAccountRateModal = (item) => {
    setAccountRateVisible(true);
    // setCurrent(handler);
  };

  const showBatchRateModal = (item) => {
    // setAccountRateVisible(true);
    // setCurrent(handler);
  };

  const handleAccountRateDone = () => {
    // setAddButtonBlur();
    setAccountRateDone(false);
    setAccountRateVisible(false);
  };

  const handleAccountRateCancel = () => {
    // setAddButtonBlur();
    setAccountRateVisible(false);
  };

  const handleAccountRateSubmit = rateValues => {
    // const channel_id = current ? current.channel_id : '';
    // setAddButtonBlur();
    setAccountRateDone(true);
    dispatch({
      type: 'paymentAccountManagement/submitRate',
      payload: {
        // channel_id,
        ...rateValues
      },
    });
  };



  const extraContent = (
    <div className={styles.extraContent}>
      <Button
        onClick={showAccountRateModal}
        style={{ marginRight: 8 }}
        disabled={batchDisabled}
      >
        批量设置费率
      </Button>
      <Button
        onClick={() => { }}
        disabled={batchDisabled}
      >
        批量设置参数
      </Button>
    </div>
  );

  const accountRateModal = (
    <AccountRateModal
      done={accountRateDone}
      visible={accountRateVisible}
      channel={null}
      handler={null}
      rateList={rateList}
      onDone={handleAccountRateDone}
      onCancel={handleAccountRateCancel}
      onSubmit={handleAccountRateSubmit}
    />
  );


  const renderContent = () => {
    if (currentStep === 1) {
      return (
        <div className={styles.standardList}>
          <Card
            className={styles.listCard}
            bordered={false}
            title="已选受理产品"
            style={{
              marginTop: 24
            }}
            bodyStyle={{
              padding: '0 32px 40px 32px'
            }}
            extra={extraContent}
          >
            <Checkbox
              indeterminate={checkAllIndeterminate}
              style={{ margin: '0 8px 0 24px' }}
              onChange={handleCheckboxAllChange}
              checked={checkAll}
            >
              全选
              </Checkbox>
            <Checkbox.Group
              style={{ width: '100%' }}
              onChange={handleCheckboxChange}
              value={checkedHandlers}
            >
              <List
                size="large"
                rowKey="handler_id"
                // loading={loading}
                pagination={paginationProps}
                dataSource={selectedHandlers}
                renderItem={item => (
                  <List.Item
                    actions={[
                      <a
                        key="setRate"
                        onClick={e => {
                          e.preventDefault();
                          showAccountRateModal(item);
                        }}
                      >
                        设置费率
                  </a>,
                      <a
                        key="setParam"
                        onClick={e => {
                          e.preventDefault();
                          // showAccountModal(item);
                        }}
                      >
                        设置参数
                  </a>,
                    ]}
                  >
                    <Checkbox
                      value={item.handler_id}
                      style={{ margin: '0 16px 0 0' }}
                    // checked={isCheckboxChecked(item.handler_id)}
                    />
                    <List.Item.Meta
                      avatar={<Avatar src={item.handler_logo} shape="square" size="large" />}
                      title={item.handler_name}
                    // description={item.channel_desc}
                    />
                    <ListContent data={item} />
                  </List.Item>
                )}
              />
            </Checkbox.Group>
          </Card>

          <div style={{ margin: '8px auto', textAlign: 'right' }}>
            <Button
              style={{
                float: 'left',
                marginBottom: 0,
              }}
              onClick={backward}
            >
              上一步
            </Button>
            <Button
              style={{
                marginBottom: 0,
                marginLeft: 8
              }}
              onClick={handleCancel}
            >
              取消
            </Button>
            <Button
              type="primary"
              style={{
                marginBottom: 0,
                marginLeft: 8
              }}
              onClick={handleNext}
            >
              下一步
            </Button>
          </div>
        </div>
      );
    }

    if (currentStep === 2) {
      return (
        <div className={styles.standardList}>
          <Card
            className={styles.listCard}
            bordered={false}
            title="受理产品"
            style={{
              marginTop: 24
            }}
            bodyStyle={{
              padding: '0 32px 40px 32px'
            }}
          // extra={extraContent}
          >
            <List
              size="large"
              rowKey="handler_id"
              // loading={loading}
              pagination={paginationProps}
              dataSource={selectedHandlers}
              renderItem={item => (
                <List.Item>
                  <List.Item.Meta
                    avatar={<Avatar src={item.handler_logo} shape="square" size="large" />}
                    title={item.handler_name}
                  // description={item.channel_desc}
                  />
                  <ListContent data={item} />
                </List.Item>
              )}
            />
          </Card>
          <div style={{ margin: '8px auto', textAlign: 'right' }}>
            <Button
              style={{
                float: 'left',
                marginBottom: 0,
              }}
              onClick={backward}
            >
              上一步
            </Button>
            <Button
              style={{
                marginBottom: 0,
                marginLeft: 8
              }}
              onClick={handleCancel}
            >
              取消
            </Button>
            <Button
              type="primary"
              style={{
                marginBottom: 0,
                marginLeft: 8
              }}
              onClick={handleNext}
            >
              完成
            </Button>
          </div>
        </div>
      );
    }

    // step 0
    return (
      <>
        <Form.Item
          name="channel_code"
          label="选择支付渠道"
        >
          <Select
            style={{
              width: 280
            }}
            onChange={handleChannelChange}
          >
            {channelOptions}
          </Select>
        </Form.Item>
        <Form.Item
          label="选择支付应用"
        >
          <Select
            style={{
              width: 280
            }}
            onChange={handleVendorChange}
          >
            {vendorOptions}
          </Select>
        </Form.Item>
        <Form.Item
          label="选择受理产品"
        >
          <Transfer
            dataSource={sourceData}
            titles={['受理产品列表', '选择受理产品']}
            targetKeys={targetKeys}
            selectedKeys={selectedKeys}
            onChange={handleTransferChange}
            onSelectChange={handleTransferSelectChange}
            onScroll={handleTransferScroll}
            render={item => item.title}
            listStyle={{
              width: 280
            }}
          />
        </Form.Item>

        <div style={{ margin: '8px auto', textAlign: 'right' }}>
          <Button
            style={{
              marginBottom: 0,
              marginLeft: 8
            }}
            onClick={handleCancel}
          >
            取消
          </Button>
          <Button
            type="primary"
            style={{
              marginBottom: 0,
              marginLeft: 8
            }}
            onClick={handleNext}
          >
            下一步
          </Button>
        </div>
      </>
    );

  };

  // const renderFooter = () => {
  //   if (currentStep === 1) {
  //     return (
  //       <>
  //         <Button
  //           style={{
  //             float: 'left'
  //           }}
  //           onClick={backward}
  //         >
  //           上一步
  //         </Button>
  //         <Button
  //           style={{
  //             float: 'right'
  //           }}
  //           onClick={() => handleCancel()}
  //         >
  //           取消
  //         </Button>
  //         <Button
  //           type="primary"
  //           onClick={() => handleNext()}
  //         >
  //           下一步
  //         </Button>
  //       </>
  //     );
  //   }

  //   if (currentStep === 2) {
  //     return (
  //       <>
  //         <Button
  //           style={{
  //             float: 'left'
  //           }}
  //           onClick={backward}
  //         >
  //           上一步
  //         </Button>
  //         <Button onClick={() => handleCancel()}>取消</Button>
  //         <Button type="primary" onClick={() => handleNext()}>
  //           完成
  //         </Button>
  //       </>
  //     );
  //   }

  //   // stop 0
  //   return (
  //     <>
  //       <Button onClick={() => handleCancel()}>取消</Button>
  //       <Button type="primary" onClick={() => handleNext()}>
  //         下一步
  //       </Button>
  //     </>
  //   );
  // };

  return (

    // <Modal
    //   // className={styles.standardListForm}
    //   width='calc(75%)'
    //   bodyStyle={{
    //     padding: '32px 40px 48px',
    //   }}
    //   destroyOnClose
    //   title="添加支付受理"
    //   visible={visible}
    //   footer={renderFooter()}
    //   onCancel={onCancel}
    // >
    <div>
      <PageHeaderWrapper>
        <Card
          className={styles.listCard}
          bordered={false}
          title="添加支付受理"
          style={{
            marginTop: 24
          }}
          bodyStyle={{
            padding: '0 32px 40px 32px'
          }}
        // extra={extraContent}
        >
          <Steps
            style={{
              margin: '28px 0'
            }}
            size="small"
            current={currentStep}
          >
            <Step title="选择支付受理" />
            <Step title="配置受理参数" />
            <Step title="配置路由策略" />
          </Steps>
          <Form
            {...formLayout}
            form={form}
            initialValues={{
            }}
          >
            {renderContent()}
          </Form>

          {accountRateModal}

        </Card>
      </PageHeaderWrapper>
    </div>

  );

};

// export default PaymentAccountHandlerOperationModal;

export default connect(({ paymentAccountManagement, loading }) => ({
  paymentAccountManagement,
  loading: loading.models.paymentAccountManagement
}))(PaymentAccountHandlerOperation);