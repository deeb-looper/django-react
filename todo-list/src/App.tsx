import React, { useState, useEffect, Suspense } from 'react';
import { useQuery } from 'react-query';
import styled from 'styled-components';
import { PlusOutlined } from '@ant-design/icons';
import { Row, Col, Typography, List, Button, Modal, Form, Input } from 'antd';

import { useTodoAction } from './hooks/todo';

const { Title } = Typography;

type RequiredMark = boolean | 'optional';

const Container = styled(Row)`
  margin-right: 0 !important;
  margin-left: 0 !important;

  .ant-col:first-child {
      padding-left: 0 !important;
  }

  .ant-col:last-child {
    padding-right: 0 !important;
  }

  padding: 100px 200px;
`;

const TodoTitleWrapper = styled(Col)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  .ant-typography {
    margin-bottom: 0;
  }
`;

const TodoListWrapper = styled.div`
  max-height: 585px;
  overflow: auto;
  border: 1px solid #d9d9d9;
  border-radius: 2px;
`;

const ModalButtonWrapper = styled(Row)`
  margin-top: 24px;
`;

const App = () => {
  const [ isSetTodoModalVisible, setIsTodoModalVisiblle ] = useState<boolean>(false);
  const [headerModalLabel, setHeaderModalLabel ] = useState<string>('');
  const [form] = Form.useForm();
  const [requiredMark, setRequiredMarkType] = useState<RequiredMark>('optional');

  const { fetchTodos } = useTodoAction();

  const { data, refetch } = useQuery(
    `todos`,
    () => fetchTodos(),
    {
      enabled: false,
    },
  );

  useEffect(() => {
    refetch();
  }, [refetch]);

  const onRequiredTypeChange = ({ requiredMarkValue }: { requiredMarkValue: RequiredMark }) => {
    setRequiredMarkType(requiredMarkValue);
  };

  const onClickNewTodo = () => {
    setIsTodoModalVisiblle(!isSetTodoModalVisible);
    setHeaderModalLabel('New Todo');
  };

  const onClickEdit = (id: string) =>  {
    setIsTodoModalVisiblle(!isSetTodoModalVisible);
    setHeaderModalLabel('Edit Todo');
    console.log(id, 'todo id');
  };

  const onClickCancel = () => {
    setIsTodoModalVisiblle(!isSetTodoModalVisible);
    setHeaderModalLabel('');
  };

  const onFinish = (values: any) => {
    console.log('Success:', values);
  };

  return (
    <>
      <Container gutter={[0, 40]}>
        <TodoTitleWrapper span={12} offset={6}>
          <Title>Todos</Title>
          <Button onClick={onClickNewTodo} type="primary" shape="round" icon={<PlusOutlined />}>
            New Todo
          </Button>
        </TodoTitleWrapper>
        <Col span={12} offset={6}>
          <TodoListWrapper>
            <Suspense fallback={null}>
              <List
                size="small"
                dataSource={data}
                renderItem={item => (
                  <List.Item
                    actions={[<Button onClick={() => onClickEdit(item.id)} type="link">Edit</Button>, <Button onClick={() => {}} type="link">Delete</Button>]}
                  >
                    <List.Item.Meta
                      title={item.title}
                      description={item.description}
                    />
                  </List.Item>
                )}
              />
            </Suspense>
          </TodoListWrapper>
        </Col>
      </Container>
      <Modal title={headerModalLabel} visible={isSetTodoModalVisible} onCancel={onClickCancel} closable={false} footer={null}>
        <Form
          form={form}
          layout="vertical"
          initialValues={{ requiredMarkValue: requiredMark }}
          onValuesChange={onRequiredTypeChange}
          requiredMark={requiredMark}
          onFinish={onFinish}
        >
          <Form.Item name="title" label="Title" rules={[{ required: true, message: 'Title is required!' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="description" label="Description" rules={[{ required: true, message: 'Description is required!' }]}>
            <Input />
          </Form.Item>
          <ModalButtonWrapper>
            <Col span={24} style={{ textAlign: 'right' }}>
              <Button
                style={{ margin: '0 8px' }}
                onClick={onClickCancel}
              >
                Cancel
              </Button>
              <Button type="primary" htmlType="submit">
                Save
              </Button>
            </Col>
          </ModalButtonWrapper>
        </Form>
      </Modal>
    </>
  );
};

export default App;
