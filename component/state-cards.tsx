"use client";

import { Card, Col, Row } from "antd";
import {
    UserOutlined,
    ThunderboltOutlined,
    DollarOutlined,
    ShoppingCartOutlined,
} from "@ant-design/icons";

import stats from "@/data/stats.json";

export default function StatsCards() {
    const items = [
        {
            title: "Users",
            value: stats.users,
            icon: <UserOutlined />,
            color: "#1677ff",
        },
        {
            title: "Active Sessions",
            value: stats.activeSessions,
            icon: <ThunderboltOutlined />,
            color: "#52c41a",
        },
        {
            title: "Revenue",
            value: `$${stats.revenue}`,
            icon: <DollarOutlined />,
            color: "#faad14",
        },
        {
            title: "Orders",
            value: stats.orders,
            icon: <ShoppingCartOutlined />,
            color: "#eb2f96",
        },
    ];

    return (
        <Row gutter={16}>
            {items.map((item, index) => (
                <Col xs={24} sm={12} md={12} lg={6} key={index}>
                    <Card
                        style={{
                            background: "var(--ant-color-bg-container)",
                            borderRadius: 12,
                        }}
                    >
                        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                            <div
                                style={{
                                    fontSize: 24,
                                    color: item.color,
                                }}
                            >
                                {item.icon}
                            </div>

                            <div>
                                <div style={{ fontSize: 14, color: "#888" }}>
                                    {item.title}
                                </div>

                                <div style={{ fontSize: 22, fontWeight: 600 }}>
                                    {item.value}
                                </div>
                            </div>
                        </div>
                    </Card>
                </Col>
            ))}
        </Row>
    );
}