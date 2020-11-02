import React from 'react'
import { Table, Space } from 'antd';
import "../styles/antd.less";

const columns = [
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        render: text => <a>{text}</a>,
    },
    {
        title: 'Age',
        dataIndex: 'age',
        key: 'age',
    },
    {
        title: 'Action',
        key: 'action',
        render: (text, record) => (
            <Space size="middle">
                <a>Invite {record.name}</a>
                <a>Delete</a>
            </Space>
        ),
    },
];

const TableMain = ({ student }) => {
    console.log('1', student);
    return (
        <div>
            <Table columns={columns} dataSource={student} />
        </div>
    )
};

TableMain.getInitialProps = async () => {
    const res = await fetch('https://5f5ee4c3df620f00163e504c.mockapi.io/student');
    const json = await res.json();
    return { student: json }
}

export default TableMain;
