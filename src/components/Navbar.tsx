import { FC, PropsWithChildren } from 'react';
import { NavLink } from 'react-router-dom';

interface NavItemProps extends PropsWithChildren {
  to: string;
}

const Navbar: FC = () => {
  return (
    <div className='navbar fixed bottom-0 left-0 w-full'>
      <ul className='menu justify-around menu-horizontal px-1 w-full'>
        <NavItem to='/'>Farm</NavItem>
        <NavItem to='/upgrades'>Upgrade</NavItem>
        <NavItem to='/boss'>Boss</NavItem>
        <NavItem to='/fortuneWheel'>Fortune Wheel</NavItem>
      </ul>
    </div>
  );
};

const NavItem: FC<NavItemProps> = ({ to, children }) => (
  <li>
    <NavLink className={({ isActive }) => (isActive ? 'btn btn-active btn-neutral' : 'btn btn-outline')} to={to}>
      {children}
    </NavLink>
  </li>
);

export default Navbar;
