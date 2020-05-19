import React, {
  useEffect
} from 'react';
import {
  Drawer,
  Result,
  Button,
  Form,
  Input,
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

const OperationDrawer = props => {
  const [form] = Form.useForm();
  const { done, visible, current, onDone, onCancel, onSubmit } = props;
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

  // const drawerFooter = done
  //   ? {
  //     footer: null,
  //     onCancel: onDone
  //   }
  //   : {
  //     okText: '保存',
  //     onOk: handleSubmit,
  //     onCancel
  //   };

  const footer = (
    <div
      style={{
        textAlign: 'right'
      }}
    >
      <Button
        onClick={onCancel}
        type="primary"
      >
        取消
      </Button>
      <Button
        onClick={handleSubmit}
        type="primary"
      >
        提交
      </Button>
    </div>
  );

  const getDrawerContent = () => {
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
          name="method_name"
          label="支付方式名称"
          rules={[
            {
              required: true,
              message: '请输入支付方式名称'
            }
          ]}
        >
          <Input placeholder="请输入" />
        </Form.Item>
        <Form.Item
          name="method_code"
          label="支付方式代码"
          rules={[
            {
              required: true,
              message: '请输入支付方式代码'
            }
          ]}
        >
          <Input placeholder="请输入" />
        </Form.Item>
        <Form.Item
          name="method_desc"
          label="支付方式描述"
          rules={[
            {
              min: 5,
              message: '请输入至少五个字符的支付方式描述'
            }
          ]}
        >
          <TextArea row={4} placeholder="请输入至少五个字符" />
        </Form.Item>
      </Form>
    );
  }

  return (
    <Drawer
      title={done ? null : `支付方式${current ? '编辑' : '添加'}`}
      className={styles.standardListForm}
      width={720}
      bodyStyle={
        done
          ? {
            padding: '72px 0'
          }
          : {
            padding: '28px 0 0'
          }
      }
      onClose={onCancel}
      visible={visible}
      footer={footer}
    >
      {getDrawerContent()}
    </Drawer>
  );
};

export default OperationDrawer;