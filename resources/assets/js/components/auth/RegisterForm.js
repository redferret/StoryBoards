import AppDispatcher from '../../dispatcher.js';
import AuthStore from '../../stores/AuthStore.js';
import Input from '../Input.js';
import React from 'react';
import Router from '../../router.js';

import {
  REGISTER,
  REGISTER_FORM
} from '../../constants.js';

import {
  Button,
  Col,
  Form,
  FormControl,
  FormGroup,
} from 'react-bootstrap';

export default class RegisterForm extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.postRegister = this.postRegister.bind(this);
    this.handleInputChanged = this.handleInputChanged.bind(this);

    this.state = {
      name: '',
      email: '',
      password: '',
      password_confirmation: ''
    }
  }

  _onChange() {
    this.setState({
      errors: AuthStore.getErrors()
    })
  }

  componentDidMount() {
    AuthStore.on(REGISTER_FORM, this._onChange.bind(this));
  }

  componentWillUnmount() {
    AuthStore.removeListener(REGISTER_FORM, this._onChange.bind(this));
  }

  handleInputChanged(event) {
    let key = event.target.name;
    let value = event.target.value;
    let eventKey = event.key;
    this.setState({
      [key]: value
    }, () => {
      if (key == 'password_confirmation') {
        if (eventKey === 'Enter') {
          this.postRegister();
        }
      }
    });
  }

  postRegister() {
    AppDispatcher.dispatch({
      action: REGISTER,
      values: this.state,
      emitOn: [{
        store: AuthStore,
        componentIds: [REGISTER_FORM]
      }]
    });
  }

  render() {
    let errors = this.state.errors;
    let nameError = errors? errors.name : null;
    let emailError = errors? errors.email : null;
    let passwordError = errors? errors.password : null;
    return (
      <div className='auth-form'>
        <Form horizontal>
          <Input smOffset={3} sm={5} name='name' type='text'
            placeholder='John Doe'
            label='Pen Name'
            initialValue={this.state.name}
            validationCallback={() => nameError? 'error' : null}
            help={nameError? nameError : ''}
            autoComplete='on'
            callback={this.handleInputChanged}/>

          <Input smOffset={3} sm={5} name='email' type='email'
            placeholder='Example@gmail.com'
            label='Email'
            initialValue={this.state.email}
            validationCallback={() => emailError? 'error' : null}
            help={emailError? emailError : ''}
            callback={this.handleInputChanged}
            autoComplete='on'/>

          <Input smOffset={3} sm={5} name='password' type='password'
            label='Password'
            initialValue={this.state.password}
            validationCallback={() => passwordError? 'error' : null}
            help={passwordError? passwordError : ''}
            callback={this.handleInputChanged}/>

          <Input smOffset={3} sm={5} name='password_confirmation'
            type='password'
            label='Confirm Password'
            initialValue={this.state.password_confirmation}
            callback={this.handleInputChanged}/>

          <FormGroup>
            <Col smOffset={3} sm={12}>
              <Button onClick={this.postRegister}>Register</Button>
            </Col>
          </FormGroup>
        </Form>
      </div>
    );
  }
}
