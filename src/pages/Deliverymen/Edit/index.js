import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { MdDelete, MdDone, MdChevronLeft } from 'react-icons/md';
import { confirmAlert } from 'react-confirm-alert';
import history from '~/services/history';
import AvatarInput from '~/components/AvatarInput';
import {
  Container,
  TopHeader,
  TopActions,
  WrapperForm,
  Label,
  WrapperAvatar,
  ButtonRemove,
  WrapperIcons
} from './styles';

import api from '~/services/api';

const schema = Yup.object().shape({
  name: Yup.string().required('O nome é obrigatório'),
  email: Yup.string()
    .email('Insira um e-mail válido')
    .required('O e-mail é obrigatório')
});

export default function Edit() {
  const { id } = useParams();

  const [deliveryman, setDeliveryman] = useState([]);

  useEffect(() => {
    async function getDeliveryman() {
      const response = await api.get(`deliveryman/${id}`);
      setDeliveryman(response.data);
    }
    getDeliveryman();
  }, [id]);

  async function handleEdit(data) {
    try {
      await api.put(`/deliveryman/${id}`, data);
      toast.success('Entregador editado com sucesso!', {
        onClose: () => history.push('/deliverymen')
      });
    } catch (error) {
      toast.error('Erro ao editar entregador!');
    }
  }

  function deleteAvatar() {
    confirmAlert({
      title: 'Confirmação',
      message: 'Deseja realmente excluir?',
      buttons: [
        {
          label: 'Sim',
          onClick: async () => {
            await api.put(`deliveryman/${id}`, { avatar_id: null });
            const reload = await api.get(`deliveryman/${id}`);
            setDeliveryman(reload.data);
          }
        },
        {
          label: 'Não'
        }
      ]
    });
  }

  return (
    <Container>
      <Form
        schema={schema}
        initialData={deliveryman}
        id="formEditDeliveryman"
        onSubmit={handleEdit}
      >
        <TopHeader>
          <h1>Edição de Entregadores</h1>
          <TopActions>
            <Link to="/deliverymen">
              <WrapperIcons>
                <MdChevronLeft size={18} />
                <span>Voltar</span>
              </WrapperIcons>
            </Link>
            <button type="submit">
              <WrapperIcons>
                <MdDone size={18} />
                <span>Salvar</span>
              </WrapperIcons>
            </button>
          </TopActions>
        </TopHeader>
        <WrapperForm>
          <WrapperAvatar>
            <AvatarInput
              name="avatar_id"
              deliverymanName={deliveryman.name}
              deliverymanAvatar={
                deliveryman.avatar_id ? deliveryman.avatar.url : 'null'
              }
            />
            {deliveryman.avatar_id ? (
              <ButtonRemove type="button" onClick={deleteAvatar}>
                <MdDelete size={14} />
              </ButtonRemove>
            ) : (
              ''
            )}
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
