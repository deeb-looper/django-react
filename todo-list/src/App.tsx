import React, { useState, useEffect, useCallback, Suspense } from 'react';
import { useQuery, useMutation } from 'react-query';
import styled from 'styled-components';
import { PlusOutlined } from '@ant-design/icons';
import { Row, Col, Typography, List, Button, Modal, Form, Input } from 'antd';
import { Todo, TodoParams } from '../common/domain/entities/todo';
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
  const [todos, setTodos] = useState<Todo[]>([]);
  const [editTodoId, setEditTodoId] = useState<string>('');
  const [deleteTodoId, setDeleteTodoId] = useState<string>('');

  const { fetchTodos, addTodo, updateTodo, deleteTodo } = useTodoAction();

  const { refetch } = useQuery(
    `todos`,
    () => fetchTodos(),
    {
      enabled: false,
      onSuccess: (data: Todo[]) => {
        setTodos(data && data.length > 0 ? data : []);
      },
      onError: (error) => {
        console.log(error, 'fetch error');
      },
    },
  );

  const { mutate: addTodoMutate } = useMutation((todo: TodoParams) => addTodo(todo), {
    onSuccess: (todo: Todo | null) => {
      if (todo) {
        setTodos((prevTodo) => [
          ...prevTodo,
          todo,
        ]);
        onClickCancel();
      }
    },
    onError: (error) => {
      onClickCancel();
      console.log(error);
    },
  });

  const { mutate: updateTodoMutate } = useMutation(({ id, todo }: { id: string, todo: TodoParams }) => updateTodo(id, todo), {
    onSuccess: (todo: Todo | null) => {
      const filteredTodo = todos.filter(item => item.id !== editTodoId);
      if (todo) {
        setTodos([
          ...filteredTodo,
          todo,
        ]);
      }
      onClickCancel();
    },
    onError: (error) => {
      onClickCancel();
      console.log(error);
    },
  })

  const { mutate: deleteTodoMutate } = useMutation((id: string) => deleteTodo(id), {
    onSuccess: () => {
      const filteredTodo = todos.filter(item => item.id !== deleteTodoId);
      setTodos(filteredTodo);
      onClickCancelDelete();
    },
    onError: (error) => {
      onClickCancelDelete();
      console.log(error);
    },
  })

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

  const onClickEdit = (todo: Todo) =>  {
    setIsTodoModalVisiblle(!isSetTodoModalVisible);
    setHeaderModalLabel('Edit Todo');
    setEditTodoId(todo.id);
    form.setFieldsValue({ title: todo.title, description: todo.description });
  };

  const onClickDelete = (id: string) => {
    setDeleteTodoId(id);
  };

  const onClickCancelDelete = () => {
    setDeleteTodoId('');
  };
  
  const onClickCancel = () => {
    setIsTodoModalVisiblle(!isSetTodoModalVisible);
    setHeaderModalLabel('');
    setEditTodoId('');
    form.resetFields();
  };

  const onConfirmDelete = useCallback(() => {
    deleteTodoMutate(deleteTodoId);
    onClickCancelDelete();
  }, [deleteTodoId, deleteTodoMutate]);

  const onFinish = useCallback(
    (values: TodoParams) => {
      if (editTodoId) {
        updateTodoMutate({ id: editTodoId, todo: values })
      } else {
        addTodoMutate(values);
      }
    },
    [addTodoMutate, editTodoId, updateTodoMutate],
  );

  const filteredTodos = [...todos].sort((a, b) => {
    return parseInt(b.id) - parseInt(a.id);
  });

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
                dataSource={filteredTodos}
                renderItem={item => (
                  <List.Item
                    actions={[
                      <Button onClick={() => onClickEdit(item)} type="link">Edit</Button>,
                      <Button onClick={() => onClickDelete(item.id)} type="link">Delete</Button>
                    ]}
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
      <Modal visible={!!deleteTodoId} onOk={() => {}} onCancel={onClickCancelDelete} closable={false} footer={null}>
        <Row>
          <Col span={24}>
            <Title level={5}>
              Are you sure you want to delete this todo?
            </Title>
          </Col>
        </Row>
        <ModalButtonWrapper>
          <Col span={24} style={{ textAlign: 'right' }}>
            <Button
              style={{ margin: '0 8px' }}
              onClick={onClickCancelDelete}
            >
              Cancel
            </Button>
            <Button onClick={onConfirmDelete} type="primary" danger>
              Delete
            </Button>
          </Col>
        </ModalButtonWrapper>
      </Modal>
    </>
  );
};

export default App;
