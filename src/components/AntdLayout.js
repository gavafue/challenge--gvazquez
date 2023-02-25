import { Layout, Menu } from "antd";
import Link from "next/link";
import styles from "../styles/navbar.module.css";
const { Header, Content, Footer } = Layout;
const AntdLayout = ({ children }) => {
  return (
    <Layout className="layout">
      <Header>
        <div className={styles.title}>Gavafue - Free Market</div>
      </Header>
      <Content
        style={{
          padding: "0 50px",
        }}
      >
        <div className="site-layout-content">{children}</div>
      </Content>
      <Footer
        style={{
          textAlign: "center",
        }}
      >
        <Link href="https://github.com/gavafue">@Gavafue</Link> creator of the
        content.
      </Footer>
    </Layout>
  );
};
export default AntdLayout;
