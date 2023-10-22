import { Fragment } from "react"
import logo from "@/assets/logo.png";
import logof from "@/assets/logo__footer.png";
import Image from "next/image";
import Link from "next/link";
import {
  GithubOutlined,
  LinkedinOutlined,
  InstagramOutlined,
  TwitterOutlined,
} from "@ant-design/icons";



import "./style.scss"
const PublicFooter = () => {
  return (
    <Fragment>
      <div className="container">
        <div className="wrapper__footer">
          <div className="wrapper__footer__logo">
            <Image src={logo} alt="logo" />
            <Image className="logof" src={logof} alt="logo" />
          </div>
          <div className="wrapper__footer__contact">
            <h5>Позвоните нам</h5>
            <Link href="">+998886456868</Link>
            <Link href="">+998886456868</Link>
            <h5>Адрес</h5>
            <Link href="">г.Ташкент, улица Бобура</Link>
            <h5>E-mail</h5>
            <Link href="mail:to">Nurmatovzukhriddin4@gmail.com</Link>
          </div>
          <div className="wrapper__footer__social">
            <Link href="https://github.com/zukhriddin0095">
              <GithubOutlined />
            </Link>
            <Link href="https://github.com/zukhriddin0095">
              <LinkedinOutlined />
            </Link>
            <Link href="https://github.com/zukhriddin0095">
              <InstagramOutlined />
            </Link>
            <Link href="https://github.com/zukhriddin0095">
              <TwitterOutlined />
            </Link>
          </div>
        </div>
        <div className="footer__title">
          <h5>React N13 Group and N13 Design Community</h5>
        </div>
      </div>
    </Fragment>
  );
}

export default PublicFooter