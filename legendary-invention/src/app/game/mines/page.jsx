"use client";
import FeatureSection from "@/components/FeatureSection";
import HeroSection from "@/components/HeroSection";
import Navbar from "@/components/Navbar";
import SponsorSection from "@/components/SponsorSection";
import Footer from "@/components/Footer";
import LetsPlaySection from "@/components/LetsPlaySection";
import FeatureGameSection from "@/components/FeatureGameSection";
import Button from "@/components/Button";
import TabButton from "../../../components/TabButton";
import DropdownButton from "../../../components/DropdownButton";
import { Apple, Laptop, Tablet, Watch } from "lucide-react";
import Tabs from "@/components/Tabs";
import DynamicForm from "./Form";
import GameDetail from "../../../components/GameDetail";

const options = [
  { value: "iphone", label: "iPhone", icon: <Apple className="w-4 h-4" /> },
  { value: "macbook", label: "MacBook", icon: <Laptop className="w-4 h-4" /> },
  { value: "ipad", label: "iPad", icon: <Tablet className="w-4 h-4" /> },
  { value: "watch", label: "Apple Watch", icon: <Watch className="w-4 h-4" /> },
];

const manualFormConfig = {
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

const autoFormConfig = {
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

export default function Mines() {
  const handleFormSubmit = (data) => {
    console.log("Form Data Submitted:", data);
  };

  const tabs = [
    {
      label: "Manual",
      content: (
        <DynamicForm config={manualFormConfig} onSubmit={handleFormSubmit} />
      ),
    },
    {
      label: "Auto",
      content: (
        <DynamicForm config={autoFormConfig} onSubmit={handleFormSubmit} />
      ),
    },
  ];

  return (
    <div className="bg-[#070005]">
      <Navbar />

      <div className="pt-32">
        {/* Game Header */}
        <div className="text-white flex justify-between items-center py-4 flex-wrap gap-4 px-4 md:px-8 lg:px-20">
          <div>
            <p className="text-sm text-gray-400">Games/Mines</p>
            <h1 className="text-3xl md:text-4xl font-semibold">Mines</h1>
          </div>
          <DropdownButton
            options={options}
            defaultLabel="Select Apple Product"
          />
          <div className="w-full h-0.5 magic-gradient mb-6"></div>
        </div>

        {/* Main Content */}
        <div className="flex flex-col md:flex-row gap-6 px-4 md:px-8 lg:px-20">
          {/* Sidebar/Tabs */}
          <div className="w-full md:w-1/3 lg:w-1/4 rounded-3xl border-2 border-[#333947] bg-[#290023] p-4">
            <Tabs tabs={tabs} />
          </div>

          {/* Game Area */}
          <div className="w-full md:w-2/3 lg:w-3/4 rounded-3xl border-2 border-[#333947] bg-[#290023] p-6">
            <h2 className="text-xl font-semibold text-white">Game Area</h2>
          </div>
        </div>

        {/* Game Description */}
        <div className="mt-10 px-4 md:px-8 lg:px-20">
          <GameDetail />
        </div>
      </div>

      <Footer />
    </div>
  );
}
