import React, {
  useEffect
} from 'react';
import {
  Modal,
  Result,
  Button,
  Form,
  Input,
  Select,
} from 'antd';
import styles from '../style.less';

const { Option } = Select;
const formLayout = {
  labelCol: {
    span: 7
  },
  wrapperCol: {
    span: 13
  }
};

const PaymentAccountGroupOperationModal = props => {
  const [form] = Form.useForm();
  const {
    done,
    current,
    visible,
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

  const handleAccountTypeChange = selected => {

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
          name="group_name"
          label="账户组名称"
        // rules={[
        //   {
        //     required: true,
        //     message: '请输入账户组名称'
        //   }
        // ]}
        >
          <Input defaultValue="虚拟账户组" placeholder="请输入" />
        </Form.Item>
        <Form.Item
          name="account_type"
          label="账户类型"
          rules={[
            {
              required: true,
              message: '请输入账户类型'
            }
          ]}
        >
          <Select defaultValue="INCOME" style={{ width: 340 }} onChange={handleAccountTypeChange}>
            <Option value="INCOME">收款账户</Option>
            <Option value="DEPOSIT">预存账户</Option>
          </Select>
        </Form.Item>
        <Form.Item
          name="batch_prefix"
          label="账户号段前缀"
          rules={[
            {
              required: true,
              message: '请输入虚拟账户号段前缀'
            }
          ]}
        >
          <Input placeholder="请输入" />
        </Form.Item>
        <Form.Item
          label="号段起止"
        // style={{ marginBottom: 0 }}
        >
          <Form.Item
            name='batch_start'
            rules={[{ required: true }]}
            style={{ display: 'inline-block', width: 'calc(50% - 8px)' }}
          >
            <Input placeholder="请输入号段开始号码" />
          </Form.Item>
          <Form.Item
            name="batch_end"
            rules={[{ required: true }]}
            style={{ display: 'inline-block', width: 'calc(50% - 8px)', margin: '0 8px' }}
          >
            <Input placeholder="请输入号段结束号码" />
          </Form.Item>
        </Form.Item>
      </Form>
    );
  };

  return (
    <Modal
      getContainer={false}
      title={done ? null : '新建虚拟账户组'}
      // className={styles.standardListForm}
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

export default PaymentAccountGroupOperationModal;