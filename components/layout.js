import React from "react";
import Head from "next/head";
import Footer from "./footer";
import Navigation from "./navigation";

const Layout = ({ children, footer, isPreview, navigation }) => {
  return (
    <>
      <Head>
      </Head>
      <Navigation data={navigation}></Navigation>
      <main>{children}</main>
      <Footer data={footer}></Footer>
    </>
  );
};

export default Layout;
