import { LaptopOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import { useEffect } from 'react';
import { useLocation, useNavigate, Outlet } from 'react-router-dom';
import Home from '@/pages/Home';
import logo from '@/static/logo.png';
import { menuList } from '../../routers/const';
import './index.less';

const { Header, Content, Sider } = Layout;

const BasicLayout = (props) => {
    const location = useLocation();
    const navigate = useNavigate();
    const { pathname } = window.location;
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    useEffect(() => {
        if (pathname === '' || pathname === '/') {
            navigate(`/`);
        }
    }, [pathname]);
    return (
        <Layout className="layout">
            <Header className="header">
                <div className="logo-ico"></div>
                <div className="logo-text"></div>
            </Header>
            <div className="layout-home">
                <Home />
            </div>

            {/* <Layout>
                {/* <Sider
                    width={200}
                    style={{
                        background: colorBgContainer,
                        overflowY: 'auto',
                    }}
                >

                    <Menu
                        mode="vertical"
                        defaultSelectedKeys={['/index']}
                        items={menuList}
                        onSelect={({ key }) => {
                            navigate(key);
                        }}
                    />
                </Sider> */}
            {/* <Layout
                    style={{
                        padding: '0 24px 24px',
                    }}
                >
                    <Outlet />
                </Layout> */}
            {/* </Layout> */}
        </Layout>
    );
};
export default BasicLayout;
