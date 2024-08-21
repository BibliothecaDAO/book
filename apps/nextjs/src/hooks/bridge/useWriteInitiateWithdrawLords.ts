import type { Call } from "starknet";
import { useMemo } from "react";
import L2BridgeABI from "@/abi/L2/LordsBridge.json";
import { SUPPORTED_L2_CHAIN_ID } from "@/constants/env";
import {
  useContract,
  useSendTransaction as useL2ContractWrite,
} from "@starknet-react/core";
import { parseEther } from "viem";
import { useAccount as useL1Account } from "wagmi";

import { LORDS_BRIDGE_ADDRESS } from "@realms-world/constants";

export const useWriteInitiateWithdrawLords = ({
  amount,
}: {
  amount: string | null;
}) => {
  const { address: addressL1 } = useL1Account();

  const l2BridgeAddress = LORDS_BRIDGE_ADDRESS[SUPPORTED_L2_CHAIN_ID];
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { contract } = useContract({
    // @ts-expect-error check starknet-react type
    abi: L2BridgeABI,
    address: l2BridgeAddress as `0x${string}`,
  });

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const calls: Call[] = useMemo(() => {
    if (!amount || !addressL1) return [];
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return [
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
      contract?.populate("initiate_withdrawal", [
        addressL1,
        {
          low: parseEther(amount),
          high: 0,
        },
      ]),
    ];
  }, [addressL1, amount, contract]);

  const { sendAsync, data: withdrawHash } = useL2ContractWrite({ calls });

  return {
    calls,
    sendAsync,
    withdrawHash,
  };
};
