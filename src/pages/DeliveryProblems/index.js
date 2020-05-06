import React, { useState, useEffect } from 'react';
import { MdVisibility, MdDelete } from 'react-icons/md';
import leftpad from 'left-pad';
import { Menu, MenuButton, MenuItem } from '@reach/menu-button';
import '@reach/menu-button/styles.css';
import { DialogOverlay, DialogContent } from '@reach/dialog';
import '@reach/dialog/styles.css';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

// import history from '~/services/history';

import {
  Container,
  TopHeader,
  WrapperTable,
  CustomMenuList,
  WrapperIcons
} from './styles';

import api from '~/services/api';

export default function DeliveryProblems() {
  const [problems, setProblems] = useState([]);

  const [showDialog, setShowDialog] = useState(false);
  const [dialogContent, setDialogContent] = useState();

  // const open = () => setShowDialog(true);

  const close = () => setShowDialog(false);

  useEffect(() => {
    async function getProblems() {
      const response = await api.get('delivery/problems');
      // console.tron.log(response.data);
      setProblems(response.data);
    }
    getProblems();
  }, []);

  function handleExcluir(id) {
    confirmAlert({
      title: 'Confirmação',
      message: 'Deseja realmente excluir?',
      buttons: [
        {
          label: 'Sim',
          onClick: async () => {
            const result = await api.delete(`delivery-problem/${id}`);
            console.tron.log(result.data);
            setProblems(result.data);
          }
        },
        {
          label: 'Não'
        }
      ]
    });
  }

  async function handleView(data) {
    await setDialogContent(data);
    setShowDialog(true);
  }

  return (
    <Container>
      <TopHeader>
        <h1>Problemas de Entrega</h1>
      </TopHeader>

      <WrapperTable>
        <table>
          <thead>
            <tr>
              <th align="center" width="10%">
                ID
              </th>
              <th align="left">Problema</th>
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
                style={{
                  padding: '20px',
                  maxWidth: '400px',
                  minHeight: '500px'
                }}
              >
                <h4>Visualizar Problema</h4>
                <br />
                <p>{dialogContent}</p>
              </DialogContent>
            </DialogOverlay>
            {problems.map(problem => (
              <tr key={problem.id}>
                <td align="center">#{leftpad(problem.delivery_id, 3, 0)}</td>
                <td>{problem.description}</td>
                <td>
                  <Menu>
                    <MenuButton>...</MenuButton>
                    <CustomMenuList>
                      <MenuItem
                        onSelect={() => handleView(problem.description)}
                      >
                        <WrapperIcons>
                          <MdVisibility size={16} color="#4D85EE" />
                          Visualizar
                        </WrapperIcons>
                      </MenuItem>
                      <MenuItem onSelect={() => handleExcluir(problem.id)}>
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
