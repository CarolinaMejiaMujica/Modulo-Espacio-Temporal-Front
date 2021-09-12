import { FaBars } from 'react-icons/fa';
import { NavLink as Link } from 'react-router-dom';
import styled from 'styled-components';

export const Nav = styled.nav`
  background: #003E97;
  height: 65px;
  display: flex;
  font-size: 18px;
  justify-content: space-between;
  padding: 1rem ;
  
  position: fixed;
  z-index: 100;
  width: 100%;
  /*padding: 0.5rem calc((100vw - 1000px) / 2)*/
  z-index: 10;
  /* Third Nav */
  /* justify-content: flex-start; */
`;

export const NavLink = styled.div`
  color: #fff;
  display: flex;
  font-size: 18px;
  align-items: center;
  text-decoration: none;
  padding: 1rem;
  padding-left: 4rem;
  height: 50%;
  margin: 0 auto;
  /*cursor: pointer;
  &.active {
    color: #15cdfc;
  }*/
  @media screen and (max-width: 700px) {
    padding-left: 1rem;
    /*display: none;*/
  }
`;

export const NavDatos = styled.div`
  color: #fff;
  display: flex;
  font-size: 18px;
  align-items: center;
  padding-left: 6rem;
  @media screen and (max-width: 700px) {
    display: none;
  }
`;

export const Bars = styled(FaBars)`
  display: none;
  color: #fff;
  @media screen and (max-width: 768px) {
    display: block;
    position: absolute;
    top: 0;
    right: 0;
    transform: translate(-100%, 75%);
    font-size: 1.8rem;
    cursor: pointer;
  }
`;

export const NavMenu = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 5px;
  /* Second Nav */
  /*margin: 24px;*/
  /* Third Nav */
  /* width: 100vw;
  white-space: nowrap; */
  @media screen and (max-width: 600px) {
    display: none;
  }
`;

export const NavBtn = styled.nav`
  display: flex;
  align-items: center;
  margin-right: 5px;
  /* Third Nav */
  /* justify-content: flex-end;
  width: 100vw; */
  @media screen and (max-width: 700px) {
    display: none;
  }
`;

export const NavBtnLink = styled(Link)`
  border-radius: 5px;
  background: #256ce1;
  padding: 5px 18px;
  text-align: center;
  color: #fff;
  outline: none;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  text-decoration: none;
  /* Second Nav */
  margin-left: 24px;
  &:hover {
    transition: all 0.2s ease-in-out;
    background: #fff;
    color: #010606;
  }
`;