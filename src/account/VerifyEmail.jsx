import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import queryString from 'query-string';

import { accountService, alertService } from '@/_services';

function VerifyEmail({ history }) {
    const EmailStatus = {
        Verifying: 'En Verificacion',
        Failed: 'Fallò'
    }

    const [emailStatus, setEmailStatus] = useState(EmailStatus.Verifying);

    useEffect(() => {
        const { token } = queryString.parse(location.search);

        // remove token from url to prevent http referer leakage
        history.replace(location.pathname);

        accountService.verifyEmail(token)
            .then(() => {
                alertService.success('Verificacion correcta puedes ingresar', { keepAfterRouteChange: true });
                history.push('login');
            })
            .catch(() => {
                setEmailStatus(EmailStatus.Failed);
            });
    }, []);

    function getBody() {
        switch (emailStatus) {
            case EmailStatus.Verifying:
                return <div>Verificando...</div>;
            case EmailStatus.Failed:
                return <div>Verificacion fallida , haz click en este enlace para mas opciones <Link to="forgot-password">Olvido contraseña</Link> page.</div>;
        }
    }

    return (
        <div>
            <h3 className="card-header">Verificar correo</h3>
            <div className="card-body">{getBody()}</div>
        </div>
    )
}

export { VerifyEmail }; 