import React from 'react';
import { useDispatch } from 'react-redux';
import { signOut } from '~/store/modules/auth/actions';
import { Container } from './styles';

export default function Logout() {
  const dispatch = useDispatch();
  function handleLogout() {
    dispatch(signOut());
  }
  handleLogout();

  return (
    <Container>
      <h1>Saindo...</h1>
    </Container>
  );
}
