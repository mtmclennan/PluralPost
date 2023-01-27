import React from 'react';
import { Fragment } from 'react';
import NavItem from '../navItem/NavItem';
import { At, PenNibStraight } from 'phosphor-react';

const NavWebsiteEdit = () => {
  const iconColor = '#8626fa';

  return (
    <Fragment>
      <NavItem
        to="/subscribers"
        text="Subscribers"
        icon={<At size={20} color={iconColor} weight="duotone" />}
      />
      <NavItem
        icon={<PenNibStraight size={20} color={iconColor} weight="duotone" />}
        to="/new-post"
        text="Add New Post"
      />
      <NavItem
        icon={<PenNibStraight size={20} color={iconColor} weight="duotone" />}
        to="/posts"
        text="Posts"
      />
    </Fragment>
  );
};

export default NavWebsiteEdit;
