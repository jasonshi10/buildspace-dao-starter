import { ethers } from "ethers";
import sdk from "./1-initialize-sdk.js";

const tokenModule = sdk.getTokenModule(
    "0xF7396B0626D5b80A508773de2e9699B8689C7815",
    );

(async () => {
    try {
        const amount = 1_000_000;
        const amountWith18Decimals = ethers.utils.parseUnits(amount.toString(), 18);
        await tokenModule.mint(amountWith18Decimals);
        const totalSupply = await tokenModule.totalSupply();

        console.log(
            "✅ There is",
            ethers.utils.formatUnits(totalSupply, 18),
            "$MAGIC in circulation",
        );
    } catch (error) {
        console.error("failed to print money", error);
    }
})();