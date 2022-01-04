import { useEffect, useMemo, useState } from "react";
import { ThirdwebSDK } from "@3rdweb/sdk";
import { useWeb3 } from "@3rdweb/hooks";

// instantiate the sdk on rinkeby.
const sdk = new ThirdwebSDK("rinkeby");

// grab a reference to erc-1155 contract
const bundleDropModule = sdk.getBundleDropModule(
  "0xDEEf60Cceb76BfF3A533810DaB7A68210CAd0D78",
);

const App = () => {
  const { connectWallet, address, error, provider } = useWeb3();
  console.log("hi 👋 address:", address)

  const signer = provider ? provider.getSigner() : undefined;

  // state variable for us to know if user has our nft
  const [hasClaimedNFT, setHasClaimedNFT] = useState(false);

  const [isClaiming, setIsClaiming] = useState(false);

  useEffect(() => {
    sdk.setProviderOrSigner(signer);
  }, [signer]);

  useEffect(() => {
    if (!address) {
      return;
    }

    return bundleDropModule
    .balanceOf(address, '0')
    .then((balance) => {
      if (balance.gt(0)) {
        setHasClaimedNFT(true);
        console.log("🌟 this user has a membership NFT!")
      } else {
        setHasClaimedNFT(false);
        console.log("😭 this user doesn't have a membership NFT.")
      }
    })
    .catch((error) => {
      setHasClaimedNFT(false);
      console.error("failed to nft balance", error);
    });
  }, [address]);

  if(!address) {
    return (
      <div className='landing'>
        <h1>Welcome to BIG MAGIC DAO 🔮</h1>
        <button onClick={() => connectWallet("injected")} className="btn-hero">
          connect your wallet
        </button>
      </div>
    );
  }

  if (hasClaimedNFT) {
    return (
      <div className="member-page">
        <h1>MAGIC DAO Member Page</h1>
        <p> 🥳 Welcome! Congratulations on being a member :-) </p>
      </div>
    )
  }

  const mintNft = () => {
    setIsClaiming(true);
    bundleDropModule
    .claim("0", 1)
    .then(() => {
      setHasClaimedNFT(true);
      console.log(
        `🌊 Successfully Minted! Check it out on OpenSea: https://testnets.opensea.io/assets/${bundleDropModule.address}/0`
      );
    })
    .catch((err) => {
      console.error("failed to claim", err);
    })
    .finally(() => {
      setIsClaiming(false);
    });
  }

  return (
    <div className="mint-nft">
      <h1>Mint your 🔮 MAGIC DAO Membership NFT</h1>
      <button
        disabled={isClaiming}
        onClick={() => mintNft()}
      >
        {isClaiming ? "Minting..." : "Mint your nft (FREE)"}
      </button>
    </div>
  );
};

export default App;
