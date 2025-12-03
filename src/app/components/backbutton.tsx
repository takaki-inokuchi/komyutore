import UseMenuContext from "../context/porovider";

const BackButton = () => {
  const { menuStage, setMenuStage, setShowMenu } = UseMenuContext();
  return (
    <button
      onClick={() => {
        if (menuStage === "selectMenu") {
          setMenuStage("topPage");
          setShowMenu(false);
        } else {
          setMenuStage("topPage");
          setShowMenu(false);
        }
      }}
      className="fixed bottom-20 right-10 cursor-pointer text-white bg-green-600 rounded-full px-4 py-2"
    >
      戻る
    </button>
  );
};

export default BackButton;
