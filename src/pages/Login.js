import React from 'react';
import { Formik, Form, Field } from 'formik';
import { useHistory  } from 'react-router-dom';
import * as Yup from 'yup';

function Login({ isAuth, setIsAuth}) {
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
            initialValues={{ email: '', password: '' }}
            validationSchema={
                Yup.object().shape({
                    email: Yup.string().email('Email not valid').required('Email is required'),
                    password: Yup.string().required('Password is required')
                })
            }
            onSubmit={(values)=> {
                if(values.email === 'admin@admin.com' && values.password === 'master1234') {
                    setIsAuth(true);
                    history.push('/users');
                } else {
                    console.log('Wrong password or email...')
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
                        <h2>Login Page</h2>
                        <Form className="form-container">
                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <Field type="text" name="email" className={"form-control"} placeholder="Email" onChange={handleChange} />
                                { touched.email && errors.email && <span className="help-block text-danger">{errors.email}</span> }
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <Field type="password" name="password" className={"form-control"} placeholder="Password" onChange={handleChange} />
                                { touched.password && errors.password && <span className="help-block text-danger">{errors.password}</span> }
                            </div>
                            <button type="submit" className="btn btn-primary">Login</button>
                            {isAuth && <h3 style={{ color: 'green' }}>Success</h3>}
                        </Form>
                    </div>
                </div>
            )} 
        </Formik>
    )
}

export default Login;
