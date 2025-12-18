"use client";
import Link from "next/link";
import UseMenuContext from "../context/porovider";

const Header = () => {
  const { setMenuStage, setShowMenu, messages, setMessages } = UseMenuContext();

  const handleDiagnosis = async () => {
    try {
      const res = await fetch("/api/diagnosis", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ messages }),
      });

      const data = await res.json();

      const diagnosisText =
        data.choices?.[0]?.message?.content ?? "診断結果を取得できませんでした";

      // 診断結果を「AIの発言」として追加
      setMessages((prev) => [...prev, { role: "ai", text: diagnosisText }]);
    } catch (e) {
      setMessages((prev) => [
        ...prev,
        { role: "ai", text: "診断中にエラーが発生しました。" },
      ]);
    }
  };

  return (
    <div className="fixed top-0 w-full h-16 flex justify-center items-center text-4xl font-bold bg-green-600 text-white">
      <Link
        href="/"
        onClick={() => {
          setMenuStage("topPage");
          setShowMenu(false);
        }}
      >
        コミュトレ
      </Link>

      <button
        onClick={async () => {
          await handleDiagnosis();
          setMenuStage("diagnosis");
          setShowMenu(true);
        }}
        className="absolute right-4 text-base font-normal bg-white text-green-600 px-3 py-1 rounded cursor-pointer"
      >
        診断
      </button>
    </div>
  );
};

export default Header;
