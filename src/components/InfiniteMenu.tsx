import React from 'react';
import './InfiniteMenu.css';

export interface InfiniteMenuItem {
  image: string;
  link: string;
  title: string;
  description: string;
}

export interface InfiniteMenuProps {
  items?: InfiniteMenuItem[];
  scale?: number;
}

export const InfiniteMenu: React.FC<InfiniteMenuProps> = () => {
  return <div className="infinite-menu-stub" style={{ display: 'none' }} />;
};

export default InfiniteMenu;