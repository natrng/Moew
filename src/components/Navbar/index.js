import React from "react";

import { Layout, Menu } from "antd";

const NavBar = () => {
  return (
    <>
      <Menu mode="horizontal" theme="light" inlineIndent="2">
        <Menu.Item  key="1">nav 1</Menu.Item>
        <Menu.Item key="2">nav 2</Menu.Item>
        <Menu.Item key="3">nav 3</Menu.Item>
      </Menu>
    </>
  );
};

export default NavBar;