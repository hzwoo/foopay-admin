import React, {
  useState,
  useEffect
} from 'react';
import {
  Modal,
  Result,
  Button,
  Form,
  Input,
  Select
} from 'antd';
import {
  connect
} from 'umi';
import {
  isArray
} from 'lodash';
import styles from '../style.less';

const { TextArea } = Input;
const { Option } = Select;
const formLayout = {
  labelCol: {
    span: 7
  },
  wrapperCol: {
    span: 13
  }
};

export const PaymentHandlerOperationModal = props => {
  const [form] = Form.useForm();
  const {
    done,
    visible,
    channel,
    current,
    onDone,
    onCancel,
    onSubmit,
    dispatch,
    // loading,
    paymentChannelManagement: {
      vendorList,
      productList,
      rateList
    }
  } = props;

  // const [vendorOptions, setVendorOptions] = useState([]);
  // const [productOptions, setProductOptions] = useState([]);
  // const [defaultVendorOption, setDefaultVendorOption] = useState('');
  // const [defaultProductOption, setDefaultProductOption] = useState('');
  const [channelId, setChannelId] = useState('');
  const [productCode, setProductCode] = useState('');
  const [handlerName, setHandlerName] = useState(`${channel.channel_name}-`);
  const [handlerCode, setHandlerCode] = useState(`${channel.channel_name}_`);

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
  useEffect(() => {
    dispatch({
      type: 'paymentChannelManagement/fetchVendors',
      payload: {
        vendor_code: channel.channel_code
      }
    });

    dispatch({
      type: 'paymentChannelManagement/fetchProducts',
      payload: {
        vendor_id: isArray(vendorList) && vendorList[0] && vendorList[0].vendor_id ? vendorList[0].vendor_id : null
      }
    });
  }, [props.channel]);
  // useEffect(() => {
  //   dispatch({
  //     type: 'paymentChannelManagement/fetchProducts',
  //     payload: {
  //       vendor_id: isArray(vendorList) && vendorList[0] && vendorList[0].vendor_id ? vendorList[0].vendor_id : null
  //     }
  //   });
  // }, [1]);
  const handleSubmit = () => {
    if (!form) {
      return;
    }

    form.setFieldsValue({
      handler_name: handlerName,
      product_code: handlerCode,
    });

    form.submit();
  };

  const handleFinish = values => {
    if (onSubmit) {
      onSubmit(values);
    }
  };

  const handleVendorChange = selected => {
    // console.log('selected vendor:', selected);
    dispatch({
      type: 'paymentChannelManagement/fetchProducts',
      payload: {
        vendor_id: isArray(vendorList) && vendorList[selected].vendor_id ? vendorList[selected].vendor_id : null
      }
    });
  };

  const handleProductChange = selected => {
    setProductCode(productList[selected].product_code);
    setHandlerName(`${productList[selected].product_name}-${channel.channel_name}受理`);
    setHandlerCode(`${productList[selected].product_code}_${channel.channel_code}`);
  };

  const handleRateChange = selected => {

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

  const getModalContent = () => {
    if (done) {
      return (
        <Result
          status="success"
          title="操作成功"
          subTitle=""
          extra={
            <Button type="primary" onClick={onDone}>
              关闭
            </Button>
          }
          className={styles.formResult}
        />
      );
    }

    const vendorOptions = [];
    if (vendorList) {
      for (let i = 0; i < vendorList.length; i += 1) {
        vendorOptions.push(<Option key={i}>{vendorList[i].vendor_name}</Option>)
      }
    }

    const productOptions = [];
    if (productList) {
      for (let i = 0; i < productList.length; i += 1) {
        productOptions.push(<Option key={i}>{productList[i].product_name}</Option>)
      }
    }

    const rateOptions = [];
    if (rateList) {
      for (let i = 0; i < rateList.length; i += 1) {
        rateOptions.push(<Option key={i}>{rateList[i].rate_name}</Option>)
      }
    }

    return (
      <Form {...formLayout} form={form} onFinish={handleFinish}>
        <Form.Item
          name="vendor_name"
          label="支付应用"
          rules={[
            {
              // required: true,
              message: '请选择支付应用'
            }
          ]}
        >
          <Select defaultValue="" style={{ width: 340 }} onChange={handleVendorChange}>
            {vendorOptions}
          </Select>
        </Form.Item>
        <Form.Item
          name="product_name"
          label="支付产品"
          rules={[
            {
              // required: true,
              message: '请选择支付产品'
            }
          ]}
        >
          <Select defaultValue="" style={{ width: 340 }} onChange={handleProductChange}>
            {productOptions}
          </Select>
        </Form.Item>
        <Form.Item
          // name="product_code"
          label="支付产品代码"
          rules={[
            {
              required: true,
              // message: '请输入支付产品代码'
            }
          ]}
        >
          {productCode}
        </Form.Item>
        <Form.Item
          // name="handler_name"
          label="受理产品名称"
          rules={[
            {
              required: true,
              // message: '请输入受理产品名称'
            }
          ]}
        >
          {handlerName}
        </Form.Item>
        <Form.Item
          // name="handler_code"
          label="受理产品代码"
          rules={[
            {
              required: true,
              // message: '请输入受理产品代码'
            }
          ]}
        >
          {handlerCode}
        </Form.Item>
        <Form.Item
          name="rate_name"
          label="受理费率"
          rules={[
            {
              // required: true,
              message: '请选择受理费率'
            }
          ]}
        >
          <Select defaultValue="" style={{ width: 340 }} onChange={handleRateChange}>
            {rateOptions}
          </Select>
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
      </Form>
    );
  };

  return (
    <Modal
      getContainer={false}
      title={done ? null : '添加受理产品'}
      className={styles.standardListForm}
      width={640}
      bodyStyle={
        done
          ? {
            padding: '72px 0'
          }
          : {
            padding: '28px 0 0'
          }
      }
      destroyOnClose
      visible={visible}
      {...modalFooter}
    >
      {getModalContent()}
    </Modal>
  );

};

export default connect(({ paymentChannelManagement, loading }) => ({
  paymentChannelManagement,
  loading: loading.models.paymentChannelManagement
}))(PaymentHandlerOperationModal);