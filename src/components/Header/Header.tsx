import { Link, useLocation } from 'react-router-dom';
import styles from './Header.module.scss';

interface MenuItems {
  title: string;
  to: string;
}

function Header() {
  const links: MenuItems[] = [
    { title: 'Main', to: '/' },
    { title: 'Uncontrolled Form', to: '/uncontroll' },
    { title: 'React Hook Form', to: '/hook' },
  ];

  const { pathname } = useLocation();

  return (
    <>
      <nav className={styles.menu}>
        <ul className={styles.items}>
          {links.map((link) => (
            <li key={link.title}>
              <Link
                className={`${styles.link} ${
                  link.to === pathname ? ` ${styles.active}` : ''
                }`}
                to={link.to}
              >
                {link.title}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}

export default Header;
