import { Form, Input, Row, Col, Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useMutation } from 'react-query';
import styled from 'styled-components';

import { UserParams } from '../../../../common/domain/entities/user';
import { useAuthAction } from '../../../hooks/auth';

const Container = styled(Row)`
  margin-right: 0 !important;
  margin-left: 0 !important;

  .ant-col:first-child {
      padding-left: 0 !important;
  }

  .ant-col:last-child {
    padding-right: 0 !important;
  }

  padding: 200px 0;
`;

const Register = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { registerUser }  = useAuthAction();

  const { mutate: registerUserMutate, isLoading } = useMutation((user: UserParams) => registerUser(user), {
    onSuccess: res => {
      navigate('/login')
    },
    onError: (error) => {
      console.log(error);
    },
  });


  const onFinish = (values: any) => {
    const { confirm, ...params } = values;
    registerUserMutate(params);
  };

  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 8 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 16 },
    },
  };
  const tailFormItemLayout = {
    wrapperCol: {
      xs: {
        span: 24,
        offset: 0,
      },
      sm: {
        span: 16,
        offset: 8,
      },
    },
  };

  return (
    <Container>
      <Col span={8} offset={8}>
        <Form
          {...formItemLayout}
          form={form}
          name="register"
          onFinish={onFinish}
          scrollToFirstError
        >
          <Form.Item
            label="Username"
            name="user_name"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[
              {
                type: 'email',
                message: 'The input is not valid E-mail!',
              },
              {
                required: true,
                message: 'Please input your E-mail!',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="password"
            label="Password"
            rules={[
              {
                required: true,
                message: 'Please input your password!',
              },
              {
                min: 8,
                message: 'Ensure this field has at least 8 characters.',
              },
            ]}
            hasFeedback
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            name="confirm"
            label="Confirm Password"
            dependencies={['password']}
            hasFeedback
            rules={[
              {
                required: true,
                message: 'Please confirm your password!',
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('The two passwords that you entered do not match!'));
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit" disabled={isLoading}>
              Register
            </Button>
            <Button onClick={() => navigate('/login')} style={{ marginLeft: 16 }}>
              Back to login
            </Button>
          </Form.Item>
        </Form>
      </Col>
    </Container>
  );
};

export default Register;
