import { useState } from "react";
import Image from "next/image";

const tabContent = {
  bet: {
    title: "Betting Options",
    description:
      "Customize your betting options and try your luck! Choose your stakes and spin the wheel to win big.",
  },
  description: {
    image: "/images/games/roulette.png",
    title: "Roulette",
    paragraphs: [
      "Take on the house with the super low house edge, where there is only one green number and plenty of winning combinations! Our Roulette game is bound to keep you invested and intrigued with every spin as you look for different ways to turn a profit! Spin the wheel and try your luck with our Stake Original, Roulette!",
      "Roulette is a classic implementation of the popular casino table game developed by our very talented team at Stake Casino. Spin the roulette wheel and customise the betting options to win big, all while keeping the authentic roulette casino experience alive in our popular casino game at Stake.com. With an incredibly low house edge of 2.70%, as well as provably fair gameplay, this Stake Original is a roulette experience that provides better odds and a higher return to player (RTP) percentage than physical casino roulette tables.",
    ],
  },
};

const TabButton = ({ isActive, label, onClick }) => (
  <div
    className={` ${
      isActive ? "bg-gradient-to-r from-red-700 to-blue-600 p-[1px] rounded-2xl" : ""
    }`}
  >
    <button
      className={`p-2 rounded-2xl px-10 ${
        isActive ? "bg-[#290023] text-white " : "bg-transparent text-gray-400"
      }`}
      onClick={onClick}
    >
      {label}
    </button>
  </div>
);

const RouletteDescription = () => {
  const [activeTab, setActiveTab] = useState("description");

  const renderContent = () => {
    const content = tabContent[activeTab];
    if (activeTab === "bet") {
      return (
        <div className="w-96 flex items-center justify-center flex-col">
          <h2 className="text-2xl font-semibold text-white text-left">{content.title}</h2>
          <p className="text-gray-300 mt-2 text-center">
            {content.description}
          </p>
        </div>
      );
    } else if (activeTab === "description") {
      return (
        <>
          <div className="h-96 w-96">
            <Image
              src={content.image}
              alt={content.title}
              layout="responsive"
              width={16}
              height={9}
              className="rounded-lg object-contain"
            />
          </div>
          <h1 className="text-2xl font-semibold text-white mt-4">
            {content.title}
          </h1>
          {content.paragraphs.map((para, index) => (
            <p className="text-gray-300 mt-2" key={index}>
              {para}
            </p>
          ))}
        </>
      );
    }
  };

  return (
    <div className="text-gray-600 flex flex-col px-10 h-auto">
      <div className="flex justify-between items-center">
        <div className="bg-[#09011C] border-grey-500 border-2 border-gray-800 rounded-3xl p-2 gap-4 flex items-center justify-center">
          <TabButton
            label="Bet"
            isActive={activeTab === "bet"}
            onClick={() => setActiveTab("bet")}
          />
          <TabButton
            label="Game Description"
            isActive={activeTab === "description"}
            onClick={() => setActiveTab("description")}
          />
        </div>
        <div>
          <button className="p-4 rounded-2xl w-16 border-gray-800 border-2">
            10
          </button>
        </div>
      </div>
      <div className="my-4 max-w-full">{renderContent()}</div>
    </div>
  );
};

export default RouletteDescription;
