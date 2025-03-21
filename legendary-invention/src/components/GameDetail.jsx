import { useState } from "react";
import TabButton from "@/components/TabButton";
import Image from "next/image";
import Tabs from "@/components/Tabs";
import GameDescription from "@/components/GameDescription";
import BettingTable from "@/components/BettingTable";

const GameDetail = ({ gameData, bettingTableData }) => {
  const [activeTab, setActiveTab] = useState("description");

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
