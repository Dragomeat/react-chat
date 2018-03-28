import * as React from 'react';
import { Field, reduxForm } from 'redux-form';
import { Button, Form } from 'semantic-ui-react';
import { TextField } from './TextField';

const validate = (values) => {
    const errors = {};
    const required = ['email', 'password'];
    required
        .filter((field) => !values[field] && (errors[field] = 'Required'));

    return errors;
};

class LoginPage extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit() {
        const { email, password, login} = this.props;
        login(email, password);
    }

    render() {
        const {handleSubmit, pristine, submitting} = this.props;

        return (
            <Form onSubmit={handleSubmit(this.handleSubmit)}>
                <Field
                    name={'email'}
                    component={TextField}
                    label={'Email'}
                    placeholder={'Your email'}
                />
                <Field
                    name={'password'}
                    component={TextField}
                    label={'Password'}
                    type={'password'}
                    placeholder={'Your password'}
                />
                <Button type={'submit'} disabled={pristine || submitting}>Submit</Button>
            </Form>
        );
    }
}

export const LoginPageComponent = reduxForm({
    form: 'login',
    validate
})(LoginPage);