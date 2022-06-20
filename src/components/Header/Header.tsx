import { Link } from 'react-router-dom';
import './Header.css';

type HeaderProps = {
  onClick() : void
}

export const Header: React.FC<HeaderProps> = (props) => {
  return (
  <header className="header">
    <Link className="header__exit" to="/" onClick={props.onClick}>Выйти</Link>
  </header>
)};
