"use client";
import React, { Fragment, useState, useEffect } from "react";
import childrenType from "@/types/childrenType";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  ShoppingCartOutlined,
  UserOutlined,
  ShoppingOutlined,
  TeamOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Button, theme } from "antd";
import { redirect, usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { useAppSelector } from "@/redux/hooks";
import ROLES from "../../../roles";
import { deleteCookie } from "cookies-next";
import { setIsAuthenticated } from "@/redux/slice/authSlice";
import { ECOMMERCE_ROLE, ECOMMERCE_TOKEN } from "@/constants";

const { Header, Sider, Content } = Layout;
const AdminLayout = ({ children }: childrenType) => {
  const { isAuthenticated, role } = useAppSelector((state) => state.auth);
const router = useRouter()
  useEffect(() => {
    if (!isAuthenticated || ROLES.ADMIN !== role) {
      redirect("/login");
    }
  }, [isAuthenticated, role]);

  function logout() {
    setIsAuthenticated(false);
    deleteCookie(ECOMMERCE_TOKEN);
    deleteCookie(ECOMMERCE_ROLE);
    router.push("/login");
  }

  const [collapsed, setCollapsed] = useState(false);
  const pathName = usePathname();

  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <Fragment>
      <Layout>
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <div className="demo-logo-vertical" />
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={[pathName]}
            items={[
              {
                key: "/admin",
                icon: <UserOutlined />,
                label: <Link href={"/admin"}>Dashboard</Link>,
              },
              {
                key: "/admin/categories",
                icon: <ShoppingOutlined />,
                label: <Link href={"/admin/categories"}>Categories</Link>,
              },
              {
                key: "/admin/products",
                icon: <ShoppingCartOutlined />,
                label: <Link href={"/admin/products"}>Products</Link>,
              },
              {
                key: "/admin/users",
                icon: <TeamOutlined />,
                label: <Link href={"/admin/users"}>Users</Link>,
              },
              {
                key: "Logaut",
                icon: <LogoutOutlined />,
                label: <button onClick={logout}>Logout</button>,
              },
            ]}
          />
        </Sider>
        <Layout>
          <Header style={{ padding: 0, background: colorBgContainer }}>
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: "16px",
                width: 64,
                height: 64,
              }}
            />
          </Header>
          <Content
            style={{
              margin: "24px 16px",
              padding: 24,
              minHeight: 280,
              background: colorBgContainer,
            }}
          >
            {children}
          </Content>
        </Layout>
      </Layout>
    </Fragment>
  );
};

export default AdminLayout;
