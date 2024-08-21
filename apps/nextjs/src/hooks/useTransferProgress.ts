/* eslint-disable @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-return */

import { useMemo } from "react";

const evaluateTemplateVars = (template: any, model: any) => {
  try {
    let reg_1;
    let res_1 = template;
    Object.keys(model).forEach(function (key) {
      let value =
        // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
        model[key] !== undefined && model[key] !== null ? model[key] : "";
      if (typeof value === "string" && value.includes('"')) {
        value = value.replace(/"/g, '\\"');
      }
      reg_1 = new RegExp("{{".concat(key, "}}"), "g");
      res_1 = res_1.replace(reg_1, value);
    });
    return res_1;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (ex) {
    return "";
  }
};
const transferProgressStrings = {
  approval: {
    type: "Approval required",
    message: "Requesting permission to access your Lords funds.",
  },
  deposit: {
    type: "Transfer in progress",
    message: "Transferring confirmation... Lords to Starknet...",
  },
  initiateWithdraw: {
    type: "Initiate transfer",
    message: "Initiating transfer of {{amount}} Lords from Starknet...",
  },
  withdraw: {
    type: "Transfer in progress",
    message: "Transferring {{amount}} Lords to Ethereum...",
  },
  waitForConfirm: {
    type: "{{walletName}} confirmation...",
    message:
      "Do not refresh or close the page while waiting for the operation to be completed.",
  },
  confirmTxt: "Confirm this transaction in your wallet",
  errorTitle: "Transaction error",
  limitationErrorTitle: "Limitation error",
};
export const useTransferProgress = () => {
  return useMemo(
    () => ({
      approval: (symbol: string, activeStep: string) => {
        const { approval } = transferProgressStrings;
        const message = approval.message;
        return {
          type: approval.type,
          message,
          activeStep,
        };
      },
      deposit: (amount: string, symbol: string, activeStep: string) => {
        const { deposit } = transferProgressStrings;
        const message = evaluateTemplateVars(deposit.message, { amount, symbol });
        return {
          type: deposit.type,
          message,
          activeStep,
        };
      },
      initiateWithdraw: (
        amount: number,
        symbol: string,
        activeStep: number,
      ) => {
        const { initiateWithdraw } = transferProgressStrings;
        const message = evaluateTemplateVars(initiateWithdraw.message, { amount, symbol });
        return {
          type: initiateWithdraw.type,
          message,
          activeStep,
        };
      },
      waitForConfirm: (walletName: string, activeStep: string) => {
        const { waitForConfirm } = transferProgressStrings;
        const type = evaluateTemplateVars(waitForConfirm.type, { walletName });
        const message = evaluateTemplateVars(waitForConfirm.message, { walletName });
        return {
          type,
          message,
          activeStep,
        };
      },
      withdraw: (amount: number, symbol: string, activeStep: string) => {
        const { withdraw } = transferProgressStrings;
        const message = evaluateTemplateVars(withdraw.message, { amount, symbol });
        return {
          type: withdraw.type,
          message,
          activeStep,
        };
      },
      error: (err: any) => {
        /*if (type === TransferError.MAX_TOTAL_BALANCE_ERROR) {
                  const {limitationErrorTitle, maxTotalBalanceErrorMsg} = transferProgressStrings;
                  return {
                    type: limitationErrorTitle,
                    message: evaluate(maxTotalBalanceErrorMsg, data)
                  };
                }*/
        const { errorTitle } = transferProgressStrings;
        return {
          type: errorTitle,
          message: err.message,
        };
      },
    }),
    [],
  );
};
