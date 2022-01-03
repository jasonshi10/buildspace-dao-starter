import sdk from "./1-initialize-sdk.js";

const bundleDrop = sdk.getBundleDropModule(
    "0xDEEf60Cceb76BfF3A533810DaB7A68210CAd0D78",
);

(async () => {
    try {
        const claimConditionFactory = bundleDrop.getClaimConditionFactory();

        claimConditionFactory.newClaimPhase({
            startTime: new Date(),
            maxQuantity: 50_000,
            maxQuantityPerTransaction: 1,
        });
        // interact with our deployed contract on-chain and adjust the conditions
        // membership NFT has a tokenId of 0 since it's the first token in ERC-1155 contract
        await bundleDrop.setClaimCondition(0, claimConditionFactory);
        console.log("✅ successfully set claim condition on bundle drop:", bundleDrop.address);
    } catch (error) {
        console.error("Failed to set claim condition", error);
    }
}) ()