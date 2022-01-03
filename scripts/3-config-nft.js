import sdk from "./1-initialize-sdk.js";
import { readFileSync } from "fs";
import { Description } from "@ethersproject/properties";

const bundleDrop = sdk.getBundleDropModule(
    "0xDEEf60Cceb76BfF3A533810DaB7A68210CAd0D78",
);

(async () => {
    try {
        await bundleDrop.createBatch([
            {
                name: "MAGIC DAO Kirby Edition",
                description: "This NFT grants you access to MAGIC DAO",
                image: readFileSync("scripts/assets/kirby.jpg"),
            },
        ]);
        console.log("✅ successfully created a new NFT in the drop!");
    } catch (error) {
        console.error("failed to create the new NFT", error);
    }
}) ()