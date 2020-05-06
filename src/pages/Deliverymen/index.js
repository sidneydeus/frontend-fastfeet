import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MdEdit, MdDelete, MdAdd } from 'react-icons/md';
import leftpad from 'left-pad';
import { Menu, MenuButton, MenuItem } from '@reach/menu-button';
import '@reach/menu-button/styles.css';
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
  WrapperIcons
} from './styles';

import api from '~/services/api';

export default function Deliverymen() {
  const [deliverymen, setDeliverymen] = useState([]);
  const searchResult = data => {
    setDeliverymen(data);
  };
  useEffect(() => {
    async function getDeliverymen() {
      const response = await api.get('deliverymen');
      setDeliverymen(response.data);
    }
    getDeliverymen();
  }, []);

  function handleExcluir(id) {
    confirmAlert({
      title: 'Confirmação',
      message: 'Deseja realmente excluir?',
      buttons: [
        {
          label: 'Sim',
          onClick: async () => {
            const result = await api.delete(`deliveryman/${id}`);
            setDeliverymen(result.data);
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
      <TopHeader>
        <h1>Gerenciando Entregadores</h1>
        <TopActions>
          <Search
            name="Entregadores"
            datamodel="deliverymen"
            dataset={searchResult}
          />
          <Link to="/deliverymen/register">
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
              <th align="center" width="10%">
                ID
              </th>
              <th align="center" width="20%">
                Foto
              </th>
              <th align="left" width="30%">
                Nome
              </th>
              <th align="left" width="30%">
                Email
              </th>
              <th align="center">Ações</th>
            </tr>
          </thead>
          <tbody>
            {deliverymen.map(deliveryman => (
              <tr key={deliveryman.id}>
                <td align="center">#{leftpad(deliveryman.id, 3, 0)}</td>
                <td align="center">
                  <Avatar
                    src={
                      deliveryman.avatar_id ? deliveryman.avatar.url : 'null'
                    }
                    round="50px"
                    textSizeRatio={2}
                    size="60"
                    title={deliveryman.name}
                    alt={deliveryman.name}
                    maxInitials={2}
                    color="#F4EFFC"
                    fgColor={Avatar.getRandomColor(deliveryman.name, [
                      '#A28FD0',
                      '#CB946C',
                      '#83CEC9',
                      '#CC7584',
                      '#A8D080',
                      '#CCCC8B'
                    ])}
                    name={deliveryman.name}
                  />
                </td>
                <td width="30%">{deliveryman.name}</td>
                <td width="30%">{deliveryman.email}</td>
                <td>
                  <Menu>
                    <MenuButton>...</MenuButton>
                    <CustomMenuList>
                      <MenuItem
                        onSelect={() =>
                          history.push(`deliverymen/edit/${deliveryman.id}`)
                        }
                      >
                        <WrapperIcons>
                          <MdEdit size={16} color="#4D85EE" />
                          Editar
                        </WrapperIcons>
                      </MenuItem>
                      <MenuItem onSelect={() => handleExcluir(deliveryman.id)}>
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
