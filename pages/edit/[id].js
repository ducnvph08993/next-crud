import React from "react";
import { Form, Input, InputNumber, Button, Typography } from 'antd';
import { useDispatch } from "react-redux";
import { editStudent } from "../../redux/actions";
import apiRequest from '../api/productApi';
import { useRouter } from "next/router";

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

const EditStudent = ({ student }) => {
    const dispatch = useDispatch();
    const id = student.id;
    const router = useRouter()

    const onHandleEdit = async (newProduct) => {
        try {
            const newStudent = {
                id,
                ...newProduct
            };

            const { data } = await apiRequest.update(newStudent.id, newStudent);

            const action = editStudent(data);

            dispatch(action);

            router.push("/");
        } catch (error) {
            console.log('You have an error', error)
        }
    }
    return (
        <div className="add-form">
            <Title id="title" style={{ textAlign: "center" }}>Edit-Student</Title>
            <Form {...layout} name="nest-messages" onFinish={onHandleEdit} validateMessages={validateMessages}>
                <Form.Item
                    name="name"
                    label="Name"
                    initialValue={student.name}
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
                    initialValue={student.age}
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
                    initialValue={student.address}
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

EditStudent.getInitialProps = async (ctx) => {
    const { id } = ctx.query;
    const res = await fetch(`https://5f5ee4c3df620f00163e504c.mockapi.io/student/${id}`);
    const json = await res.json();
    return { student: json }
}

export default EditStudent;
