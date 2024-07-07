import React from "react";
import { ConnectButton } from "./useWallet";

const Navbar = ({setWalletConnected}) => {
  return (
      <header className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3" style={{
        borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
      }}>
        <div className="col-md-3 mb-2 mb-md-0">
          <a
            href="/"
            className="d-inline-flex link-body-emphasis text-decoration-none"
          >
            <svg
              className="bi"
              width="40"
              height="32"
              role="img"
              aria-label="Bootstrap"
            >
              <use xlinkHref="#bootstrap"></use>
            </svg>
          </a>
        </div>

        <ul className="nav col-12 col-md mb-2 mb-md-0" style={{
          display: "flex",
          justifyContent: "space-around",
          paddingRight: "200px",
        
        }}>
          <li>
            <a href="#" className="nav-link px-2 link-secondary">
              Home
            </a>
          </li>
          <li>
            <a href="#" className="nav-link px-2  link-secondary">
              Features
            </a>
          </li>
          <li>
            <a href="#" className="nav-link px-2  link-secondary">
              FAQs
            </a>
          </li>
          <li>
            <a href="#" className="nav-link px-2  link-secondary">
              About
            </a>
          </li>
        </ul>

        <div className="col-md-3 text-end">
          <ConnectButton setWalletConnected={setWalletConnected}/>
        </div>
      </header>
  );
};

export default Navbar;
