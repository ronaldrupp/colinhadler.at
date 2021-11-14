import React from "react";
import Head from "next/head";
import Footer from "./footer";
import Navigation from "./navigation";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/router";
import * as ga from "../lib/ga";
import { useEffect } from 'react';

const Layout = ({ children, footer, isPreview, navigation }) => {
    const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url) => {
      ga.pageview(url);
    };
    //When the component is mounted, subscribe to router changes
    //and log those page views
    router.events.on("routeChangeComplete", handleRouteChange);

    // If the component is unmounted, unsubscribe
    // from the event with the `off` method
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);
  return (
    <>
      <Head></Head>
      <Navigation data={navigation}></Navigation>
      <main>{children}</main>
      <Footer data={footer}></Footer>
    </>
  );
};

export default Layout;
