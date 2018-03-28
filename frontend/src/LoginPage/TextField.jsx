import * as React from 'react';
import { Form } from 'semantic-ui-react';

export const TextField = ({input, label, placeholder, type}) => (
    <Form.Field>
        <label>{label}</label>
        <input
            type={type ? type : 'text'}
            onChange={input.onChange}
            placeholder={placeholder}
        />
    </Form.Field>
);