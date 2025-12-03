"use client";
import BackButton from "./components/backbutton";
import SelectMenu from "./components/selectMenu";
import TalkPage from "./components/talkPage";
import TopPage from "./components/toppage";
import UseMenuContext from "./context/porovider";

export default function Home() {
  const { showMenu, setShowMenu, menuStage, setMenuStage } = UseMenuContext();
  return (
    <div className="flex justify-center">
      {!showMenu ? (
        <TopPage
          onClick={() => {
            setShowMenu(true);
            setMenuStage("selectMenu");
          }}
        />
      ) : (
        <div>
          {menuStage === "selectMenu" && <SelectMenu />}
          {menuStage === "talkPage" && <TalkPage />}
          <BackButton />
        </div>
      )}
    </div>
  );
}