import React, {
  useEffect
} from 'react';
import {
  Modal,
  Result,
  Button,
  Form,
  Input
} from 'antd';
import styles from '../style.less';

const { TextArea } = Input;
const formLayout = {
  labelCol: {
    span: 7
  },
  wrapperCol: {
    span: 13
  }
};

const VendorOperationModal = props => {
  const [form] = Form.useForm();
  const {
    done,
    visible,
    current,
    onDone,
    onCancel,
    onSubmit
  } = props;
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

    return (
      <Form {...formLayout} form={form} onFinish={handleFinish}>
        <Form.Item
          name="vendor_name"
          label="支付应用名称"
          rules={[
            {
              required: true,
              message: '请输入支付应用名称'
            }
          ]}
        >
          <Input placeholder="请输入" />
        </Form.Item>
        <Form.Item
          name="vendor_code"
          label="支付应用代码"
          rules={[
            {
              required: true,
              message: '请输入支付应用代码'
            }
          ]}
        >
          <Input placeholder="请输入" />
        </Form.Item>
        <Form.Item
          name="prod_code_prefix"
          label="支付产品代码前缀"
          rules={[
            {
              required: true,
              message: '请输入支付产品代码前缀'
            }
          ]}
        >
          <Input placeholder="请输入" />
        </Form.Item>
        <Form.Item
          name="vendor_logo"
          label="支付应用Logo"
        >
          <Input placeholder="请输入" />
        </Form.Item>
        <Form.Item
          name="vendor_desc"
          label="支付应用描述"
          rules={[
            {
              min: 5,
              message: '请输入至少五个字符的支付应用描述'
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
      title={done ? null : '添加支付应用'}
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

export default VendorOperationModal;