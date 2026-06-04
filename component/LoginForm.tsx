"use client";

import { Form, Input, Button, Card, Typography, message } from "antd";
import { useRouter } from "next/navigation";
import { login } from "@/lib/auth";

const { Title } = Typography;

export default function LoginForm() {
  const router = useRouter();

  const onFinish = (values: any) => {
    const user = login(values.email, values.password);

    if (!user) {
      message.error("Invalid credentials");
      return;
    }

    localStorage.setItem("user", JSON.stringify(user));

    message.success("Login successful");

    router.push("/dashboard");
  };

  return (
    <Card style={{ width: 380, margin: "auto" }}>
      <Title level={3} style={{ textAlign: "center" }}>
        Login
      </Title>

      <Form layout="vertical" onFinish={onFinish}>
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: "Enter email" }]}
        >
          <Input placeholder="admin@test.com" />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Enter password" }]}
        >
          <Input.Password placeholder="123456" />
        </Form.Item>

        <Button type="primary" htmlType="submit" block>
          Login
        </Button>
      </Form>
    </Card>
  );
}