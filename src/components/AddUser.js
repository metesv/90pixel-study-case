import React from 'react';
import { Formik, Form, Field } from 'formik';
import axios from 'axios';
import * as Yup from 'yup';

function AddUser() {
  return (
        <Formik
            initialValues={{ firstName: '', lastName: '' }}
            validationSchema={
                Yup.object().shape({
                    firstName: Yup.string().required('Required'),
                    lastName: Yup.string().required('Required')
                })
            }
            onSubmit={async (values)=> {
                const { firstName, lastName } = values;
                const input = {
                    firstName,
                    lastName
                }
                try {
                    await axios.post(`https://61eff8fb732d93001778e76b.mockapi.io/users/`, input);
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
                    <Field type="text" value={values.firstName} name="firstName" className="form-group col-md-5" placeholder="FirstName..." onChange={handleChange} />
                    <Field type="test" value={values.lastName} name="lastName" className="form-group col-md-5" placeholder="LastName..." onChange={handleChange} />
                    <button type="submit" className="form-group col-md-2">
                        Add User
                    </button>
                </Form>
            )} 
        </Formik>
  )
}

export default AddUser;
