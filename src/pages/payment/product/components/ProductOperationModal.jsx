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
  Select
} from 'antd';
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

const ProductOperationModal = props => {
  const [form] = Form.useForm();
  const {
    methodList,
    done,
    visible,
    vendor,
    current,
    onDone,
    onCancel,
    onSubmit
  } = props;
  const [vendorId, setVendorId] = useState('');
  const [methodId, setMethodId] = useState('');
  const [productName, setProductName] = useState(`${vendor.vendor_name}-`);
  const [productCode, setProductCode] = useState(`${vendor.prod_code_prefix}_`);
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
      setProductName(current.product_name);
      setProductCode(current.product_code);
    }
  }, [props.current]);
  const handleSubmit = () => {
    if (!form) {
      return;
    }

    form.setFieldsValue({
      product_name: productName,
      product_code: productCode,
      vendor_id: vendorId,
      method_id: methodId
    });

    form.submit();
  };

  const handleFinish = values => {
    if (onSubmit) {
      onSubmit(values);
    }
  };

  const handleProductChange = selected => {
    setProductName(`${vendor.vendor_name}-${methodList[selected].method_name}`);
    setProductCode(`${vendor.prod_code_prefix}_${methodList[selected].method_code}`);
    setVendorId(`${vendor.vendor_id}`);
    setMethodId(`${methodList[selected].method_id}`);
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

    const options = [];
    for (let i = 0; i < methodList.length; i += 1) {
      options.push(<Option key={i}>{methodList[i].method_name}</Option>)
    }

    return (
      <Form {...formLayout} form={form} onFinish={handleFinish}>

        <div style={{ display: 'none' }}>
          <Form.Item
            name="method_id"
            label="支付方式ID"
          >
            <Input type="hidden" />
          </Form.Item>
        </div>

        <div style={{ display: 'none' }}>
          <Form.Item
            name="vendor_id"
            label="支付应用商ID"
          >
            <Input type="hidden" />
          </Form.Item>
        </div>

        <div style={{ display: 'none' }}>
          <Form.Item
            name="product_id"
            label="支付产品ID"
          >
            <Input type="hidden" />
          </Form.Item>
        </div>

        <Form.Item
          name="method_name"
          label="支付方式"
          rules={[
            {
              // required: true,
              message: '请选择支付方式'
            }
          ]}
        >
          <Select defaultValue="" style={{ width: 120 }} onChange={handleProductChange}>
            {options}
          </Select>
        </Form.Item>
        <Form.Item
          name="product_name"
          label="支付产品名称"
          rules={[
            {
              required: true,
              message: '请输入支付产品名称'
            }
          ]}
        >
          {productName}
        </Form.Item>
        <Form.Item
          name="product_code"
          label="支付产品代码"
          rules={[
            {
              required: true,
              message: '请输入支付产品代码'
            }
          ]}
        >
          {productCode}
        </Form.Item>
        <Form.Item
          name="product_logo"
          label="支付产品Logo"
        >
          <Input placeholder="请输入" />
        </Form.Item>
        <Form.Item
          name="product_desc"
          label="支付产品描述"
          rules={[
            {
              min: 5,
              message: '请输入至少五个字符的支付产品描述'
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
      title={done ? null : '添加支付产品'}
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
  )
};

export default ProductOperationModal;