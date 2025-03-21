
import Tabs from "./Tabs";
import GameDescription from "./GameDescription";
import BettingTable from "./BettingTable";

const GameDetail = ({ gameData, bettingTableData }) => {

  const tabs = [
    {
      label: "Bet",
      content: <BettingTable data={bettingTableData} />,
    },
    {
      label: "Game Description",
      content: <GameDescription data={gameData} />,
    },
  ];

  return (
    <div className="text-gray-600 flex flex-col h-auto">
      <div className="flex justify-between items-center">
        <Tabs tabs={tabs} />
      </div>
      <div className="my-4 max-w-full"></div>
    </div>
  );
};

export default GameDetail;
