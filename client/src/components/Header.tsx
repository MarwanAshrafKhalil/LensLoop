import logo from "../assets/logo.png";
import "../styles/header.css";

export default function Header() {
  return (
    <header className="header">
      <nav className="nav">
        <img className="header_logo" src={logo} alt="logo" />
      </nav>
    </header>
  );
}
