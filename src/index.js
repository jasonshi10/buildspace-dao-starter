import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App.jsx";
// import thirdweb
import { ThirdwebWeb3Provider } from '@3rdweb/hooks';
// include what chain you want to support, 4 is rinkeby
const supportedChainIds = [4];
// include which type of wallet, metamask is injected wallet.
const connectors = {
  injected: {},
};

// Render the App component to the DOM
ReactDOM.render(
  <React.StrictMode>
    <ThirdwebWeb3Provider
      connectors = {connectors}
      supportedChainIds = {supportedChainIds}
    >
      <App />
    </ThirdwebWeb3Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
