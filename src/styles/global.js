import { createGlobalStyle } from 'styled-components';
import 'react-perfect-scrollbar/dist/css/styles.css';
import 'react-toastify/dist/ReactToastify.css';

export default createGlobalStyle`
  *{
    margin:0;
    padding:0;
    outline:0;
    box-sizing: border-box;    
  }

  *:focus{
    outline:0;
  }

  html,body,#root{
    height:100%;    
  }


  body{
    -webkit-font-smoothing: antialiased!important;  
    color:#666666;
  }

  body, input, button{
    font: 14px 'Roboto', sans-serif;    
  }

  a{
    text-decoration: none;
  }  

  ul{
    list-style: none;
  }

  button{
    cursor: pointer;
  }

  button[name="drop"]{
    border: none;
    cursor: pointer;  
    padding: 10px;
    font-size: 21px;
    color: #000;
  }
  .menu-drop{
    display: inline-block;
    position: relative;
  }
  .drop-content{
    display: none;    
    padding:10px;
    border: solid 1px #ccc;
    border-radius: 2px;
    background-color: #FFF;
    position: absolute;
    z-index: 1;
  }
  .drop-content a{
    color: #ccc;
    padding: 8px 10px;
    text-decoration: none;
    display: block;
  }
  .drop-content a:hover{ 
    color: #000;
  }

  

`;
