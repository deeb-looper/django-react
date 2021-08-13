import { Form, Input, Button, Row, Col } from 'antd';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useMutation } from 'react-query';

import { useAuthAction, useAuthState } from '../../../hooks/auth';

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

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const Login = () => {
  const { loginUser }  = useAuthAction();
  const { setIsLoggedIn } = useAuthState();
  const navigate = useNavigate();

  const onFinish = (values: any) => {
    loginUserMutate(values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  const { mutate: loginUserMutate, isLoading } = useMutation((user: { email: string, password:string }) => loginUser(user), {
    onSuccess: res => {
      setIsLoggedIn(true);
    },
    onError: (error) => {
      console.log(error, 'login');
    },
  });

  return (
    <Container>
      <Col span={8} offset={8}>
        <Form
          name="basic"
          labelCol={{ sm: { span: 24 }, md: { span: 24 }, lg: { span: 12, offset: 6 }, }}
          wrapperCol={{ sm: { span: 24 }, md: { span: 24 }, lg: { span: 12, offset: 6 }, }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          layout="vertical"
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                type: 'email',
                message: 'The input is not valid email!',
              },
              {
                required: true,
                message: 'Please input your email!',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[
              { required: true, message: 'Please input your password!', },
              {
                min: 8,
                message: 'Ensure this field has at least 8 characters.',
              },
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item>
            <ButtonWrapper>
              <Button disabled={isLoading} type="primary" htmlType="submit">
                Submit
              </Button>
              <Button type="link" onClick={() => navigate('/register')} style={{ marginTop: 16 }}>
                Register Now
              </Button>
            </ButtonWrapper>
          </Form.Item>
        </Form>
      </Col>
    </Container>
  );
};

export default Login;
