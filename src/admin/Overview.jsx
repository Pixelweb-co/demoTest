import React from 'react';
import { Link } from 'react-router-dom';

function Overview({ match }) {
    const { path } = match;

    return (
        <div>
            <h1>Admin</h1>
            <p>Area permitida para administradores.</p>
            <p><Link to={`${path}/users`}>Gestionar usuarios</Link></p>
        </div>
    );
}

export { Overview };