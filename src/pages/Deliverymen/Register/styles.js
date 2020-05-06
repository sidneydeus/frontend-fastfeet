import styled from 'styled-components';

export const Container = styled.div`
  max-width: 900px;
  margin: 0 auto;
  padding: 0;
`;

export const TopHeader = styled.div`
  display: flex;
  padding: 20px 0px;
  h1 {
    font-size: 24px;
    font-weight: bolder;
    color: #444444;
    margin-bottom: 20px;
    flex: 50%;
  }
`;

export const TopActions = styled.div`
  display: flex;
  justify-content: flex-end;
  flex: 50%;

  input {
    height: 32px;
    background: #fff;
    border-radius: 4px;
    border: 1px solid #eee;
    padding: 0 5px;
    font-size: 11px;

    &::-webkit-input-placeholder {
      color: #999999;
    }
  }

  a {
    height: 36px;
    background: #ccc;
    color: #fff;
    border-radius: 4px;
    border: 1px solid #ccc;
    padding: 10px;
    text-transform: uppercase;
    font-weight: bold;
    font-size: 11px;
    margin-right: 10px;
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

export const Link = styled.a`
  height: 36px;
  background: #ccc;
  color: #fff;
  border-radius: 4px;
  border: 1px solid #ccc;
  padding: 10px;
  text-transform: uppercase;
  font-weight: bold;
  font-size: 11px;
  cursor: pointer;
  margin-right: 10px;
`;

export const WrapperForm = styled.div`
  background: #fff;
  padding: 40px 20px 20px;
  border-radius: 4px;

  input {
    height: 45px;
    width: 100%;
    padding: 0 5px;
    border: solid 1px #dddddd;
    border-radius: 4px;
    opacity: 1;
    margin-bottom: 20px;
  }
`;

export const Label = styled.label`
  color: #444444;
  width: 100%;
  display: block;
  font-size: 14px;
  font-weight: bold;
`;

export const WrapperAvatar = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
`;
