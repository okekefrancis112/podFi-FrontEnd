// import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ModalProvider } from "@particle-network/connect-react-ui"; // @particle-network/connectkit to use Auth Core
import { WalletEntryPosition } from "@particle-network/auth";
import { EthereumSepolia, ScrollSepolia } from "@particle-network/chains";
import { evmWallets } from "@particle-network/connect";

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>

  <ModalProvider
    options={{
      projectId: "9e183e6c-b705-49db-8025-8247b0853814",
      clientKey: "cyJM93OZmgfoB7WjqVunbE2WDhxJBncV1GqLlJrM",
      appId: "ccf38e2b-c2ab-4f72-bbe0-b169761b6bcb",
      chains: [EthereumSepolia, ScrollSepolia],
      particleWalletEntry: {
        //optional: particle wallet config
        displayWalletEntry: true, //display wallet button when connect particle success.
        defaultWalletEntryPosition: WalletEntryPosition.BR,
        supportChains: [EthereumSepolia, ScrollSepolia],
        customStyle: {}, //optional: custom wallet style
      },
      securityAccount: {
        //optional: particle security account config
        //prompt set payment password. 0: None, 1: Once(default), 2: Always
        promptSettingWhenSign: 1,
        //prompt set master password. 0: None(default), 1: Once, 2: Always
        promptMasterPasswordSettingWhenLogin: 1,
      },
      wallets: evmWallets({
        projectId: "walletconnect projectId", //replace with walletconnect projectId
        showQrModal: false,
      }),
    }}
    theme={"auto"}
    language={"en"} //optional:localize, default en
    walletSort={["Particle Auth", "Wallet"]} //optional:walelt order
    particleAuthSort={[
      //optional:display particle auth items and order
      "email",
      "phone",
      "google",
      "apple",
      "facebook",
    ]}
  >
    <App />
  </ModalProvider>
  // {/* </React.StrictMode>, */}
);
