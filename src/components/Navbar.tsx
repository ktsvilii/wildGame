import { FC, PropsWithChildren } from 'react';
import { NavLink } from 'react-router-dom';

interface NavItemProps extends PropsWithChildren {
  to: string;
  disabled?: boolean;
}

const Navbar: FC = () => {
  return (
    <div className='navbar w-full'>
      <ul className='menu justify-around menu-horizontal px-1 w-full'>
        <NavItem to='/'>Farm</NavItem>
        <NavItem to='/upgrades'>Upgrade</NavItem>
        <NavItem to='/boss'>Tasks</NavItem>
      </ul>
    </div>
  );
};

const NavItem: FC<NavItemProps> = ({ to, children, disabled = false }) => {
  return (
    <li>
      <NavLink
        className={({ isActive }) =>
          disabled ? 'btn disabled' : isActive ? 'btn btn-active btn-neutral' : 'btn btn-outline'
        }
        to={disabled ? '#' : to}
        onClick={e => {
          if (disabled) {
            e.preventDefault();
          }
        }}
      >
        {children}
      </NavLink>
    </li>
  );
};

export default Navbar;
