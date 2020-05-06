import React from 'react';
import { useDispatch } from 'react-redux';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';
import { signInRequest } from '~/store/modules/auth/actions';

import logo from '~/assets/fastfeet-logo.png';
import { WrapperForm } from './styles';

const schema = Yup.object().shape({
  email: Yup.string()
    .email('Insira um e-mail válido')
    .required('O e-mail é obrigatório'),
  password: Yup.string().required('A senha é obrigatória')
});

export default function SignIn() {
  const dispatch = useDispatch();
  // const loading = useSelector(state => state.auth.loading);

  function handleSubmit({ email, password }) {
    dispatch(signInRequest(email, password));
  }

  return (
    <>
      <WrapperForm>
        <img src={logo} alt="FastFeet" />
        <Form schema={schema} onSubmit={handleSubmit}>
          <label>SEU E-MAIL</label>
          <Input name="email" type="email" placeholder="Seu e-mail" />
          <label>SUA SENHA</label>
          <Input
            name="password"
            type="password"
            placeholder="Sua senha secreta"
          />
          <button type="submit">Acessar o sistema</button>
        </Form>
      </WrapperForm>
    </>
  );
}
