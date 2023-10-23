import { Fragment } from "react";
import childrenType from "@/types/childrenType";
import PublicHeader from "@/components/header/publicHeader/PublicHeader";
import PublicFooter from "@/components/footer/publicFooter/PublicFooter";


const PublicLayout = ({ children }: childrenType) => {
  return (
    <Fragment>
      <PublicHeader />
      <main>{children}</main>
      <PublicFooter />
    </Fragment>
  );
};

export default PublicLayout;
