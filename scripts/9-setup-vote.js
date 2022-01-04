import { ethers } from "ethers";
import sdk from "./1-initialize-sdk.js";

const voteModule = sdk.getVoteModule(
    "0x405D4e878B0cb28617acbc51531bFf2CD51491ff",
);

const tokenModule = sdk.getTokenModule(
    "0xF7396B0626D5b80A508773de2e9699B8689C7815",
);

(async () => {
    try {
        await tokenModule.grantRole("minter", voteModule.address);

        console.log(
            "successfully gave vote module permissions to act on token module."
        );
    } catch (error) {
        console.error(
            "failed to grant vote module permissions on token module",
            error
        );
        process.exit(1);
    }

    try {
        const ownedTokenBalance = await tokenModule.balanceOf(
            process.env.WALLET_ADDRESS
        );

        const ownedAmount = ethers.BigNumber.from(ownedTokenBalance.value);
        const percent90 = ownedAmount.div(100).mul(90);

        await tokenModule.transfer(
            voteModule.address,
            percent90
        );
        console.log("✅ Successfully transferred tokens to vote module");
    } catch (err) {
        console.error("failed to transfer tokens to vote module", err);
    }
}) ();