import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import { accountService, alertService } from '@/_services';

function Update({ history }) {
    const user = accountService.userValue;
    const initialValues = {
        title: user.title,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        password: '',
        confirmPassword: ''
    };

    const validationSchema = Yup.object().shape({
        title: Yup.string()
            .required('Titulo es obligatorio'),
        firstName: Yup.string()
            .required('First Name es obligatorio'),
        lastName: Yup.string()
            .required('Last Name es obligatorio'),
        email: Yup.string()
            .email('Email is invalid')
            .required('Email es obligatorio'),
        password: Yup.string()
            .min(6, 'La contraseña debe tener almenos 6 caracteres'),
        confirmPassword: Yup.string()
            .when('password', (password, schema) => {
                if (password) return schema.required('La confirmaciòn de la contraseña es obligatorio');
            })
            .oneOf([Yup.ref('password')], 'Contraseñas no coinciden')
    });

    function onSubmit(fields, { setStatus, setSubmitting }) {
        setStatus();
        accountService.update(user.id, fields)
            .then(() => {
                alertService.success('Datos Actualizados!', { keepAfterRouteChange: true });
                history.push('.');
            })
            .catch(error => {
                setSubmitting(false);
                alertService.error(error);
            });
    }

    const [isDeleting, setIsDeleting] = useState(false);
    function onDelete() {
        if (confirm('Esta seguro?')) {
            setIsDeleting(true);
            accountService.delete(user.id)
                .then(() => alertService.success('Cuenta eliminada!'));
        }
    }

    return (
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
            {({ errors, touched, isSubmitting }) => (
                <Form>
                    <h1>Update Profile</h1>
                    <div className="form-row">
                        <div className="form-group col">
                            <label>Titulo</label>
                            <Field name="title" as="select" className={'form-control' + (errors.title && touched.title ? ' is-invalid' : '')}>
                                <option value=""></option>
                                <option value="Mr">Sr</option>
                                <option value="Mrs">Srs</option>
                                <option value="Miss">Sra</option>
                                <option value="Ms">Srta</option>
                            </Field>
                            <ErrorMessage name="title" component="div" className="invalid-feedback" />
                        </div>
                        <div className="form-group col-5">
                            <label>Nombres</label>
                            <Field name="firstName" type="text" className={'form-control' + (errors.firstName && touched.firstName ? ' is-invalid' : '')} />
                            <ErrorMessage name="firstName" component="div" className="invalid-feedback" />
                        </div>
                        <div className="form-group col-5">
                            <label>Apellidos</label>
                            <Field name="lastName" type="text" className={'form-control' + (errors.lastName && touched.lastName ? ' is-invalid' : '')} />
                            <ErrorMessage name="lastName" component="div" className="invalid-feedback" />
                        </div>
                    </div>
                    <div className="form-group">
                        <label>Correo Electrònico</label>
                        <Field name="email" type="text" className={'form-control' + (errors.email && touched.email ? ' is-invalid' : '')} />
                        <ErrorMessage name="email" component="div" className="invalid-feedback" />
                    </div>
                    <h3 className="pt-3">Cambiar contraseña</h3>
                    <p>Dejar en blanco para no cambiar la contraseña</p>
                    <div className="form-row">
                        <div className="form-group col">
                            <label>Contraseña</label>
                            <Field name="password" type="password" className={'form-control' + (errors.password && touched.password ? ' is-invalid' : '')} />
                            <ErrorMessage name="password" component="div" className="invalid-feedback" />
                        </div>
                        <div className="form-group col">
                            <label>Confirmar Contraseña</label>
                            <Field name="confirmPassword" type="password" className={'form-control' + (errors.confirmPassword && touched.confirmPassword ? ' is-invalid' : '')} />
                            <ErrorMessage name="confirmPassword" component="div" className="invalid-feedback" />
                        </div>
                    </div>
                    <div className="form-group">
                        <button type="submit" disabled={isSubmitting} className="btn btn-primary mr-2">
                            {isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
                            Actualizar
                        </button>
                        <button type="button" onClick={() => onDelete()} className="btn btn-danger" style={{ width: '75px' }} disabled={isDeleting}>
                            {isDeleting
                                ? <span className="spinner-border spinner-border-sm"></span>
                                : <span>Eliminar</span>
                            }
                        </button>
                        <Link to="." className="btn btn-link">Cancelar</Link>
                    </div>
                </Form>
            )}
        </Formik>
    )
}

export { Update };