import React from "react";
import { Form, Input, InputNumber, Button, Typography } from 'antd';
import { useDispatch } from "react-redux";
import { addStudent } from "../redux/actions";
import apiRequest from './api/productApi';
import { useRouter } from "next/router";
import "../styles/antd.less";

const { Title } = Typography

const layout = {
    labelCol: {
        span: 6,
    },
    wrapperCol: {
        span: 12,
    }
};

const validateMessages = {
    required: '${label} is required!',
    types: {
        number: '${label} is not validate number',
    },
};

const AddEmployee = (props) => {
    const dispatch = useDispatch();

    const router = useRouter()

    const onHandleAdd = async (product) => {
        try {
            const newStudent = {
                ...product,
            };

            const { data } = await apiRequest.create(newStudent);

            const action = addStudent(data);

            dispatch(action);

            router.push("/");
        } catch (error) {
            console.log('You have an error', error)
        }
    }
    return (
        <div className="add-form">
            <Title id="title" style={{ textAlign: "center" }}>Add-Student</Title>
            <Form {...layout} name="nest-messages" onFinish={onHandleAdd} validateMessages={validateMessages}>
                <Form.Item
                    name="name"
                    label="Name"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="age"
                    label="Age"
                    rules={[
                        {
                            type: 'number',
                        },
                    ]}
                >
                    <InputNumber />
                </Form.Item>
                <Form.Item
                    name="address"
                    label="Address"
                >
                    <Input />
                </Form.Item>
                <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 10 }}>
                    <Button type="primary" htmlType="submit" >
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

AddEmployee.propTypes = {};

export default AddEmployee;
