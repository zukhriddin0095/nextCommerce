"use client";

import { Fragment, useEffect, useState } from "react";
import { Space, Table, message } from "antd";
import { ColumnsType } from "antd/es/table";
import { EditFilled, DeleteFilled } from "@ant-design/icons";
import UsersType from "@/types/UsersType";
import request from "@/server";

const UsersAdmin = () => {
  const [user, setUser] = useState<UsersType[] | null>(null);
  const [loading, setLoading] = useState(false);

  const columns: ColumnsType<UsersType> = [
    {
      title: "First Name",
      dataIndex: "firstName",
      key: "firstName",
      render: (text) => <a>{text}</a>,
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
          <button>
            <EditFilled />
          </button>
          <button>
            <DeleteFilled />
          </button>
        </Space>
      ),
    },
  ];

  useEffect(() => {
    async function getUsers() {
      setLoading(true);
      try {
        const { data } = await request.get("user");
        setUser(data);
      } catch (error) {
        message.error("serverda hatolik");
      }finally{
      setLoading(false)
      }
    }
    getUsers();
  }, []);

  console.log(user);

  return (
    <Fragment>
      <Table loading={loading}  columns={columns} dataSource={user as readonly UsersType[]} />
    </Fragment>
  );
};

export default UsersAdmin;
