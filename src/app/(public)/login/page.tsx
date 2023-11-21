"use client";
import { Fragment, useState, useEffect } from "react";
import "./style.scss";
import request from "@/server";
import { setCookie } from "cookies-next";
import { ECOMMERCE_ROLE, ECOMMERCE_TOKEN } from "@/constants";
import BtnLoading from "@/components/loading/BtnLoading";
import { useAppDispatch } from "@/redux/hooks";
import { setIsAuthenticated, setRole } from "@/redux/slice/authSlice";
import { useRouter } from "next/navigation";

interface LoginType {
  target: {
    name: string;
    value: string;
  };
}

const LoginPage = () => {
  const router = useRouter();
  const [values, setValues] = useState({
    username: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();

  const handleInputChange = (e: LoginType) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const onFinish = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const {
        data: { accesstoken, user },
      } = await request.post("/auth/login", values);
      setCookie(ECOMMERCE_TOKEN, accesstoken);
      setCookie(ECOMMERCE_ROLE, user.role);
      router.push("/admin");
      dispatch(setIsAuthenticated(true));
      dispatch(setRole(user.role));
    } finally {
      setLoading(false);
    }
  };


  return (
    <Fragment>
      <div className="container">
        <div className="row__login">
          <form onSubmit={onFinish}>
            {" "}
            {/* Use onSubmit for form submission */}
            <div className="row__login__username">
              <label>Login</label>
              <input
                name="username"
                type="text"
                value={values.username}
                onChange={handleInputChange}
              />
            </div>
            <div className="row__login__password">
              <label>Parol</label>
              <input
                name="password"
                type="password"
                value={values.password}
                onChange={handleInputChange}
              />
            </div>
            {loading ? <BtnLoading /> : <button type="submit">Sign up</button>}
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default LoginPage;
