"use client";

import NavLink from "@/components/shared/NavLink";
import { useEffect, useState } from "react";

import logo from "@/assets/logo.png";
import shopping from "@/assets/shopping.png";
import Image from "next/image";
import Link from "next/link";

import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";

import "./style.scss";
const PublicHeader = () => {
  const [header, setHeader] = useState(false);
  const [toggle, setToggle] = useState(false);

  useEffect(() => {
    function handleScroll() {
      if (window.scrollY >= 80) {
        setHeader(true);
      } else {
        setHeader(false);
      }
    }
    window.addEventListener("scroll", handleScroll);
  }, []);

  function handletoggle() {
    setToggle(true);
  }
  function handleClose() {
    setToggle(false);
  }

  return (
    <header className={header ? "headerActive" : "header"}>
      <div className="container">
        <nav className="header__navbar">
          <div className="header__navbar__logo">
            <Link href={`/`}>
              <Image src={logo} alt="logo" />
            </Link>
          </div>
          <div className="header__navbar__link">
            <NavLink href="/">Home</NavLink>
            <NavLink href="/products">Products</NavLink>
            <NavLink href="/about">About</NavLink>
            <NavLink href="/contact">Contact</NavLink>
            <div className="header__navbar__link__btn">
              <button>
                <Image src={shopping} alt="shopping" />
              </button>
            </div>
          </div>
          <div className="toggle">
            <button onClick={handletoggle}>
              {toggle ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            </button>
          </div>
        </nav>
      </div>
      <div className="container">
        <nav className={toggle ? "block__toggle" : "none__toggle"}>
          <div className="block__toggle__close">
            <button onClick={handleClose}>
              <MenuFoldOutlined />
            </button>
          </div>
          <div className="block__toggle__menu">
            <span>
              {" "}
              <Link href="/">Home</Link>
            </span>
            <span>
              <Link href="/products">Products</Link>
            </span>
            <span>
              <Link href="/about">About</Link>
            </span>
            <span>
              <Link href="/contact">Contact</Link>
            </span>
            <button>
              <Image src={shopping} alt="shopping" />
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default PublicHeader;
