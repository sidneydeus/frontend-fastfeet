import styled from 'styled-components';
import { darken } from 'polished';

export const Wrapper = styled.div`
  height: 100%;
  background: #7d40e7;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Content = styled.div`
  width: 100%;
  max-width: 360px;
  text-align: center;

  form {
    display: flex;
    flex-direction: column;
    margin: 50px auto 0;
  }

  label {
    color: #444444;
    font-weight: bold;
    align-self: flex-start;
    padding: 5px 0;
  }

  input {
    border: 1px solid #dddddd;
    border-radius: 4px;
    height: 44px;
    padding: 0 15px;
    color: #000;
    margin: 0 0 10px;

    &::placeholder {
      color: rgba(153, 153, 153, 1);
    }
  }

  span {
    color: #fb6f91;
    align-self: flex-start;
    margin: 0 0 10px;
    font-weight: bold;
  }

  button {
    margin: 5px 0 0;
    height: 44px;
    background: #7d40e7;
    font-weight: bold;
    color: #fff;
    border: 0;
    border-radius: 4px;
    font-size: 16px;
    transition: background 0.2s;

    &:hover {
      background: ${darken(0.08, '#7d40e7')};
    }
  }

  a {
    color: #fff;
    margin-top: 15px;
    font-size: 16px;
    opacity: 0.8;
    &:hover {
      opacity: 1;
    }
  }
`;
