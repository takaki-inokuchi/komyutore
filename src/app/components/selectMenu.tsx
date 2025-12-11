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
  };
  return (
    <div className="flex flex-col h-full justify-center gap-5">
      <div>
        <label className="block">あなたの性別</label>
        <select
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          className="border rounded p-2"
        >
          <option value="">選択してください</option>
          <option value="male">男性</option>
          <option value="female">女性</option>
          <option value="other">その他</option>
        </select>
      </div>
      <div>
        <label className="block ">話す人の名前</label>
        <input
          value={aiName}
          onChange={(e) => setAiName(e.target.value)}
          className="border rounded p-2"
          placeholder="サトシ、カスミ、タケシ"
        />
      </div>
      <div>
        <label className="block ">話したい目的</label>
        <input
          value={purpose}
          onChange={(e) => setPurpose(e.target.value)}
          className="border rounded p-2"
          placeholder="相談、雑談、学習"
        />
      </div>
      <button
        onClick={() => {
          handleSubmit();
          setMenuStage("talkPage");
        }}
        className="text-white hover:bg-green-700 bg-green-600 rounded py-2"
      >
        決定
      </button>
    </div>
  );
};

export default SelectMenu;
