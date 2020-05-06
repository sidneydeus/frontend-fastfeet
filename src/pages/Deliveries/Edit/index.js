import React, { useRef, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
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

export default function Edit() {
  const { id } = useParams();
  const formRef = useRef(null);

  const [deliveries, setDeliveries] = useState([]);

  const [deliverymen, setDeliverymen] = useState([]);
  const [recipies, setRecipies] = useState([]);

  const [defaultDeliveryman, setDefaultDeliveryman] = useState([]);
  const [ideliveryman, setIdeliveryman] = useState([]);

  const [defaultRecipient, setDefaultRecipient] = useState([]);
  const [irecipient, setIRecipient] = useState([]);

  async function handleEdit(data) {
    // console.log(data);
    try {
      await api.put(`/delivery/${id}`, data);
      toast.success('Entrega atualizada com sucesso!', {
        onClose: () => history.push('/deliveries')
      });
    } catch (error) {
      toast.error('Erro ao atualizar entrega!');
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

  useEffect(() => {
    async function getDeliveries() {
      const { data } = await api.get(`delivery/${id}`);
      setDeliveries(data);
      setIdeliveryman(data.deliveryman_id);
      setIRecipient(data.recipient_id);
    }
    setTimeout(() => {
      getDeliveries();
    }, 2000);
  }, [id]);

  // change Deliveryman
  function handleChangeD(data) {
    setDefaultDeliveryman(data.value);
  }

  // change Deliveryman
  function handleChangeR(data) {
    setDefaultRecipient(data.value);
  }

  useEffect(() => {
    setDefaultDeliveryman(deliverymen.find(o => o.value === ideliveryman));
  }, [deliverymen, ideliveryman]);

  useEffect(() => {
    setDefaultRecipient(recipies.find(o => o.value === irecipient));
  }, [recipies, irecipient]);

  return (
    <Container>
      {defaultDeliveryman === undefined || defaultRecipient === undefined ? (
        <p>Carregando...</p>
      ) : (
        <Form
          schema={schema}
          id="formDelivery"
          onSubmit={handleEdit}
          ref={formRef}
          initialData={{ product: deliveries.product }}
        >
          <TopHeader>
            <h1>Edição de encomendas</h1>
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
                defaultValue={defaultDeliveryman}
                onChange={value => handleChangeD(value)}
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
                defaultValue={defaultRecipient}
                onChange={value => handleChangeR(value)}
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
