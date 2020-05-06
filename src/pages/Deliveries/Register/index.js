import React, { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import history from '~/services/history';

import Select from '~/components/Form/Select';
import Input from '~/components/Form/Input';
import { Container, TopHeader, TopActions, WrapperForm, Label } from './styles';

import api from '~/services/api';

const schema = Yup.object().shape({
  product: Yup.string().required('O produto é obrigatório'),
  recipient_id: Yup.number()
    .typeError('O destinatário é obrigatório')
    .nullable()
    .required('O destinatário é obrigatório'),
  deliveryman_id: Yup.number()
    .typeError('O entregador é obrigatório')
    .nullable()
    .required('O entregador é obrigatório')
});

const customStyles = {
  input: base => ({
    ...base,
    width: '100%',
    height: '25px'
  })
};

export default function Register() {
  const formRef = useRef(null);
  const [deliverymen, setDeliverymen] = useState([]);
  const [recipies, setRecipies] = useState([]);

  async function handleRegister(data) {
    try {
      await api.post(`/delivery`, data);
      toast.success('Entrega cadastrada com sucesso!', {
        onClose: () => history.push('/deliveries')
      });
    } catch (error) {
      toast.error('Erro ao cadastrar entrega!');
    }
  }

  // filter Deliverymen
  const filterDel = inputValue => {
    return deliverymen.filter(i =>
      i.label.toLowerCase().includes(inputValue.toLowerCase())
    );
  };

  // filter Recipients
  const filterRec = inputValue => {
    return recipies.filter(i =>
      i.label.toLowerCase().includes(inputValue.toLowerCase())
    );
  };

  // Options Deliverymen
  const loadOptionsD = (inputValue, callback) => {
    if (inputValue) {
      const response = filterDel(inputValue);

      if (typeof response === 'object') {
        callback(response);
      }
    }
    callback(deliverymen);
  };

  // Options Recipients
  const loadOptionsR = (inputValue, callback) => {
    if (inputValue) {
      const response = filterRec(inputValue);

      if (typeof response === 'object') {
        callback(response);
      }
    }
    callback(recipies);
  };

  // Get Deliverymen
  useEffect(() => {
    async function getDeliverymen() {
      const responseDeliveryman = await api.get('deliverymen');
      const data = responseDeliveryman.data.map(deliveryman => ({
        value: deliveryman.id,
        label: deliveryman.name
      }));

      setDeliverymen(data);
    }
    getDeliverymen();
  }, []);

  // Get Recipies
  useEffect(() => {
    async function getRecipies() {
      const responseRecipies = await api.get('recipients');
      const data = responseRecipies.data.map(r => ({
        value: r.id,
        label: r.name
      }));
      setRecipies(data);
    }
    getRecipies();
  }, []);

  return (
    <Container>
      {deliverymen.length === 0 || recipies.length === 0 ? (
        <p>Carregando...</p>
      ) : (
        <Form
          schema={schema}
          id="formDelivery"
          onSubmit={handleRegister}
          ref={formRef}
        >
          <TopHeader>
            <h1>Cadastro de encomendas</h1>
            <TopActions>
              <Link to="/deliveries">Voltar</Link>
              <button type="submit">Salvar</button>
            </TopActions>
          </TopHeader>
          <WrapperForm>
            <div id="half">
              <Label>Entregadores </Label>
              <Select
                name="deliveryman_id"
                loadOptions={loadOptionsD}
                defaultOptions
                styles={customStyles}
                placeholder="Selecione"
              />
            </div>
            <div id="half">
              <Label>Destinatários </Label>
              <Select
                name="recipient_id"
                loadOptions={loadOptionsR}
                defaultOptions
                styles={customStyles}
                placeholder="Selecione"
              />
            </div>
            <div id="full">
              <Label>Produto </Label>
              <Input name="product" type="text" placeholder="Nome do produto" />
            </div>
          </WrapperForm>
        </Form>
      )}
    </Container>
  );
}
