import Logo from "../assets/logo.png";
import MobileLogo from "../assets/mobile-logo.png";
import "./HomeHeader.css";

export function HomeHeader() {
  return (
    <>
      <div className="header">
        <div className="left-section">
          <a href="/" className="header-a">
            <img className="logo" src={Logo} alt="Logo" />
            <img className="mobile-logo" src={MobileLogo} alt="logo"></img>
          </a>
        </div>

        <div className="middle-section">
          <a href="/">Home</a>
          <a href="/shop">Shop</a>
          <a href="/about">About Us</a>
        </div>

      </div>
    </>
  );
}