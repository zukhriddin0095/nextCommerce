"use client";

import { Fragment, useEffect, useState } from "react";
import { Form, Input, Modal, Space, Table, message } from "antd";
import { ColumnsType } from "antd/es/table";
import {
  EditFilled,
  DeleteFilled,
  AppstoreAddOutlined,
} from "@ant-design/icons";
import UsersType from "@/types/UsersType";
import request from "@/server";


import "./style.scss"
const UsersAdmin = () => {
  const [form] = Form.useForm();
  const [user, setUser] = useState<UsersType[] | null>(null);
  const [selected, setSelected] = useState<string | number | null>(null);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("")
  
  const columns: ColumnsType<UsersType> = [
    {
      title: "First Name",
      dataIndex: "firstName",
      key: "firstName",
      render: (text) => <a>{text}</a>,
      filteredValue: [searchQuery],
      onFilter: (value, record) => {
        
        return (
          record.firstName
            .toLowerCase()
            .includes(value.toString().toLowerCase()) || 
          record.lastName.toLowerCase().includes(value.toString().toLowerCase())
        );
      },
    },
    {
      title: "Last Name",
      dataIndex: "lastName",
      key: "lastName",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "Phone Number",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <button className="edit-btn" onClick={() => editUsers(record._id)}>
            <EditFilled />
          </button>
          <button
            className="delete-btn"
            onClick={() => deleteUsers(record._id)}
          >
            <DeleteFilled />
          </button>
        </Space>
      ),
    },
  ];

  useEffect(() => {
    getUsers();
  }, []);

  async function getUsers() {
    setLoading(true);
    try {
      const { data } = await request.get("user");
      setUser(data);
    } catch (error) {
      message.error("serverda hatolik");
    } finally {
      setLoading(false);
    }
  }

  async function handleOk() {
    try {
      setLoading(true);
      let values = await form.validateFields();
      if(selected === null){
        await request.post("user", values);
      }else {
        await request.put(`user/${selected}`, values)
      }
      getUsers();
      closeModal();
      message.success("succes");
    } finally {
      setLoading(false);
    }
  }

  function openModal() {
    setIsModalOpen(true);
    form.resetFields();
  }
  function closeModal() {
    setIsModalOpen(false);
  }
  async function editUsers(id: string | number) {
    setSelected(id);
    setIsModalOpen(true);
    const { data } = await request.get(`user/${id}`);
    form.setFieldsValue(data);
  }

  async function deleteUsers(id: string | number) {
    if (confirm("O'chirishni tasdiqlaysizmi?")) {
      await request.delete(`user/${id}`);
      getUsers();
      message.success("// O'chirildi");
    }
  }
  return (
    <Fragment>
      <Table
        scroll={{ x: 500 }}
        bordered
        loading={loading}
        columns={columns}
        dataSource={user as readonly UsersType[]}
        title={() => (
          <div className="outlet">
            <h1>Users ({user?.length})</h1>
            <Input onChange={(e) => setSearchQuery(e.target.value)} style={{width: "50%"}} placeholder="Search . . ."/>
            <button onClick={openModal}>
              <AppstoreAddOutlined />
            </button>
          </div>
        )}
      />
      <Modal
        title={selected ? "Save Portfolio" : "Add portfolio"}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={closeModal}
      >
        <Form
          form={form}
          name="Users"
          labelCol={{
            span: 24,
          }}
          wrapperCol={{
            span: 24,
          }}
          style={{
            maxWidth: 600,
          }}
          autoComplete="off"
        >
          <Form.Item
            label="First Name"
            name="firstName"
            rules={[{ required: true, message: "Please Fill" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Last Name"
            name="lastName"
            rules={[{ required: true, message: "Please Fill" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: "Please Fill" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please Fill" }]}
          >
            <Input  />
          </Form.Item>
          <Form.Item
            label="Phone Number"
            name="phoneNumber"
            rules={[{ required: true, message: "Please Fill" }]}
          >
            <Input  />
          </Form.Item>
          {/* <Upload>
            <Button icon={<UploadOutlined />}>Click to Upload Photo</Button>
          </Upload> */}
        </Form>
      </Modal>
    </Fragment>
  );
};

export default UsersAdmin;
