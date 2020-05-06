import styled from 'styled-components';
import { MenuList } from '@reach/menu-button';

export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0;
`;

export const TopHeader = styled.div`
  flex: 1;
  padding: 20px 0px;
  h1 {
    font-size: 24px;
    font-weight: bolder;
    color: #444444;
    margin-bottom: 20px;
    align-content: center;
    align-items: center;
  }
`;

export const TopActions = styled.div`
  display: flex;
  justify-content: space-between;
  align-content: center;
  align-items: center;

  a {
    height: 36px;
    background: #7d40e7;
    color: #fff;
    border-radius: 4px;
    border: 1px solid #7d40e7;
    padding: 8px 20px 0 20px;
    text-transform: uppercase;
    font-weight: bold;
    font-size: 14px;

    div {
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }

  button {
    height: 36px;
    background: #7d40e7;
    color: #fff;
    border-radius: 4px;
    border: 1px solid #7d40e7;
    padding: 0 10px;
    text-transform: uppercase;
    font-weight: bold;
    font-size: 11px;
  }
`;

export const WrapperTable = styled.div`
  padding: 0px;

  table {
    width: 100%;
    border-collapse: separate;
    border-spacing: 0 10px;
    font-size: 16px;
  }

  table tr {
    background: #fff;
  }

  table tr th {
    text-transform: uppercase;
    border: none;
    background: #f2f2f2;
    padding: 10px;
  }

  table tr:last-child {
    border: none;
  }

  table tr:hover {
    background-color: #f8f8ff;
  }

  table td {
    padding: 10px;
  }
  table td:last-child,
  table th:last-child {
    text-align: center;
  }

  table tr:last-child td {
    border: none;
  }

  table button {
    border: 0;
    background: #fff;
    padding: 0 10px;
  }
`;

export const CustomMenuList = styled(MenuList)`
  border: solid 1px #00000026;
  background: #ffffff;
  > [data-reach-menu-item] {
    display: block;
    background: #ffffff;
    color: #999999;
    font-size: 16px;
  }
  > [data-reach-menu-item][data-selected] {
    background: #ffffff;
    color: #000000;
  }
`;

export const WrapperIcons = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px;

  span {
    text-align: left;
  }

  svg {
    margin-right: 10px;
    text-align: center;
    width: 20px;
  }
`;
