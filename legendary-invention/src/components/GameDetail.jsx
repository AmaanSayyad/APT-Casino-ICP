import { useState } from "react";
import TabButton from "@/components/TabButton";
import Image from "next/image";
import Tabs from "@/components/Tabs";
import GameDescription from "@/components/GameDescription";
import BettingTable from "@/components/BettingTable";

const gameData = {
  label: "Game Description",
  title: "Roulette",
  image: "/images/games/roulette.png",
  paragraphs: [
    "Take on the house with the super low house edge, where there is only one green number and plenty of winning combinations! Our Roulette game is bound to keep you invested and intrigued with every spin as you look for different ways to turn a profit! Spin the wheel and try your luck with our Stake Original, Roulette!",
    "Roulette is a classic implementation of the popular casino table game developed by our very talented team at Stake Casino. Spin the roulette wheel and customise the betting options to win big, all while keeping the authentic roulette casino experience alive in our popular casino game at Stake.com. With an incredibly low house edge of 2.70%, as well as provably fair gameplay, this Stake Original is a roulette experience that provides better odds and a higher return to player (RTP) percentage than physical casino roulette tables.",
  ],
};

const bettingTableData = {
  title: "Betting Options",
  description:
    "Customize your betting options and try your luck! Choose your stakes and spin the wheel to win big.",
};

const GameDetail = () => {
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
