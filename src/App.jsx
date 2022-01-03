import { useEffect, useMemo, useState } from "react";

import { useWeb3 } from "@3rdweb/hooks";

const App = () => {
  const { connectWallet, address, error, provider } = useWeb3();
  console.log("hi 👋 address:", address)

  if(!address) {
    return (
      <div className='landing'>
        <h1>Welcome to BIG MAGIC DAO</h1>
        <button onClick={() => connectWallet("injected")} className="btn-hero">
          connect your wallet
        </button>
      </div>
    );
  }

  return (
    <div className="landing">
      <h1>YAY wallet connected 😍 </h1>
    </div>
  );
};

export default App;
