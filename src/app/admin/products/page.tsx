"use client";
import { Fragment, useEffect, useState } from "react";
import {
  Button,
  Form,
  Input,
  Modal,
  Pagination,
  Select,
  Space,
  Table,
  Upload,
} from "antd";
import {
  EditFilled,
  DeleteFilled,
  AppstoreAddOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import ProductType from "@/types/product";
import { ColumnsType } from "antd/es/table";
import request from "@/server";
import CategoryType from "@/types/category";
import Image from "next/image";

import "./style.scss";
const ProductsAdmin = () => {
  const { Option } = Select;
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [products, setProducts] = useState<ProductType[] | null>(null);
  const [categories, setCategories] = useState<CategoryType[] | null>(null);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [photo, setPhoto] = useState(null);

  const columns: ColumnsType<ProductType> = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Quentity",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      render: (category) => {
        return category?.name;
      },
    },
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (image) => {
        return (
          <Image src={image?.url} alt="category.name" height={50} width={50} />
        );
      },
    },
    {
      title: "Action",
      key: "action",
      render: () => (
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

  useEffect(() => {
    getProducts();
    getCategories();
  }, [page]);

  async function getProducts() {
    try {
      setLoading(true);
      const {
        data: { total, products },
      } = await request.get(`product?page=${page}`);
      setProducts(products);
      setTotal(total);
    } finally {
      setLoading(false);
    }
  }

  async function getCategories() {
    setLoading(true);
    try {
      const { data } = await request.get("category");
      setCategories(data);
    } finally {
      setLoading(false);
    }
  }

  async function uploadImage(e: any) {
    try {
      let form = new FormData();
      form.append("file", e.file.originFileObj);
      let { data } = await request.post("upload", form);
      setPhoto(data);
    } catch (err) {
      console.log(err);
    }
  }

  async function handleOk() {
    setLoading(true);
    try {
      let values = await form.validateFields();
      let User = { ...values, image: photo };
      console.log(User);
      await request.post("product", User);
      getProducts();
      closeModal();
    } finally {
      setLoading(false);
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
      <Table
        loading={loading}
        scroll={{ x: 500 }}
        bordered
        columns={columns}
        pagination={false}
        dataSource={products as readonly ProductType[]}
        title={() => (
          <div className="outlet">
            <h1>Products ({total})</h1>
            <Input style={{ width: "50%" }} placeholder="Search . . ." />
            <button onClick={openModal}>
              <AppstoreAddOutlined />
            </button>
          </div>
        )}
      />
      <Modal open={isModalOpen} onOk={handleOk} onCancel={closeModal}>
        <Form
          form={form}
          name="Product"
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
            label="Title"
            name="title"
            rules={[{ required: true, message: "Please Fill" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Price"
            name="price"
            rules={[{ required: true, message: "Please Fill" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Description"
            name="description"
            rules={[{ required: true, message: "Please Fill" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Quantity"
            name="quantity"
            rules={[{ required: true, message: "Please Fill" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Category"
            name="category"
            hasFeedback
            rules={[{ required: true, message: "Please select your country!" }]}
          >
            <Select
              placeholder="Please select a category"
              onChange={(value) => form.setFieldsValue({ category: value })}
            >
              {categories?.map((category) => (
                <Option key={category._id} value={category._id}>
                  {category.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Upload onChange={uploadImage} listType="picture" maxCount={1}>
            <Button icon={<UploadOutlined />}>Click to Upload Photo</Button>
          </Upload>
        </Form>
      </Modal>
      <Pagination
        total={total}
        current={page}
        onChange={(page) => setPage(page)}
      />
    </Fragment>
  );
};

export default ProductsAdmin;
