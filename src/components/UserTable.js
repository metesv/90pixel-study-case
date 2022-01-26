import React from 'react';
import { useHistory  } from 'react-router-dom';
import AddUser from './AddUser';

function UserTable({ users }) {
    const history = useHistory();
    const currentUserId = localStorage.getItem("currentUserId");
    
    return (
        <>
            <AddUser />
            <table class="table table-dark" style={{ textAlign: 'center' }}>
                <thead>
                    <tr>
                        <th scope="col">Index</th>
                        <th scope="col">Email</th>
                        <th scope="col">First</th>
                        <th scope="col">Last</th>
                        <th scope="col">Detail</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        users.filter(({ id }) => id !== currentUserId).map(({ id, email, firstName, lastName }, index) => (
                            <tr>
                                <th scope="row">{index + 1}</th>
                                <td>{email}</td>
                                <td>{firstName}</td>
                                <td>{lastName}</td>
                                <td>
                                    <button onClick={() => history.push(`/user?id=${id}`)}>
                                        Go to details
                                    </button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
           </table>
        </>
    )
}

export default UserTable;
