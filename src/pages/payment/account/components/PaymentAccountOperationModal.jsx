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
  InputNumber,
  Select,
  DatePicker
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

const PaymentAccountOperationModal = props => {
  const [form] = Form.useForm();
  const {
    done,
    group,
    batch,
    visible,
    onDone,
    onCancel,
    onSubmit
  } = props;
  // const [batchStart, setBatchStart] = useState('');
  const [batchEnd, setBatchEnd] = useState('');
  useEffect(() => {
    if (form && !visible) {
      form.resetFields();
    }
  }, [props.visible]);
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
    form.submit();
  };

  const handleFinish = values => {
    if (onSubmit) {
      onSubmit(values);
    }
  };

  const handleExpireChange = selected => {

  };

  const handleAllottedChange = number => {
    const batchStart = group.next_account_id;
    const end = (parseInt(batchStart, 10) + number).toString();
    setBatchEnd(end);
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

    let numOfAllotted = null;
    let accountNo = '';

    if (batch === true) {
      numOfAllotted = (
        <Form.Item
          name="num_of_allotted"
          label="分配账户数"
          rule={[
            {
              require: true,
              max: group.batch_remain
            }
          ]}
        >
          <InputNumber
            placeholder="请输入批量分配数"
            max={group.batch_remain}
            onChange={handleAllottedChange}
            style={{ width: '100%' }}
          />
        </Form.Item>
      );

      // const batchEnd = group.current_id + 1;
      accountNo = (
        <Form.Item
          name="account_no"
          label="账户号段"
        >
          <Form.Item
            name="batch_start"
            style={{ display: 'inline-block', width: 'calc(50%-8px)' }}
          >
            {group.next_account_id}
          </Form.Item>
          &nbsp;～&nbsp;
          <Form.Item
            name="batch_start"
            style={{ display: 'inline-block', width: 'calc(50%-8px)', margin: '0 8px' }}
          >
            {batchEnd}
          </Form.Item>
        </Form.Item>
      );

    } else {
      accountNo = (
        <Form.Item
          name="account_no"
          label="账户号"
        >
          {group.next_account_id}
        </Form.Item>
      );
    }

    return (
      <Form {...formLayout} form={form} onFinish={handleFinish}>
        <Form.Item
          name="group_name"
          label="账户组名称"
          rules={[
            {
              required: true,
              message: '请输入账户组名称'
            }
          ]}
        >
          {group.group_name}
          {/* <Input placeholder="请输入" /> */}
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
          {group.account_type}
          {/* <Input placeholder="请输入" /> */}
        </Form.Item>
        <Form.Item
          name="batch_prefix"
          label="账户号前缀"
          rules={[
            {
              required: true,
              message: '请输入账户号前缀'
            }
          ]}
        >
          {group.batch_prefix}
          {/* <Input placeholder="请输入" /> */}
        </Form.Item>
        {numOfAllotted}
        {accountNo}
        <Form.Item
          name="account_name"
          label="账户名称"
        // rules={[
        //   {
        //     min: 5,
        //     message: '请输入账户名称'
        //   }
        // ]}
        >
          <Input placeholder="请输入" />
        </Form.Item>

        <Form.Item
          name="expire"
          label="有效期"
        >
          <Select defaultValue="1" style={{ width: 100 }} onChange={handleExpireChange}>
            <Option value="1">1个月</Option>
            <Option value="2">2个月</Option>
            <Option value="3">3个月</Option>
            <Option value="4">4个月</Option>
            <Option value="5">5个月</Option>
            <Option value="6">6个月</Option>
            <Option value="7">7个月</Option>
            <Option value="8">8个月</Option>
            <Option value="9">9个月</Option>
            <Option value="10">10个月</Option>
            <Option value="11">11个月</Option>
            <Option value="12">一年</Option>
            <Option value="24">二年</Option>
            <Option value="36">三年</Option>
          </Select>
          &nbsp;&nbsp;或&nbsp;有效截止日期&nbsp;&nbsp;
          <DatePicker
            // showTime
            placeholder="请选择"
            format="YYYY-MM-DD"
            style={{
              width: 128,
            }}
          />

        </Form.Item>
        {/* <Divider /> */}


      </Form>
    );
  };

  return (
    <Modal
      getContainer={false}
      title={batch ? '批量分配虚拟账户' : '分配虚拟账户'}
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

export default PaymentAccountOperationModal;