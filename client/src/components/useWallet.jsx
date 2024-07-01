import { createContext, useContext, useEffect, useState } from "react";
import Web3Modal from "web3modal";
import { Web3Provider } from "@ethersproject/providers";

const SignerContext = createContext();

const useSigner = () => useContext(SignerContext);

export const SignerProvider = ({ children }) => {
  const [signer, setSigner] = useState();
  const [address, setAddress] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const web3modal = new Web3Modal();
    if (web3modal.cachedProvider) connectWallet();
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", connectWallet);
    }
  }, []);

  const connectWallet = async () => {
    setLoading(true);
    try {
      const web3modal = new Web3Modal({ cacheProvider: true });
      const instance = await web3modal.connect();
      const provider = new Web3Provider(instance);
      const signer = provider.getSigner();
      const address = await signer.getAddress();
      setSigner(signer);
      setAddress(address);
    } catch (e) {
      console.log(e);
    }
    setLoading(false);
  };

  const contextValue = { signer, address, loading, connectWallet };

  return (
    <SignerContext.Provider value={contextValue}>
      {children}
    </SignerContext.Provider>
  );
};

export default useSigner;

const AddressAvatar = ({ address }) => {
  const shortAddress = address ? `${address.substring(0, 5)}...${address.substring(address.length - 4)}` : '';

  return (
    <div className="flex h-10 items-center">
      <img
        src={`https://avatars.dicebear.com/api/identicon/${address}.svg`}
        alt="avatar"
        className="mr-2 rounded-full h-10 w-10"
      />
      <span>{shortAddress}</span>
    </div>
  );
};

export const ConnectButton = () => {
  const { address, loading, connectWallet } = useSigner();

  if (address) return <AddressAvatar address={address} />;
  return (
    <button
      className="flex h-10 w-36 items-center justify-center rounded-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4"
      onClick={connectWallet}
      disabled={loading}
    >
      {loading ? "Busy..." : "Connect Wallet"}
    </button>
  );
};
