"use client";
import { Actor, HttpAgent, Identity } from "@dfinity/agent";
import { AuthClient } from "@dfinity/auth-client";
import { Principal } from "@dfinity/principal";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { canisterId, createActor } from "../declarations/backend";
import GradientBorderButton from "./GradientBorderButton";
import LaunchGameButton from "./LaunchGameButton";

const backend = createActor(canisterId);

export default function Navbar() {
  const [principal, setPrincipal] = useState(undefined);
  const [needLogin, setNeedLogin] = useState(true);

  const authClientPromise = AuthClient.create();

  const signIn = async () => {
    const authClient = await authClientPromise;

    const internetIdentityUrl = import.meta.env.PROD
      ? undefined
      : `http://${process.env.CANISTER_ID_INTERNET_IDENTITY}.localhost:4943`;

    await new Promise((resolve) => {
      authClient.login({
        identityProvider: internetIdentityUrl,
        onSuccess: () => resolve(undefined),
      });
    });

    const identity = authClient.getIdentity();
    updateIdentity(identity);
    setNeedLogin(false);
  };

  const signOut = async () => {
    const authClient = await authClientPromise;
    await authClient.logout();
    const identity = authClient.getIdentity();
    updateIdentity(identity);
    setNeedLogin(true);
  };

  const updateIdentity = (identity) => {
    setPrincipal(identity.getPrincipal());
    Actor.agentOf(backend).replaceIdentity(identity);
  };

  const setInitialIdentity = async () => {
    try {
      const authClient = await AuthClient.create();
      const identity = authClient.getIdentity();
      updateIdentity(identity);
      setNeedLogin(!(await authClient.isAuthenticated()));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    setInitialIdentity();
  }, []);

  const pathname = usePathname();

  const router = useRouter();
  const navLinks = [
    {
      name: "Home",
      path: "/",
      classes: "text-hover-gradient-home",
    },
    {
      name: "Game",
      path: "/game",
      classes: "text-hover-gradient-game",
    },
    {
      name: "Bank",
      path: "/bank",
      classes: "text-hover-gradient-bank",
    },
  ];

  const handleProfileClick = () => {
    router.push("/profile");
  };

  return (
    <nav className="bg-[#070005] fixed w-full z-20">
      <div className="flex w-full items-center justify-between py-6 px-8">
        <a href="/" className="logo">
          <Image
            src="/PowerPlay.png"
            alt="powerplay image"
            width={172}
            height={15}
          ></Image>
        </a>
        <div className="font-display flex gap-12">
          {navLinks.map(({ name, path, classes }, index) => (
            <Link
              className={`${classes} ${
                path === pathname ? "before:opacity-0" : ""
              }`}
              key={index}
              href={path}
            >
              {name}
            </Link>
          ))}
        </div>
        <div className="buttons flex gap-3">
          {true ? (
            <div className="relative group">
              <GradientBorderButton classes="text-white">
                wallet
              </GradientBorderButton>
              <div className="bg-dark-pink hidden absolute w-[120%] right-0  cursor-pointer group-hover:flex flex-col gap-6 text-lg text-white">
                <span
                  onClick={handleProfileClick}
                  className="flex p-2 items-center gap-3 hover:bg-dark-kiss "
                >
                  <AccountCircleIcon />
                  <span>Profile</span>
                </span>
                <span
                  onClick={() => router.push("/game")}
                  className="flex p-2 items-center gap-3 hover:bg-dark-kiss "
                >
                  <SportsEsportsIcon />
                  <span>Games</span>
                </span>
                <span className="flex p-2 items-center gap-3 hover:bg-dark-kiss ">
                  {needLogin ? (
                    <div className="menu-item-button" onClick={signIn}>
                      Sign in
                    </div>
                  ) : (
                    <div className="menu-item-button" onClick={signOut}>
                      Sign Out
                    </div>
                  )}
                  {/* <LogoutIcon />
                  <span>Disconnect Wallet</span> */}
                </span>
              </div>
              {!needLogin && (
                <div className="principal">
                  Logged in as: {principal?.toString()}
                </div>
              )}
            </div>
          ) : (
            <LaunchGameButton />
          )}
        </div>
      </div>
      <div className="w-full h-0.5 magic-gradient"></div>
    </nav>
  );
}
