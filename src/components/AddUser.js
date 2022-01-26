import React from 'react';
import { Formik, Form, Field } from 'formik';
import axios from 'axios';
import * as Yup from 'yup';
import { useHistory  } from 'react-router-dom';
import Logout from './Logout';

function AddUser() {
    const history = useHistory();

    return (
        <Formik
            initialValues={{ email: '', firstName: '', lastName: '' }}
            validationSchema={
                Yup.object().shape({
                    email: Yup.string().email().required('Required'),
                    firstName: Yup.string().required('Required'),
                    lastName: Yup.string().required('Required')
                })
            }
            onSubmit={async (values)=> {
                const { email, firstName, lastName } = values;
                const input = {
                    email,
                    firstName,
                    lastName
                }
                try {
                    const response = await axios.post(`https://61eff8fb732d93001778e76b.mockapi.io/users/`, input);
                    const { status, data } = response;
                    if (status === 200 || status === 201) {
                        history.push(`user/?id=${data.id}`);
                    }
                } catch (error) {
                    console.log(error);
                }
            }}
        >
            {({
                values,
                handleChange
            }) => (
                <Form className="form-row" style={{ margin: 5 }}>
                    <Field type="text" value={values.email} name="email" className="form-group col-md-4" placeholder="examle@email.com" onChange={handleChange} />
                    <Field type="text" value={values.firstName} name="firstName" className="form-group col-md-3" placeholder="FirstName..." onChange={handleChange} />
                    <Field type="test" value={values.lastName} name="lastName" className="form-group col-md-3" placeholder="LastName..." onChange={handleChange} />
                    <button type="submit" className="form-group btn btn-primary col-md-1">
                        Add User
                    </button>
                    <Logout />
                </Form>
            )} 
        </Formik>
  )
}

export default AddUser;
