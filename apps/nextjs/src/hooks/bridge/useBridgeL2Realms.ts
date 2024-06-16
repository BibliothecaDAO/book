import { useCallback, useMemo } from "react";
import ERC721ABI from "@/abi/L2/ERC721.json";
import { SUPPORTED_L2_CHAIN_ID } from "@/constants/env";
import { TransactionType } from "@/constants/transactions";
import { useTransactionManager } from "@/stores/useTransasctionManager";
import {
  useAccount,
  useContractRead,
  useContractWrite,
} from "@starknet-react/core";

import {
  Collections,
  getCollectionAddresses,
  REALMS_BRIDGE_ADDRESS,
} from "@realms-world/constants";
import { toast } from "@realms-world/ui";

import { useERC721Approval } from "../token/starknet/useERC721Approval";
import useStore from "../useStore";
import { useWriteInitiateWithdrawRealms } from "./useWriteInitiateWithdrawRealms";

export function useBridgeL2Realms({
  selectedTokenIds,
}: {
  selectedTokenIds: string[];
}) {
  const l2BridgeAddress = REALMS_BRIDGE_ADDRESS[SUPPORTED_L2_CHAIN_ID];
  const { address } = useAccount();
  const l2RealmsAddress = getCollectionAddresses(Collections.REALMS)?.[
    SUPPORTED_L2_CHAIN_ID
  ] as `0x${string}`;

  const { data: isApprovedForAll } = useContractRead({
    abi: ERC721ABI,
    address: l2RealmsAddress,
    args: l2BridgeAddress ? [address ?? "0xtest", l2BridgeAddress] : [],
    functionName: "is_approved_for_all",
    watch: true,
  });

  const { calls: approveCall } = useERC721Approval({
    contractAddress: l2RealmsAddress,
    operator: l2BridgeAddress as `0x${string}`,
  });

  const { calls: depositCall } = useWriteInitiateWithdrawRealms({
    selectedTokenIds,
  });

  const depositCalls = useMemo(() => {
    if (!isApprovedForAll) {
      return [...approveCall, ...depositCall];
    }
    return [...depositCall];
  }, [approveCall, depositCall, isApprovedForAll]);

  const { writeAsync, ...writeReturn } = useContractWrite({
    calls: depositCalls,
  });

  const transactions = useStore(useTransactionManager, (state) => state);

  const initiateWithdraw = useCallback(async () => {
    const tx = await writeAsync();
    transactions?.addTx({
      hash: tx.transaction_hash,
      type: TransactionType.BRIDGE_REALMS_L2_TO_L1_INITIATE,
      chainId: SUPPORTED_L2_CHAIN_ID,
      status: "pending",
      timestamp: new Date(Date.now()),
    });
    toast({
      title: TransactionType.BRIDGE_REALMS_L2_TO_L1_INITIATE,
      description: `${selectedTokenIds.length} Realms will be ready to withdraw on Ethereum in ~12 hours`,
    });
  }, [writeAsync, transactions, selectedTokenIds.length]);

  return {
    isApprovedForAll,
    initiateWithdraw,
    ...writeReturn,
  };
}