import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MdVisibility, MdEdit, MdDelete, MdAdd } from 'react-icons/md';
import leftpad from 'left-pad';
import { Menu, MenuButton, MenuItem } from '@reach/menu-button';
import '@reach/menu-button/styles.css';
import { DialogOverlay, DialogContent } from '@reach/dialog';
import '@reach/dialog/styles.css';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import Avatar from 'react-avatar';
import Search from '~/components/Search';
import history from '~/services/history';

import {
  Container,
  TopHeader,
  TopActions,
  WrapperTable,
  CustomMenuList,
  WrapperIcons,
  Statusmsg
} from './styles';

import api from '~/services/api';

export default function Deliveries() {
  const [deliveries, setDeliveries] = useState([]);

  const [showDialog, setShowDialog] = useState(false);
  const [dialogContent, setDialogContent] = useState([]);

  const close = () => setShowDialog(false);

  const searchResult = data => {
    setDeliveries(data);
    // console.tron.log(data);
  };
  useEffect(() => {
    async function getDeliveries() {
      const response = await api.get('deliveries');
      setDeliveries(response.data);
    }
    getDeliveries();
  }, []);

  function handleExcluir(id) {
    confirmAlert({
      title: 'Confirmação',
      message: 'Deseja realmente excluir?',
      buttons: [
        {
          label: 'Sim',
          onClick: async () => {
            const result = await api.delete(`delivery/${id}`);
            setDeliveries(result.data);
          }
        },
        {
          label: 'Não'
        }
      ]
    });
  }

  async function handleView(data) {
    const order = {
      street: data.recipient.street,
      housenumber: data.recipient.housenumber,
      city: data.recipient.city,
      state: data.recipient.state,
      zipcode: data.recipient.zipcode,
      start_date: data.start_date,
      end_date: data.end_date,
      signature: data.signature !== null ? data.signature.url : ''
    };

    await setDialogContent(order);
    setShowDialog(true);
  }

  function getStatus(delivery) {
    if (delivery.start_date !== null && delivery.end_date !== null) {
      return <Statusmsg msgtype="delivered">Entregue</Statusmsg>;
    }

    if (delivery.start_date !== null && delivery.end_date === null) {
      return <Statusmsg msgtype="shipped">Retirada</Statusmsg>;
    }

    if (delivery.start_date === null && delivery.end_date === null) {
      return <Statusmsg msgtype="pending">Pendente</Statusmsg>;
    }

    return <Statusmsg msgtype="canceled">Cancelado</Statusmsg>;
  }

  return (
    <Container>
      <TopHeader>
        <h1>Gerenciando Entregas</h1>
        <TopActions>
          <Search
            name="Produtos"
            datamodel="deliveries"
            dataset={searchResult}
          />
          <Link to="/delivery/register">
            <div>
              <MdAdd size={18} />
              Cadastrar
            </div>
          </Link>
        </TopActions>
      </TopHeader>

      <WrapperTable>
        <table>
          <thead>
            <tr>
              <th align="center">ID</th>
              <th align="left">Destinatário</th>
              <th align="left">Entregador</th>
              <th align="left">Cidade</th>
              <th align="left">Estado</th>
              <th align="left">Status</th>
              <th align="center">Ações</th>
            </tr>
          </thead>
          <tbody>
            <DialogOverlay
              style={{ background: 'hsla(0, 0%, 40%, 0.8)' }}
              isOpen={showDialog}
              onDismiss={close}
            >
              <DialogContent
                aria-label="Informações da encomenda"
                style={{
                  padding: '20px',
                  maxWidth: '400px',
                  minHeight: '500px'
                }}
              >
                <h4>
                  <strong>Informações da encomenda</strong>
                </h4>
                <p>
                  {dialogContent.street} {dialogContent.housenumber}
                </p>
                <p>
                  {dialogContent.city} - {dialogContent.state}
                </p>
                <br />
                <p>
                  <strong>Retirada:</strong>
                  {dialogContent.start_date}
                </p>
                <p>
                  <strong>Entrega:</strong>
                  {dialogContent.end_date}
                </p>
                <br />
                <p>
                  <strong style={{ textAlign: 'left' }}>
                    Assinatura do destinatário
                  </strong>
                  <div style={{ textAlign: 'center' }}>
                    {dialogContent.signature ? (
                      <img
                        src={dialogContent.signature}
                        width="200"
                        alt="Assinatura"
                      />
                    ) : (
                      <strong>Assinatura não registrada</strong>
                    )}
                  </div>
                </p>
              </DialogContent>
            </DialogOverlay>
            {deliveries.map(delivery => (
              <tr key={delivery.id}>
                <td align="center">#{leftpad(delivery.id, 3, 0)}</td>
                <td align="left" width="20%">
                  {delivery.recipient.name}
                </td>
                <td align="left" width="20%">
                  <Avatar
                    src={
                      delivery.deliveryman.avatar_id
                        ? delivery.deliveryman.avatar.url
                        : 'null'
                    }
                    round="50px"
                    textSizeRatio={2}
                    size="60"
                    title={delivery.deliveryman.name}
                    alt={delivery.deliveryman.name}
                    maxInitials={2}
                    color="#F4EFFC"
                    fgColor={Avatar.getRandomColor(delivery.deliveryman.name, [
                      '#A28FD0',
                      '#CB946C',
                      '#83CEC9',
                      '#CC7584',
                      '#A8D080',
                      '#CCCC8B'
                    ])}
                    name={delivery.deliveryman.name}
                  />
                  <span>{delivery.deliveryman.name}</span>
                </td>
                <td>{delivery.recipient.city}</td>
                <td>{delivery.recipient.state}</td>
                <td>{getStatus(delivery)}</td>
                <td>
                  <Menu>
                    <MenuButton>...</MenuButton>
                    <CustomMenuList>
                      <MenuItem onSelect={() => handleView(delivery)}>
                        <WrapperIcons>
                          <MdVisibility size={16} color="#4D85EE" />
                          Visualizar
                        </WrapperIcons>
                      </MenuItem>
                      <MenuItem
                        onSelect={() =>
                          history.push(`deliveries/edit/${delivery.id}`)
                        }
                      >
                        <WrapperIcons>
                          <MdEdit size={16} color="#4D85EE" />
                          Editar
                        </WrapperIcons>
                      </MenuItem>
                      <MenuItem onSelect={() => handleExcluir(delivery.id)}>
                        <WrapperIcons>
                          <MdDelete size={16} color="#DE3B3B" />
                          Deletar
                        </WrapperIcons>
                      </MenuItem>
                    </CustomMenuList>
                  </Menu>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </WrapperTable>
    </Container>
  );
}
