import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { MdDone, MdChevronLeft } from 'react-icons/md';
import history from '~/services/history';

import {
  Container,
  TopHeader,
  TopActions,
  WrapperForm,
  Label,
  WrapperIcons,
  WrapperFormAddress
} from './styles';

import api from '~/services/api';

const schema = Yup.object().shape({
  name: Yup.string().required('O nome é obrigatório'),
  street: Yup.string().required('A rua é obrigatória'),
  housenumber: Yup.number().required('O número é obrigatório'),
  city: Yup.string().required('A cidade é obrigatória'),
  state: Yup.string().required('O estado é obrigatório'),
  zipcode: Yup.string().required('O CEP é obrigatório')
});

export default function Edit() {
  const { id } = useParams();

  const [recipients, setRecipients] = useState([]);

  useEffect(() => {
    async function getRecipients() {
      const response = await api.get(`recipient/${id}`);
      //  console.tron.log(response.data);
      setRecipients(response.data);
    }
    getRecipients();
  }, [id]);

  async function handleEdit(data) {
    try {
      await api.put(`/recipients/${id}`, data);
      // console.tron.log(data);
      toast.success('Destinatário editado com sucesso!', {
        onClose: () => history.push('/recipients')
      });
    } catch (error) {
      toast.error('Erro ao editar destinatário!');
    }
  }

  return (
    <Container>
      <Form
        initialData={recipients}
        schema={schema}
        id="formEditRecipients"
        onSubmit={handleEdit}
      >
        <TopHeader>
          <h1>Edição de Destinatário</h1>
          <TopActions>
            <Link to="/recipients">
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
          <WrapperFormAddress>
            <div id="full">
              <Label for="nome">
                Nome
                <Input name="name" placeholder="Nome" />
              </Label>
            </div>

            <div id="half">
              <Label for="rua">
                Rua
                <Input name="street" placeholder="Rua" />
              </Label>
            </div>

            <div id="quarter">
              <Label for="numero">
                Número
                <Input name="housenumber" placeholder="Número" />
              </Label>
            </div>

            <div id="quarter">
              <Label for="complemento">
                Complemento
                <Input name="complement" placeholder="Complemento" />
              </Label>
            </div>

            <div id="third">
              <Label for="cidade">
                Cidade
                <Input name="city" placeholder="Cidade" />
              </Label>
            </div>

            <div id="third">
              <Label for="state">
                Estado
                <Input name="state" placeholder="Estado" />
              </Label>
            </div>

            <div id="third">
              <Label for="zipcode">
                CEP
                <Input name="zipcode" placeholder="CEP" />
              </Label>
            </div>
          </WrapperFormAddress>
        </WrapperForm>
      </Form>
    </Container>
  );
}
