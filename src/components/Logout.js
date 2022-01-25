import React from 'react';
import { useHistory  } from 'react-router-dom';

function Logout() {
    const history = useHistory();
    return (
        <button
            className="form-group col-md-1"
            onClick={() => {
                localStorage.setItem("isAuth", "false");
                history.push('/');
            }}
        >
            Logout
        </button>
    )
}

export default Logout;
