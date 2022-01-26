import React from 'react';
import { useHistory  } from 'react-router-dom';

function Logout() {
    const history = useHistory();
    return (
        <button
            className="form-group btn btn-danger col-md-1"
            onClick={() => {
                localStorage.setItem("isAuth", "false");
                localStorage.removeItem("currentUserId");
                history.push('/');
            }}
        >
            Logout
        </button>
    )
}

export default Logout;
