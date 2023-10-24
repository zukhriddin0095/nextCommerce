"use client";

import { Button, Form, Input, Modal, Space, Table, Upload, message } from "antd";
import { useState, useEffect, Fragment } from "react";
import {
  EditFilled,
  DeleteFilled,
  AppstoreAddOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { ColumnsType } from "antd/es/table";
import CategoryType from "@/types/category";
import request from "@/server";
import Image from "next/image";


const CategoriesAdmin = () => {
  const [category, setCategory] = useState<CategoryType[] | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false)
    const columns: ColumnsType<CategoryType> = [
      {
        title: "Name",
        dataIndex: "name",
        key: "name",
      },
      {
        title: "Image",
        dataIndex: "image",
        key: "image",
        render: (image) => {
          console.log(image);
          return <Image src={image?.url} alt="category.name" height={50} width={50}/>;
        },
      },
      {
        title: "Action",
        key: "action",
        render: (_, record) => (
          <Space size="middle">
            <button className="edit-btn">
              <EditFilled />
            </button>
            <button className="delete-btn">
              <DeleteFilled />
            </button>
          </Space>
        ),
      },
    ];



  useEffect(() => {getCategory();}, []);

  async function getCategory() {
    setLoading(true)
    try {
      const { data } = await request.get("category");
      setCategory(data);
    } catch (error) {
      message.error("serverda hatolik");
    } finally {
      setLoading(false)
    }
  }

  function openModal() {
    setIsModalOpen(true);
  }
  function closeModal() {
    setIsModalOpen(false);
  }


  return (
    <Fragment>
      <Fragment>
        <Table
        loading={loading}
          scroll={{ x: 500 }}
          bordered
          columns={columns}
          dataSource={category as readonly CategoryType[]}
          title={() => (
            <div className="outlet">
              <h1>Categories ({category?.length})</h1>
              <Input style={{ width: "50%" }} placeholder="Search . . ." />
              <button onClick={openModal}>
                <AppstoreAddOutlined />
              </button>
            </div>
          )}
        />
        <Modal>
          <Form
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
              <Input />
            </Form.Item>
            <Form.Item
              label="Phone Number"
              name="phoneNumber"
              rules={[{ required: true, message: "Please Fill" }]}
            >
              <Input />
            </Form.Item>
            <Upload>
              <Button icon={<UploadOutlined />}>Click to Upload Photo</Button>
            </Upload>
          </Form>
        </Modal>
      </Fragment>
    </Fragment>
  );
};

export default CategoriesAdmin;
