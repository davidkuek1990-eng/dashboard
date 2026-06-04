"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
    Layout,
    Menu,
    Button,
    Card,
    Typography,
    message,
} from "antd";

import {
    DashboardOutlined,
    UserOutlined,
    LogoutOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
} from "@ant-design/icons";
import { Grid } from "antd";

import ThemeToggle from '@/component/theme-toggle'
import StatsCards from '@/component/state-cards'
import UsersLineChart from '@/component/users-line-chart'
import UsersTable from '@/component/users-table'
const { Header, Sider, Content } = Layout;
const { Title } = Typography;
const { useBreakpoint } = Grid;


export default function DashboardPage() {
    const router = useRouter();

    const [user, setUser] = useState<any>(null);
    const [collapsed, setCollapsed] = useState(false);

    const screens = useBreakpoint();
    const isMobile = !screens.md;

    // AUTH CHECK
    useEffect(() => {
        const user = localStorage.getItem("user");

        if (!user) {
            router.push("/login");
        }
    }, []);

    // LOGOUT
    const logout = () => {
        localStorage.removeItem("user");
        router.push("/login");
    };
    return (
        <Layout style={{ minHeight: "100vh" }}>
            <Sider
                collapsible
                collapsed={isMobile ? true : collapsed}
                trigger={null}
                width={220}
                collapsedWidth={isMobile ? 0 : 80}
            >
                <div
                    style={{
                        color: "white",
                        padding: 16,
                        fontSize: collapsed ? 14 : 18,
                        fontWeight: "bold",
                        textAlign: collapsed ? "center" : "left",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                    }}
                >
                    {collapsed ? "AP" : "Admin Panel"}
                </div>

                {/* MENU */}
                <Menu
                    theme="dark"
                    mode="inline"
                    defaultSelectedKeys={["1"]}
                    items={[
                        {
                            key: "1",
                            icon: <DashboardOutlined />,
                            label: "Dashboard",
                        },
                        {
                            key: "2",
                            icon: <UserOutlined />,
                            label: "Users",
                        },
                    ]}
                />
            </Sider>

            {/* RIGHT SIDE LAYOUT */}
            <Layout style={{ minHeight: "100vh" }}>
                <Header
                    style={{
                        background: "var(--ant-color-bg-container)",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        padding: isMobile ? "0 8px" : "0 16px",
                        borderBottom: "1px solid var(--ant-color-border)",
                    }}
                >
                    {/* LEFT HEADER */}
                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                        <Button
                            type="text"
                            icon={
                                collapsed ? (
                                    <MenuUnfoldOutlined />
                                ) : (
                                    <MenuFoldOutlined />
                                )
                            }
                            onClick={() => setCollapsed(!collapsed)}
                        />

                        <Title level={isMobile ? 5 : 4} style={{
                            margin: 0,
                            color: "var(--ant-color-text)",
                        }}>
                            Dashboard
                        </Title>
                    </div>

                    {/* RIGHT HEADER */}
                    <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
                        <ThemeToggle />

                        <Button
                            danger
                            icon={<LogoutOutlined />}
                            onClick={logout}
                        >
                            Logout
                        </Button>
                    </div>
                </Header>

                <Content
                    style={{
                        margin: isMobile ? 8 : 16,
                        padding: isMobile ? 12 : 24,
                        background: "var(--ant-color-bg-layout)",
                        minHeight: "calc(100vh - 64px)",
                        overflowX: "auto",
                    }}
                >
                    <StatsCards />

                    <div style={{ marginTop: 16 }} />

                    <UsersLineChart />

                    <div style={{ marginTop: 16 }} />

                    <UsersTable />

                    {/* <Card>
                        Welcome content here
                    </Card> */}
                </Content>
            </Layout>
        </Layout>
    );
}