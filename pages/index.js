import React, { useState } from 'react'
import styles from '../styles/Home.module.css'
import { Table, Space, Button } from 'antd';
import "../styles/antd.less";
import apiRequest from './api/productApi';
import { deleteStudent, listStudent } from '../redux/actions'
import { useDispatch, useStore } from 'react-redux';
import Link from 'next/link'
import { useRouter } from 'next/router';

const Home = ({ student }) => {
  const dispatch = useDispatch();
  const store = useStore();
  const router = useRouter();
  const dataColumn = student;
  const action = listStudent(store.getState().student.length === 0 ? dataColumn : store.getState().student);
  dispatch(action);
  const [students, setStudents] = useState(store.getState().student);
  const onDelete = async (id) => {
    try {
      const { data } = await apiRequest.remove(id);
      const action = deleteStudent(data);
      dispatch(action);
      setStudents(store.getState().student);
    } catch (error) {
      console.log('You have an error', error)
    }
  }

  const onEdit = (id) => {
    router.push(`/edit/${id}`);
  }
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
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: <Link href="/add">
        <Button type="primary" style={{ backgroundColor: 'green' }}>
          Add
        </Button>
      </Link>,
      key: 'action',
      render: (text, record) => (
        <Space size="middle" >
          <Link href=''>
            <Button type="primary" onClick={() => onEdit(record.id)} style={{ backgroundColor: 'deeppink' }}>
              Edit
            </Button>
          </Link>
          <a>
            <Button type="primary" danger onClick={() => { if (window.confirm('Delete the item?')) { onDelete(record.id) }; }}>
              Delete
            </Button>
          </a>
        </Space >
      ),
    },
  ];

  return (
    <div className={styles.container}>
      <div key={student.id}>
        <Table columns={columns} dataSource={students} />
      </div>
    </div>
  )

}

Home.getInitialProps = async () => {
  const res = await fetch('https://5f5ee4c3df620f00163e504c.mockapi.io/student');
  const json = await res.json();
  return { student: json }
}

export default Home;
