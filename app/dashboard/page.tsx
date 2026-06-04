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

import ThemeToggle from '@/component/theme-toggle'
import StatsCards from '@/component/state-cards'
import UsersLineChart from '@/component/users-line-chart'
import UsersTable from '@/component/users-table'
const { Header, Sider, Content } = Layout;
const { Title } = Typography;

export default function DashboardPage() {
    const router = useRouter();

    const [user, setUser] = useState<any>(null);
    const [collapsed, setCollapsed] = useState(false);

    // AUTH CHECK
    useEffect(() => {
        const data = localStorage.getItem("user");

        if (!data) {
            router.push("/login");
            return;
        }

        setUser(JSON.parse(data));
    }, [router]);

    // LOGOUT
    const logout = () => {
        localStorage.removeItem("user");
        message.success("Logged out");
        router.push("/login");
    };

    return (
        <Layout style={{ minHeight: "100vh" }}>
            {/* SIDEBAR */}
            <Sider
                collapsible
                collapsed={collapsed}
                trigger={null}
                width={220}
                collapsedWidth={80}
                style={{
                    transition: "all 0.2s ease",
                }}
            >
                {/* LOGO */}
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
                {/* HEADER */}
                <Header
                    style={{
                        background: "#fff",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        padding: "0 16px",
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

                        <Title level={4} style={{ margin: 0 }}>
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

                {/* CONTENT (FIXED FULL WIDTH) */}
                <Content
                    style={{
                        margin: 16,
                        padding: 24,
                        minHeight: "calc(100vh - 64px)",
                        background: "#f5f5f5",
                        overflow: "auto",
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