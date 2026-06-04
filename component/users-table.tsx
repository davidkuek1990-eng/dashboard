"use client";

import { useEffect, useState } from "react";
import {
    Table,
    Card,
    Tag,
    Input,
    Button,
    Modal,
    Form,
    message,
    Space,
} from "antd";

import {
    UserAddOutlined,
    DeleteOutlined,
    EditOutlined,
} from "@ant-design/icons";

import initialUsers from "@/data/users.json";

export default function UsersTable() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingUser, setEditingUser] = useState<any>(null);

    const [form] = Form.useForm();

    useEffect(() => {
        fetchUsers()
    }, [])

    const fetchUsers = async () => {
        setLoading(true);

        const res = await fetch("/api/users");
        const data = await res.json();

        setUsers(data);
        setLoading(false);
    };

    // FILTER
    const filteredUsers = (users || []).filter((user: any) => {
        return (
            user?.name?.toLowerCase().includes(search.toLowerCase()) ||
            user?.email?.toLowerCase().includes(search.toLowerCase())
        );
    });

    // OPEN ADD MODAL
    const openAddModal = () => {
        setEditingUser(null);
        form.resetFields();
        setIsModalOpen(true);
    };

    // OPEN EDIT MODAL
    const openEditModal = (user: any) => {
        setEditingUser(user);

        form.setFieldsValue({
            name: user.name,
            email: user.email,
            role: user.role,
            status: user.status,
        });

        setIsModalOpen(true);
    };
    const handleSubmit = (values: any) => {
        if (editingUser) {
            handleUpdateUser(values);
        } else {
            handleAddUser(values);
        }
    };

    const handleAddUser = async (values: any) => {
        await fetch("/api/users", {
            method: "POST",
            body: JSON.stringify(values),
        });

        message.success("User added");
        setIsModalOpen(false);
        form.resetFields();

        fetchUsers();
    };


    const handleUpdateUser = async (values: any) => {
        await fetch("/api/users", {
            method: "PUT",
            body: JSON.stringify({
                id: editingUser.id,
                ...values,
            }),
        });

        message.success("User updated");
        setIsModalOpen(false);
        setEditingUser(null);

        fetchUsers();
    };

    const handleDelete = async (id: number) => {
        await fetch("/api/users", {
            method: "DELETE",
            body: JSON.stringify({ id }),
        });

        message.success("User deleted");

        fetchUsers();
    };

    const columns = [
        {
            title: "Name",
            dataIndex: "name",
        },
        {
            title: "Email",
            dataIndex: "email",
        },
        {
            title: "Role",
            dataIndex: "role",
            render: (role: string) => (
                <Tag color={role === "admin" ? "red" : "blue"}>
                    {role.toUpperCase()}
                </Tag>
            ),
        },
        {
            title: "Status",
            dataIndex: "status",
            render: (status: string) => (
                <Tag color={status === "active" ? "green" : "default"}>
                    {status.toUpperCase()}
                </Tag>
            ),
        },
        {
            title: "Action",
            render: (_: any, record: any) => (
                <Space>
                    <Button
                        icon={<EditOutlined />}
                        onClick={() => openEditModal(record)}
                    />

                    <Button
                        danger
                        icon={<DeleteOutlined />}
                        onClick={() => handleDelete(record.id)}
                    />
                </Space>
            ),
        },
    ];

    return (
        <Card
            title="Users Management"
            style={{ borderRadius: 12 }}
            extra={
                <div style={{ display: "flex", gap: 10 }}>
                    <Input
                        placeholder="Search users..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        style={{ width: 220 }}
                    />

                    <Button
                        type="primary"
                        icon={<UserAddOutlined />}
                        onClick={openAddModal}
                    >
                        Add User
                    </Button>
                </div>
            }
        >
            <Table
                dataSource={filteredUsers}
                columns={columns}
                rowKey="id"
                pagination={{ pageSize: 5 }}
            />

            {/* ADD / EDIT MODAL */}
            <Modal
                title={editingUser ? "Edit User" : "Add User"}
                open={isModalOpen}
                onCancel={() => setIsModalOpen(false)}
                footer={null}
                destroyOnHidden
            >
                <Form layout="vertical" form={form} onFinish={handleSubmit}>
                    <Form.Item
                        label="Name"
                        name="name"
                        rules={[{ required: true }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[{ required: true }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Role"
                        name="role"
                        rules={[{ required: true }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Status"
                        name="status"
                        rules={[{ required: true }]}
                    >
                        <Input />
                    </Form.Item>

                    <Button type="primary" htmlType="submit" block>
                        {editingUser ? "Update User" : "Create User"}
                    </Button>
                </Form>
            </Modal>
        </Card>
    );
}