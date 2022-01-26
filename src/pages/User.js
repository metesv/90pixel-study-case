import React from 'react';
import axios from 'axios';
import { useLocation, useHistory } from "react-router-dom";
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

function useQuery() {
    const { search } = useLocation();
  
    return React.useMemo(() => new URLSearchParams(search), [search]);
}

function User() {
    let query = useQuery();
    const history = useHistory();
    const [user, setUser] = React.useState({});

    const id = query.get('id');

    const getUser = async () => {
        try {
            const response = await axios.get(`https://61eff8fb732d93001778e76b.mockapi.io/users?id=${id}`)
            const userData = response?.data[0];
            setUser(userData);
        } catch (error) {
            console.log(error);
        }
    }

    React.useEffect(() => getUser(), []); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <>
            <Formik
                enableReinitialize={true}
                initialValues={{ id: user?.id, firstName: user?.firstName, lastName: user?.lastName, createdAt: user?.createdAt }}
                validationSchema={
                    Yup.object().shape({
                        firstName: Yup.string().required('Required'),
                        lastName: Yup.string().required('Required')
                    })
                }
                onSubmit={async (values)=> {
                    const { firstName, lastName, createdAt } = values;
                    try {
                        const response = await axios.put(`https://61eff8fb732d93001778e76b.mockapi.io/users/${id}`, {
                            id,
                            createdAt,
                            firstName,
                            lastName
                        })
                        const newUserData = response.data;
                        setUser(newUserData);
                    } catch (error) {
                        console.log(error);
                    }
                }}
            >
                {({
                    errors,
                    touched,
                    values,
                    handleChange
                }) => (
                    <Form className="form-container">
                        <div className="form-group">
                            <label htmlFor="firstName">FirstName</label>
                            <Field type="text" value={values.firstName} name="firstName" className={"form-control"} placeholder="FirstName" onChange={handleChange} />
                            { touched.firstName && errors.firstName && <span className="help-block text-danger">{errors.firstName}</span> }
                        </div>
                        <div className="form-group" style={{ marginBottom: 20 }}>
                            <label htmlFor="lastname">LastName</label>
                            <Field type="test" value={values.lastName} name="lastName" className={"form-control"} placeholder="LastName" onChange={handleChange} />
                            { touched.lastname && errors.lastname && <span className="help-block text-danger">{errors.lastname}</span> }
                        </div>
                        <button type="submit" class="btn btn-primary">Update User</button>
                        <button 
                            onClick={async () => {
                                try {
                                    const response = await axios.delete(`https://61eff8fb732d93001778e76b.mockapi.io/users/${id}`)
                                    const newUserData = response.data;
                                    setUser(newUserData);
                                    history.push('/users');
                                } catch (error) {
                                    console.log(error);
                                }
                            }} 
                            class="btn btn-danger"
                        >
                            Delete
                        </button>
                        <button
                            class="btn btn-secondary"
                            onClick={() => {
                                history.push('/users');
                            }}
                        >
                            Back to UserTable
                        </button>
                    </Form>
                )} 
            </Formik>
        </>
    )
}

export default User;
