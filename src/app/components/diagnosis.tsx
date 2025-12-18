import React from "react";
import UseMenuContext from "../context/porovider";

const Diagnosis = () => {
  const { messages } = UseMenuContext();

  const diagnosis = [...messages].reverse().find((m) => m.role === "ai");
  if (!diagnosis) {
    return <div className="p-4">診断結果がありません</div>;
  }

  return (
    <div className="p-4 max-w-md">
      <h2 className="text-xl font-bold mb-4">診断結果</h2>

      <div className="bg-white rounded-lg p-4 border whitespace-pre-wrap">
        {diagnosis.text}
      </div>
    </div>
  );
};

export default Diagnosis;
