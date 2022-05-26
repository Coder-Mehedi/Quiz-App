import React, { ReactNode } from 'react';
import {
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import { Layout as AntLayout, Menu } from 'antd';
const { Header, Content, Footer, Sider } = AntLayout;

interface Props {
  children: ReactNode;
}
const Layout = ({ children }: Props) => (
  <AntLayout>
    <AntLayout>
      <Header
        className='site-layout-sub-header-background'
        style={{
          padding: 0,
          color: '#fff',
          paddingLeft: 40,
          fontSize: '1.2rem',
        }}
      >
        Quiz App
      </Header>
      <Content
        style={{
          margin: '24px 16px 0',
        }}
      >
        <div
          className='site-layout-background'
          style={{
            padding: 24,
            minHeight: 360,
          }}
        >
          {children}
        </div>
      </Content>
    </AntLayout>
  </AntLayout>
);

export default Layout;
