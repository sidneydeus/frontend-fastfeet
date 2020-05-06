import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MdEdit, MdDelete, MdAdd } from 'react-icons/md';
import leftpad from 'left-pad';
import { Menu, MenuButton, MenuItem } from '@reach/menu-button';
import '@reach/menu-button/styles.css';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
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

export default function Recipients() {
  const [recipients, setRecipients] = useState([]);
  const searchResult = data => {
    setRecipients(data);
    // console.tron.log(data);
  };
  useEffect(() => {
    async function getRecipients() {
      const response = await api.get('recipients');
      console.tron.log(response.data);
      setRecipients(response.data);
    }
    getRecipients();
  }, []);

  function handleExcluir(id) {
    confirmAlert({
      title: 'Confirmação',
      message: 'Deseja realmente excluir?',
      buttons: [
        {
          label: 'Sim',
          onClick: async () => {
            const result = await api.delete(`recipients/${id}`);
            setRecipients(result.data);
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
        <h1>Gerenciando Destinatários</h1>
        <TopActions>
          <Search
            name="destinatários"
            datamodel="recipients"
            dataset={searchResult}
          />
          <Link to="/recipients/register">
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
              <th align="left" width="30%">
                Nome
              </th>
              <th align="left" width="30%">
                Endereço
              </th>
              <th align="center">Ações</th>
            </tr>
          </thead>
          <tbody>
            {recipients.map(recipient => (
              <tr key={recipient.id}>
                <td align="center">#{leftpad(recipient.id, 3, 0)}</td>
                <td>{recipient.name}</td>
                <td>
                  {recipient.street}, {recipient.housenumber}, {recipient.city}
                  {' - '}
                  {recipient.state}, {recipient.zipcode}
                </td>
                <td>
                  <Menu>
                    <MenuButton>...</MenuButton>
                    <CustomMenuList>
                      <MenuItem
                        onSelect={() =>
                          history.push(`recipients/edit/${recipient.id}`)
                        }
                      >
                        <WrapperIcons>
                          <MdEdit size={16} color="#4D85EE" />
                          Editar
                        </WrapperIcons>
                      </MenuItem>
                      <MenuItem onSelect={() => handleExcluir(recipient.id)}>
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
