import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
// import Notifications from '~/components/Notifications';
import logo from '~/assets/fastfeet-logo.png';

import { Container, Content, Profile } from './styles';

export default function Header() {
  const profileData = useSelector(state => state.user.profile);

  return (
    <Container>
      <Content>
        <nav>
          <img src={logo} width="135" alt="Fast Feet" />
          <NavLink
            to="/deliveries"
            activeClassName="active"
            strict={false}
            activeStyle={{ fontWeight: 'bold', color: '#000' }}
          >
            ENCOMENDAS
          </NavLink>
          <NavLink
            to="/deliverymen"
            activeClassName="active"
            strict={false}
            activeStyle={{ fontWeight: 'bold', color: '#000' }}
          >
            ENTREGADORES
          </NavLink>
          <NavLink
            to="/recipients"
            activeClassName="active"
            strict={false}
            activeStyle={{ fontWeight: 'bold', color: '#000' }}
          >
            DESTINATÁRIOS
          </NavLink>
          <NavLink
            to="/delivery-problems"
            activeClassName="active"
            strict={false}
            activeStyle={{ fontWeight: 'bold', color: '#000' }}
          >
            PROBLEMAS
          </NavLink>
        </nav>
        <aside>
          <Profile>
            <div>
              <strong>{profileData.name}</strong>
              <a href="/logout">sair do sistema</a>
            </div>
          </Profile>
        </aside>
      </Content>
    </Container>
  );
}
