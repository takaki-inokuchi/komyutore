import UseMenuContext from "../context/porovider";

const SelectMenu = () => {
  const {
    gender,
    setGender,
    aiName,
    setAiName,
    purpose,
    setPurpose,
    setMenuStage,
  } = UseMenuContext();

  const handleSubmit = () => {
    if (!gender || !aiName || !purpose) {
      alert("全ての項目を入力してください");
      return;
    }
    setMenuStage("talkPage");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6 space-y-6">
        {/* タイトル */}
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold text-gray-800">
            会話の準備をしよう
          </h2>
          <p className="text-sm text-gray-500">
            いくつかの質問に答えるだけで、最適な会話を始められます
          </p>
        </div>

        {/* 性別 */}
        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-700">
            あなたの性別
          </label>
          <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="">選択してください</option>
            <option value="male">男性</option>
            <option value="female">女性</option>
            <option value="other">その他</option>
          </select>
        </div>

        {/* AI名 */}
        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-700">
            話す相手の名前
          </label>
          <input
            value={aiName}
            onChange={(e) => setAiName(e.target.value)}
            className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="例：サトシ、カスミ、タケシ"
          />
          <p className="text-xs text-gray-400">
            親しみやすい名前をつけてみましょう
          </p>
        </div>

        {/* 目的 */}
        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-700">
            話したい目的
          </label>
          <input
            value={purpose}
            onChange={(e) => setPurpose(e.target.value)}
            className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="相談・雑談・学習 など"
          />
          <p className="text-xs text-gray-400">
            目的に合わせて会話内容が変わります
          </p>
        </div>

        {/* 決定ボタン */}
        <button
          onClick={handleSubmit}
          className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-full shadow-md transition"
        >
          会話を始める
        </button>
      </div>
    </div>
  );
};

export default SelectMenu;
