export const manualFormConfig = {
  fields: [
    {
      id: "betAmount",
      label: "Bet Amount",
      type: "singleSelect",
      options: [10, 20, 50, 100, 200],
    },
    {
      id: "mines",
      label: "Mines",
      type: "singleSelect",
      options: [1, 2, 3, 5, 10],
    },
  ],
  submitButton: "Bet",
};

export const autoFormConfig = {
  submitButton: "Bet",
  fields: [
    {
      id: "betAmount",
      label: "Bet Amount",
      type: "singleSelect",
      options: [10, 20, 50, 100, 200],
      placeholder: "Enter Bet Amount",
    },
    {
      id: "mines",
      label: "Mines",
      type: "singleSelect",
      options: [1, 2, 3, 5, 10],
      placeholder: "Select Mines",
    },
    {
      id: "numberOfBets",
      label: "Numbers of Bet",
      type: "number",
      placeholder: "Enter No of Bets",
    },
    {
      id: "onWin",
      label: "On Win",
      type: "text",
      placeholder: "Enter Number",
    },
    {
      id: "onLoss",
      label: "On Loss",
      type: "text",
      placeholder: "Enter Number",
    },
    {
      id: "stopOnProfit",
      label: "Stop on Profit",
      type: "text",
      placeholder: "Enter Number",
    },
    {
      id: "stopOnLoss",
      label: "Stop on Loss",
      type: "text",
      placeholder: "Enter Number",
    },
  ],
};
