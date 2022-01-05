import sdk from "./1-initialize-sdk.js";

const tokenModule = sdk.getTokenModule(
    "0xF7396B0626D5b80A508773de2e9699B8689C7815",
);

(async () => {
    try {
        console.log(
            "👀 Roles that exist right now:",
            await tokenModule.getAllRoleMembers()
        );

        await tokenModule.revokeAllRolesFromAddress(process.env.WALLET_ADDRESS);
        console.log(
            "🎉 Roles after revoking ourselves",
            await tokenModule.getAllRoleMembers()
        );
        console.log("✅ Successfully revoked our superpowers from the ERC-20 contract");
    } catch (error) {
        console.error("Failed to revoke ourselves from the DAO treasury", error);
    }
}) ();