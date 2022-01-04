import sdk from "./1-initialize-sdk.js";
// In order to deploy new contract, we need app module from 3rdwaveweb again.
const app = sdk.getAppModule("0x358d2AFE5cF0E2DEe4cd1A312cc28aB55FAFd850");
// Deploy a standard ERC-20 token
(async () => {
    try {
        const tokenModule = await app.deployTokenModule({
            name: "MagicDAO Governance Token",
            symbol: "MAGIC",
        });
        console.log(
            "✅ succesfully deployed token module, address:",
            tokenModule.address,
        );
    } catch (error) {
        console.error("failed to deploy yoken module", error);
    }
}) ();