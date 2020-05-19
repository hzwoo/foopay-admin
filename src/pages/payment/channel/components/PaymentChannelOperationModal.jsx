import React, {
  useEffect,
  useState
} from 'react';
import {
  Modal,
  Result,
  Button,
  Form,
  Input,
  Checkbox,
  Select,
  Steps,
  Row,
  Col,
  // Divider
} from 'antd';
import {
  MinusCircleOutlined,
  PlusOutlined
} from '@ant-design/icons';
import styles from '../style.less';
import custom from '../custom.less';

const { TextArea } = Input;
const { Step } = Steps;
const { Option } = Select;
const formLayout = {
  labelCol: {
    span: 7
  },
  wrapperCol: {
    span: 13
  }
};

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 4 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 20 },
  },
};
const formItemLayoutWithOutLabel = {
  wrapperCol: {
    xs: { span: 24, offset: 0 },
    sm: { span: 20, offset: 4 },
  },
};

const LAST_STEP = 3;

const PaymentChannelOperationModal = props => {
  const [form] = Form.useForm();
  const {
    done,
    visible,
    current,
    onDone,
    onCancel,
    onSubmit
  } = props;
  const [currentStep, setCurrentStep] = useState(0);
  const [merchantParams, setMerchantParams] = useState([]);
  const [serviceProviderParams, setServiceProviderParams] = useState([]);
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
  useEffect(() => {
    if (form && !visible) {
      form.resetFields();
    }
  }, [props.visible]);
  useEffect(() => {
    if (current) {
      form.setFieldsValue({
        ...current
      });
    }
  }, [props.current]);

  const forward = () => {
    setCurrentStep(currentStep + 1);
  };

  const backward = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleNext = async () => {
    const fieldsValue = await form.validateFields();
    setFormValues({ ...formValues, ...fieldsValue });

    if (currentStep < LAST_STEP) {
      forward();
    } else {
      onSubmit(formValues);
    }
  };

  const handleSubmit = () => {
    if (!form) {
      return;
    }
    form.submit();
  };

  const handleFinish = values => {
    if (onSubmit) {
      onSubmit(values);
    }
  };

  const modalFooter = done
    ? {
      footer: null,
      onCancel: onDone
    }
    : {
      okText: '确定提交',
      onOk: handleSubmit,
      onCancel
    };

  // const getModalContent = () => {
  //   if (done) {
  //     return (
  //       <Result
  //         status="success"
  //         title="操作成功"
  //         subTitle=""
  //         extra={
  //           <Button type="primary" onClick={onDone}>
  //             关闭
  //           </Button>
  //         }
  //         className={styles.formResult}
  //       />
  //     );
  //   }
  // }

  const dynamicRules = [{
    required: true
  }];

  const dynamicFormList = (name, prefix, prefixName) => {
    return (
      <Form.List name={name}>
        {(fields, { add, remove }) => (
          <div>
            <Row style={{ margin: "12px 8px" }}>
              <Col span={4} offset={4}>
                <span>参数标签</span>
              </Col>
              <Col span={4}>
                <span>参数名称</span>
              </Col>
              <Col span={4}>
                <span>参数类型</span>
              </Col>
              <Col span={2}>
                <span>是否必填</span>
              </Col>
            </Row>
            {fields.map((field, index) => (
              <Row key={field.key}>
                <Col span={4} offset={4}>
                  <Form.Item
                    name={[field.name, `${prefix}_param_label`]}
                    fieldKey={[field.fieldKey, `${prefix}_param_label`]}
                    rules={dynamicRules}
                    wrapperCol={{
                      span: 23
                    }}
                  >
                    <Input placeholder={`${prefixName}参数标签（param_label)`} />
                  </Form.Item>
                </Col>
                <Col span={4}>
                  <Form.Item
                    name={[field.name, `${prefix}_param_name`]}
                    fieldKey={[field.fieldKey, `${prefix}_param_name`]}
                    rules={dynamicRules}
                    wrapperCol={{
                      span: 23
                    }}
                  >
                    <Input placeholder={`${prefixName}参数名称（param_name)`} />
                  </Form.Item>
                </Col>
                <Col span={4}>
                  <Form.Item
                    name={[field.name, `${prefix}_param_type`]}
                    fieldKey={[field.fieldKey, `${prefix}_param_type`]}
                    rules={dynamicRules}
                    wrapperCol={{
                      span: 23
                    }}
                  >
                    <Select defaultValue="string" onChange={() => { }}>
                      <Option value="string">String</Option>
                      <Option value="number">Number</Option>
                      <Option value="boolean">Boolean</Option>
                      <Option value="array">Array</Option>
                      <Option value="object">Object</Option>
                      <Option value="datetime">Datetime</Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={1}>
                  <Form.Item
                    name={[field.name, `${prefix}_required`]}
                    fieldKey={[field.fieldKey, `${prefix}_required`]}
                  >
                    <Checkbox onChange={() => { }} />
                  </Form.Item>
                </Col>
                <Col flex="none">
                  <MinusCircleOutlined
                    onClick={() => {
                      remove(field.name)
                    }}
                    style={{ margin: '4px 8px', fontSize: '24px' }}
                  />
                </Col>
              </Row>
            ))}
            <Form.Item
              wrapperCol={
                {
                  xs: { span: 24, offset: 0 },
                  sm: { span: 20, offset: 4 },
                }
              }
            >
              <Button
                type="dashed"
                onClick={() => {
                  add();
                }}
                style={{ width: "70%" }}
              >
                <PlusOutlined /> 添加参数
              </Button>
            </Form.Item>
          </div>
        )}
      </Form.List>
    );
  }


  const renderContent = () => {
    if (currentStep === 1) {
      return (
        <>
          {dynamicFormList('merchantParams', 'mch', '商户')}
        </>
      );

    }

    if (currentStep === 2) {
      return (
        <>
          {dynamicFormList('serviceProviderParams', 'sp', '服务商')}
        </>
      );
    }

    if (currentStep === 3) {
      return (
        <>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </>
      );
    }

    return (
      <>
        <Form.Item
          name="channel_name"
          label="支付渠道名称"
          rules={[
            {
              required: true,
              message: '请输入支付渠道名称'
            }
          ]}
        >
          <Input placeholder="请输入" />
        </Form.Item>
        <Form.Item
          name="channel_code"
          label="支付渠道代码"
          rules={[
            {
              required: true,
              message: '请输入支付渠道代码'
            }
          ]}
        >
          <Input placeholder="请输入" />
        </Form.Item>
        <Form.Item
          name="webhook"
          label="API回调路径"
          rules={[
            {
              required: true,
              message: '请输入API回调路径'
            }
          ]}
        >
          <Input placeholder="请输入" />
        </Form.Item>
        <Form.Item
          name="channel_logo"
          label="支付渠道Logo"
        >
          <Input placeholder="请输入" />
        </Form.Item>
        <Form.Item
          name="channel_desc"
          label="支付渠道描述"
          rules={[
            {
              min: 5,
              message: '请输入至少五个字符的支付渠道描述'
            }
          ]}
        >
          <TextArea row={4} placeholder="请输入至少五个字符" />
        </Form.Item>
      </>
    );
  };

  const renderFooter = () => {
    if (currentStep === 1 || currentStep === 2) {
      return (
        <>
          <Button
            style={{
              float: 'left'
            }}
            onClick={backward}
          >
            上一步
          </Button>
          {/* <Button onClick={() => onCancel(false, values)}>取消</Button> */}
          <Button onClick={() => onCancel(false)}>取消</Button>
          <Button type="primary" onClick={handleNext}>
            下一步
          </Button>
        </>
      );
    }

    if (currentStep === 3) {
      return (
        <>
          <Button
            style={{
              float: 'left'
            }}
            onClick={backward}
          >
            上一步
          </Button>
          {/* <Button onClick={() => onCancel(false, values)}>取消</Button> */}
          <Button onClick={() => onCancel(false)}>取消</Button>
          <Button type="primary" onClick={handleNext}>
            完成
          </Button>
        </>
      );
    }

    // step 0
    return (
      <>
        {/* <Button onClic={() => onCancel(false, values)}>取消</Button> */}
        <Button onClick={() => onCancel(false)}>取消</Button>
        <Button type="primary" onClick={handleNext}>
          下一步
          </Button>
      </>
    );
  };

  return (
    <Modal
      // getContainer={false}
      title={done ? null : '添加支付渠道'}
      // className={styles.standardListForm}
      width='calc(70%)'
      // bodyStyle={
      //   done
      //     ? {
      //       padding: '72px 0'
      //     }
      //     : {
      //       padding: '28px 0 0'
      //     }
      // }
      bodyStyle={{
        padding: '28px 32px',
      }}
      destroyOnClose
      visible={visible}
      footer={renderFooter()}
    // {...modalFooter}
    >
      <Steps
        style={{
          // margin: '28px 40px'
          marginBottom: 28
        }}
        size="small"
        current={currentStep}
      >
        <Step title="添加基本信息" />
        <Step title="添加商户参数" />
        <Step title="添加服务商参数" />
        <Step title="确认渠道配置" />
      </Steps>
      <Form
        {...formLayout}
        // {...formItemLayoutWithOutLabel}
        form={form}
        initialValues={{
        }}
      >
        {renderContent()}
        {/* {getModalContent()} */}
      </Form>
    </Modal>
  );

};

export default PaymentChannelOperationModal;