import React from 'react';
import { Link } from 'react-router-dom';

import { accountService } from '@/_services';

function Details({ match }) {
    const { path } = match;
    const user = accountService.userValue;

    return (
        <div>
            <h1>Mi Cuenta</h1>
            <p>
                <strong>Nombres: </strong> {user.title} {user.firstName} {user.lastName}<br />
                <strong>Correo electrònico: </strong> {user.email}
            </p>
            <p><Link to={`${path}/update`}>Actualizar Informaciòn</Link></p>
        </div>
    );
}

export { Details };