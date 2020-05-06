import styled from 'styled-components';

export const Container = styled.div`
  background: #fff;
  padding: 8px;
  border: solid 1px #dddddd;
  border-radius: 4px;
  height: 36px;

  input {
    background: #fff;
    border: none;
    font-size: 14px;
    padding: 0 10px;

    &::-webkit-input-placeholder {
      color: #999999;
    }
  }
`;
