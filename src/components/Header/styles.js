import styled from 'styled-components';

export const Container = styled.div`
  background: #fff;
  padding: 0 30px;
  border: solid 1px #dddddd;
`;

export const Content = styled.div`
  height: 64px;
  width: 100%;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;

  nav {
    display: flex;
    align-items: center;

    img {
      margin-right: 20px;
      padding-right: 20px;
      border-right: 1px solid #dddddd;
    }

    a {
      font-weight: bold;
      color: #999;
      padding: 0 10px;
    }
    & :hover {
      color: #000;
    }
  }

  aside {
    display: flex;
    align-items: center;
  }
`;

export const Profile = styled.div`
  display: flex;
  margin-left: 20px;
  padding-left: 20px;
  border-left: 1px solid #ddd;

  div {
    text-align: right;
    margin-right: 10px;

    strong {
      display: block;
      color: #333;
    }
  }

  a {
    display: block;
    margin-top: 2px;
    font-size: 12px;
    color: #EE4D64; 
  }
  a:hover{
    font-weight:bolder;
  }

  }

  img {
    width: 32px;
    height: 32px;
    border-radius: 50%;
  }
  
`;
