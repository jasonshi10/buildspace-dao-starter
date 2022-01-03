import { ethers } from "ethers";
import sdk from "./1-initialize-sdk.js";
import { readFileSync } from "fs";

// insert app address from running 1-initialized-sdk.js
const app = sdk.getAppModule("0x358d2AFE5cF0E2DEe4cd1A312cc28aB55FAFd850");

(async () => {
    try {
        const bundleDropModule = await app.deployBundleDropModule({
            name: "MagicDAO Membership",
            description: "A DAO for members of MAGIC.",
            image: readFileSync("scripts/assets/magicdao.jpg"),
            primarySaleRecipientAddress: ethers.constants.AddressZero,
        });

        console.log(
            "✅ successfully deployed bundleDrop module, address:",
            bundleDropModule.address,
        );

        console.log(
            "✅  bundleDrop metadata:",
            await bundleDropModule.getMetadata(),
        );
    } catch (error) {
        console.log("failed to deploy bundleDrop module", error);
    }
}) ()