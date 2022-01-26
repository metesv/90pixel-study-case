import React from 'react';
import { Formik, Form, Field } from 'formik';
import { useHistory  } from 'react-router-dom';
import axios from 'axios';
import * as Yup from 'yup';

function Register() {
    const history = useHistory();
    const loginPageStyle = {
        margin: "32px auto 37px",
        maxWidth: "530px",
        background: "#fff",
        padding: "30px",
        borderRadius: "10px",
        boxShadow: "0px 0px 10px 10px rgba(0,0,0,0.15)"
    }
    
    return (
        <Formik
            initialValues={{ email: '', firstName: '', lastName: '', password: '' }}
            validationSchema={
                Yup.object().shape({
                    email: Yup.string().email('Email not valid').required('Email is required'),
                    firstName: Yup.string().required('Email is required'),
                    lastName: Yup.string().required('Email is required'),
                    password: Yup.string().min(5, 'Password is too short - should be 5 chars minimum.').required('Password is required')
                })
            }
            onSubmit={async (values)=> {
                const { email, firstName, lastName, password } = values;
                const input = {
                    email,
                    firstName,
                    lastName,
                    password
                }
                try {
                    const response = await axios.post(`https://61eff8fb732d93001778e76b.mockapi.io/users/`, input);
                    const { status } = response;
                    if (status === 200 || status === 201) {
                        history.push('/');
                    }
                } catch (error) {
                    console.log(error);
                }
            }}
        >
            {({
                errors,
                touched,
                handleChange
            }) => (
                <div className="container">
                    <div className="login-wrapper" style={loginPageStyle}>
                        <h2>Register Page</h2>
                        <Form className="form-container">
                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <Field type="text" name="email" className={"form-control"} placeholder="Email" onChange={handleChange} />
                                { touched.email && errors.email && <span className="help-block text-danger">{errors.email}</span> }
                            </div>
                            <div className="form-group">
                                <label htmlFor="firstName">FirstName</label>
                                <Field type="text" name="firstName" className={"form-control"} placeholder="FirstName" onChange={handleChange} />
                                { touched.firstName && errors.firstName && <span className="help-block text-danger">{errors.firstName}</span> }
                            </div>
                            <div className="form-group">
                                <label htmlFor="lastName">Email</label>
                                <Field type="text" name="lastName" className={"form-control"} placeholder="LastName" onChange={handleChange} />
                                { touched.lastName && errors.lastName && <span className="help-block text-danger">{errors.lastName}</span> }
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <Field type="password" name="password" className={"form-control"} placeholder="Password" onChange={handleChange} />
                                { touched.password && errors.password && <span className="help-block text-danger">{errors.password}</span> }
                            </div>
                            <button type="submit" className="btn btn-primary">Register</button>
                        </Form>
                        <span>If you are already member go to login...</span><br />
                        <button onClick={() => history.push('/')} className="btn btn-primary">Go to Login</button>
                    </div>
                </div>
            )} 
        </Formik>
    )
}

export default Register;
