"use client";

import { Form, Input, Button, Card, Typography, message } from "antd";
import { useRouter } from "next/navigation";

const { Title } = Typography;

export default function LoginForm() {
  const router = useRouter();

  const onFinish = async (values: any) => {
    const res = await fetch("/api/login", {
      method: "POST",
      body: JSON.stringify(values),
    });

    if (!res.ok) {
      message.error("Invalid credentials");
      return;
    }

    const user = await res.json();

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
      test account email: test@test.com <br />
      password: 123456
    </Card>
  );
}