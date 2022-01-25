import React from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import UserTable from '../components/UserTable';

function Users() {
    const [users, setUsers] = React.useState([]);

    const getUsers = async () => {
        try {
            const response = await axios.get('https://61eff8fb732d93001778e76b.mockapi.io/users');
            const usersData = response?.data;
            setUsers(usersData);
        } catch (error) {
            console.log(error);
        }
    }

    React.useEffect(() => getUsers(), []);
    
    return <UserTable users={users} />
}

export default withRouter(Users);
