import {
  isOnChain,
  isRejected,
  NetworkType,
  TransactionStatus,
  TransactionStatusFriendlyMessage,
  TransactionStatusStep,
} from "@starkware-industries/commons-js-enums";
import { getFullTime } from "@starkware-industries/commons-js-utils";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { PlusSquareIcon, MinusSquareIcon } from "lucide-react";
import { STARKSCAN_TX_URL, STARKSCAN_ETH_TX_URL } from "@/constants/env";
import { Button } from "./ui/button";
import LordsIcon from "@/icons/lords.svg";
import { cn } from "../lib/utils";
import { ExternalLinkIcon } from "lucide-react";
import { DepositEvent, WithdrawalEvent } from "@/.graphclient";
import { formatEther } from "viem";


export const TransferLog = ({
  transfer,
  isL1,
  onCompleteTransferClick,
}: {
  transfer: any;
  isL1: boolean;
  onCompleteTransferClick: () => void;
}) => {
  const [sign, setSign] = useState("");

  const { l1Recipent, depositEvents, withdrawalEvents, createdTimestamp } =
    transfer;

  const {
    status,
    id,
    //l2Recipient,
    amount,
    createdTxHash,
    finishedTxHash: l1hash,
    finishedAtDate,
  }: DepositEvent | WithdrawalEvent = depositEvents?.[0] ||
  withdrawalEvents?.[0] ||
    transfer;

  const l2hash = "0xtest";


  useEffect(() => {
    const action = isL1 ? 1 : 2;
    const type = depositEvents ? 1 : 2;
    setSign(type === action ? "-" : "+");
  }, [isL1, depositEvents]);

  const typedStatus = status as TransactionStatus;

  const renderTransferStatus = () => {
    return (
      <div
        className={cn("text-gray h-6", isRejected(typedStatus) && "text-red")}
      >
        {!isOnChain(typedStatus)
          ? TransactionStatusFriendlyMessage[
          typedStatus || TransactionStatus.NOT_RECEIVED
          ]
          : ""}
      </div>
    );
  };

  const needsActions = !l1hash && isL1 && isOnChain(typedStatus)

  const renderL1TxButton = () => {
    return needsActions ? (
      <CompleteTransferButton onClick={onCompleteTransferClick} />
    ) : (
      <Button
        className=" justify-between normal-case"
        size={"xs"}
        variant={"outline"}
        disabled={!l1hash}
        external
        href={STARKSCAN_ETH_TX_URL(l1hash)}
      >
        <span>{`${NetworkType.L1} Tx`}</span>
        <ExternalLinkIcon className="w-3 h-3 ml-2" />
      </Button>
    );
  };

  const renderL2TxButton = () => {
    return (
      <Button
        className=" justify-between normal-case"
        size={"xs"}
        variant={"outline"}
        disabled={
          !l2hash ||
          !status ||
          TransactionStatusStep[typedStatus] <
          TransactionStatusStep[TransactionStatus.RECEIVED]
        }
        rel="noopener noreferrer"
        external
        href={STARKSCAN_TX_URL(l2hash)}
      >
        <span>{`${NetworkType.L2} Tx`}</span>
        <ExternalLinkIcon className="w-3 h-3 ml-2" />
      </Button>
    );
  };

  return (

    <div className="flex justify-between p-4 relative border rounded my-1">
      <div className="flex self-center">
        <LordsIcon className="fill-white w-8 h-8 mr-3 self-center" />
        <div>
          <div className="text-gray-400 text-xs font-semibold ">{`${getFullTime(
            createdTimestamp * 1000
          )}`}</div>
          <div className="text-xl font-semibold flex">{sign == '-' ? <MinusSquareIcon className="mr-1 self-center" /> : <PlusSquareIcon className="mr-1 self-center" />} {formatEther(amount || 0)} </div>

        </div>
      </div>
      <div className="flex flex-col items-end justify-around">
        {renderTransferStatus()}
        <div className="flex items-center my-1 space-x-2">
          {renderL1TxButton()}
          {/* {renderL2TxButton()} */}
        </div>
      </div>
    </div>

  );
};

const CompleteTransferButton = ({ onClick }: { onClick: any }) => {
  return (
    <Button
      variant={"outline"}

      size={"xs"}
      onClick={onClick}
    >
      Complete Transfer
    </Button>
  );
};

CompleteTransferButton.propTypes = {
  onClick: PropTypes.func,
};

TransferLog.propTypes = {
  transfer: PropTypes.object,
  onCompleteTransferClick: PropTypes.func,
  onTxClick: PropTypes.func,
};
