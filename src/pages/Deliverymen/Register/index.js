import React from 'react';
import { Link } from 'react-router-dom';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import history from '~/services/history';
import AvatarInput from '~/components/AvatarInput';
import {
  Container,
  TopHeader,
  TopActions,
  WrapperForm,
  Label,
  WrapperAvatar
} from './styles';

import api from '~/services/api';

const schema = Yup.object().shape({
  name: Yup.string().required('O nome é obrigatório'),
  email: Yup.string()
    .email('Insira um e-mail válido')
    .required('O e-mail é obrigatório')
});

export default function Register() {
  async function handleRegister(data) {
    try {
      await api.post(`/deliveryman`, data);
      toast.success('Entregador cadastrado com sucesso!', {
        onClose: () => history.push('/deliverymen')
      });
    } catch (error) {
      toast.error('Erro ao cadastrar entregador!');
    }
  }

  return (
    <Container>
      <Form schema={schema} id="formDeliveryman" onSubmit={handleRegister}>
        <TopHeader>
          <h1>Cadastro de Entregadores</h1>
          <TopActions>
            <Link to="/deliverymen">Voltar</Link>
            <button type="submit">Salvar</button>
          </TopActions>
        </TopHeader>
        <WrapperForm>
          <WrapperAvatar>
            <AvatarInput name="avatar_id" />
          </WrapperAvatar>
          <Label>Nome</Label>
          <Input name="name" type="text" placeholder="Nome Completo" />
          <Label>Email</Label>
          <Input name="email" type="email" placeholder="Email Válido" />
        </WrapperForm>
      </Form>
    </Container>
  );
}
