import React, {
  useState,
  useEffect
} from 'react';
import {
  DownOutlined
} from '@ant-design/icons';
import {
  Modal,
  Result,
  Button,
  Form,
  Input,
  Select,
  Dropdown,
  Menu,
  Card
} from 'antd';
// import {
//   connect
// } from 'umi';
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

const PaymentAccountRateModal = props => {
  const [form] = Form.useForm();
  const {
    done,
    visible,
    channel,
    handler,
    rateList,
    current,
    onDone,
    onCancel,
    onSubmit,
  } = props;

  const [rateName, setRateName] = useState('');
  // useEffect(() => {
  //   if (form && !visible) {
  //     form.resetFields();
  //   }
  // }, [props.visible]);
  // useEffect(() => {
  //   if (current) {
  //     form.setFieldsValue({
  //       ...current
  //     });
  //   }
  // }, [props.current]);
  const handleSubmit = () => {
    if (!form) {
      return;
    }

    form.setFieldsValue({
      rate_name: rateName,
    });

    form.submit();
  };

  const handleFinish = values => {
    if (onSubmit) {
      onSubmit(values);
    }
  };

  // const handleVendorChange = selected => {

  // };

  // const handleProductChange = selected => {

  // };

  const handleModeChange = selected => {

  };

  const handleTypeChange = selected => {

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

  const cloneAction = (key) => {
    if (rateList[key]) {
      form.setFieldsValue({
        ...rateList[key]
      });
    }
  };

  const rateMenuItem = [];
  if (rateList) {
    for (let i = 0; i < rateList.length; i += 1) {
      rateMenuItem.push(<Menu.Item key={i}>{rateList[i].rate_name}</Menu.Item>);
    }
    // console.log('ratemenuItem:', rateMenuItem);
  }

  const CloneButton = () => (
    <Dropdown
      overlay={
        <Menu onClick={({ key }) => cloneAction(key)}>
          {rateMenuItem}
        </Menu>
      }
    >
      <a>
        从已有费率复制 <DownOutlined />
      </a>
    </Dropdown>
  );

  const extraContent = (
    <div className={styles.extraContent}>
      <CloneButton />
    </div>
  );

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

    // const vendorOptions = [];
    // for (let i = 0; i < vendorList.length; i += 1) {
    //   vendorOptions.push(<Option key={i}>{vendorList[i].vendor_name}</Option>)
    // }

    // const rateModeOptions = [];
    // const rateOptions = [];

    return (

      <Form {...formLayout} form={form} onFinish={handleFinish}>
        <Form.Item
          name="rate_name"
          label="支付渠道名称"
          rules={[
            {
              required: true,
              message: '请输入费率名称'
            }
          ]}
        >
          <Input value={rateName} placeholder="请输入" />
        </Form.Item>
        <Form.Item
          name="rate_mode"
          label="费率模式"
          rules={[
            {
              required: true,
              message: '请选择费率模式'
            }
          ]}
        >
          <Select defaultValue="CHANNEL" style={{ width: 340 }} onChange={handleModeChange}>
            <Option value="CHANNEL">渠道费率</Option>
            <Option value="HANDLER">受理费率</Option>
            <Option value="PROXY">代理费率</Option>
          </Select>
        </Form.Item>
        <Form.Item
          name="rate_type"
          label="费率类型"
          rules={[
            {
              required: true,
              message: '请选择费率类型'
            }
          ]}
        >
          <Select defaultValue="RATIO" style={{ width: 340 }} onChange={handleTypeChange}>
            <Option value="RATIO">费率（百分比）</Option>
            <Option value="FEE">费用（分）</Option>
          </Select>
        </Form.Item>
        <Form.Item
          name="rate"
          label="费率"
          rules={[
            {
              required: true,
              message: '请输入费率'
            }
          ]}
        >
          <Input placeholder="请输入" />
        </Form.Item>
        <Form.Item
          name="min_fee"
          label="最低费用"
        >
          <Input placeholder="请输入" />
        </Form.Item>
        <Form.Item
          name="max_fee"
          label="最高费用"
        >
          <Input placeholder="请输入" />
        </Form.Item>
        <Form.Item
          name="min_applicable"
          label="最低费用生效金额"
        >
          <Input placeholder="请输入" />
        </Form.Item>
      </Form>
    );
  };

  let modalTitle = '添加费率';
  if (channel && channel.channel_id) {
    modalTitle = '添加渠道费率';
    if (handler && handler.handler_id) {
      modalTitle = '添加受理费率';
    }
  }

  return (
    <Modal
      // getContainer={false}
      title={done ? null : modalTitle}
      className={styles.standardListForm}
      width={640}
      bodyStyle={
        done
          ? {
            padding: '72px 0'
          }
          : {
            padding: 0
          }
      }
      destroyOnClose
      visible={visible}
      {...modalFooter}
    >
      <Card
        className={styles.listCard}
        bordered={false}
        style={{
          // marginTop: 8,
          marginBottom: 24,
        }}
        headStyle={{
          borderBottom: 0
        }}
        bodyStyle={{
          padding: 0
        }}
        // size="small"
        extra={extraContent}
      />

      {getModalContent()}
    </Modal>
  );

};

export default PaymentAccountRateModal;
// export default connect(({ paymentAccountManagement, loading }) => ({
//   paymentAccountManagement,
//   loading: loading.models.paymentAccountManagement
// }))(PaymentAccountRateModal);