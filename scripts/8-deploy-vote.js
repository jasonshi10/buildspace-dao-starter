import sdk from "./1-initialize-sdk.js";

const appModule = sdk.getAppModule(
    "0x358d2AFE5cF0E2DEe4cd1A312cc28aB55FAFd850",
);

(async () => {
    try {
        const voteModule = await appModule.deployVoteModule({
            name: "Magic DAO's Epic Proposals",
            votingTokenAddress: "0xF7396B0626D5b80A508773de2e9699B8689C7815",
            proposalStartWaitTimeInSeconds: 0,
            proposalVotingTimeInSeconds: 24 * 60 * 60,
            votingQuorumFraction: 0,
            minimumNumberOfTokensNeededToPropose: "0",
        });

        console.log(
            "✅ Successfully deployed vote module, address:",
            voteModule.address,
        );
    } catch (err) {
        console.error("failed to deploy vote module", err);
    }
}) ();