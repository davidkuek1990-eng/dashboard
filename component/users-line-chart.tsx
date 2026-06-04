"use client";

import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid,
} from "recharts";

import { Card } from "antd";
import chartData from "@/data/chart-data.json";

export default function UsersLineChart() {
    return (
        <Card title="User Growth (7 Days)" style={{ borderRadius: 12 }}>
            <div style={{ width: "100%", height: 300 }}>
                <ResponsiveContainer>
                    <LineChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" />

                        <XAxis dataKey="name" />
                        <YAxis />

                        <Tooltip />

                        <Line
                            type="monotone"
                            dataKey="users"
                            stroke="#1677ff"
                            strokeWidth={3}
                            dot={{ r: 4 }}
                            activeDot={{ r: 6 }}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </Card>
    );
}