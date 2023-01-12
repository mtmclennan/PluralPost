import React from 'react';
import { NavLink } from 'react-router-dom';
import classes from './NavItem.module.scss';
import { Gear } from 'phosphor-react';

interface NavItemProps {
  to: string;
  icon?: React.ReactNode;
  text: string;
}

const NavItem = ({ to, icon, text }: NavItemProps) => {
  return (
    <li className={classes.nav}>
      <NavLink to={to}>
        {icon ? icon : <Gear size={20} color="#8626fa" weight="duotone" />}
        {text}
      </NavLink>
    </li>
  );
};

export default NavItem;
