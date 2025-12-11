"use client";
import Link from "next/link";
import UseMenuContext from "../context/porovider";

const Header = () => {
  const { setMenuStage, setShowMenu } = UseMenuContext();
  return (
    <div
      onClick={() => {
        setMenuStage("topPage");
        setShowMenu(false);
      }}
      className="fixed top-0 w-full h-16 flex justify-center text-4xl font-bold bg-green-600 text-white py-4"
    >
      <Link href="/">コミュトレ</Link>
    </div>
  );
};

export default Header;
