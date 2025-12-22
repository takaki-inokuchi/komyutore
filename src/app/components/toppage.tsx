type TopProps = {
  onClick: () => void;
};

const TopPage = ({ onClick }: TopProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white flex flex-col items-center justify-center px-4">
      {/* Hero */}
      <div className="max-w-2xl text-center space-y-6">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
          会話に自信、持ててる？
        </h1>

        <p className="text-gray-600 leading-relaxed">
          このアプリは、あなたの
          <span className="font-semibold text-green-700">
            コミュニケーション能力を診断し、向上をサポート
          </span>
          するトレーニングアプリです。
          <br />
          質問に答えるだけで、今の会話タイプが分かります。
        </p>

        <button
          onClick={onClick}
          className="mt-4 bg-green-600 hover:bg-green-700 text-white font-semibold px-8 py-3 rounded-full shadow-md transition"
        >
          無料で診断を始める
        </button>
      </div>

      {/* Features */}
      <div className="mt-16 max-w-3xl w-full grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6 text-center">
          <h3 className="font-bold text-lg text-gray-800">① 診断する</h3>
          <p className="text-sm text-gray-600 mt-2">
            いくつかの質問に答えるだけで、あなたの会話傾向を分析します。
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 text-center">
          <h3 className="font-bold text-lg text-gray-800">② 強みを知る</h3>
          <p className="text-sm text-gray-600 mt-2">
            得意なポイント・苦手なポイントを分かりやすく可視化します。
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 text-center">
          <h3 className="font-bold text-lg text-gray-800">③ 改善する</h3>
          <p className="text-sm text-gray-600 mt-2">
            今日から使えるコミュニケーション改善アドバイスを提供します。
          </p>
        </div>
      </div>

      {/* Footer note */}
      <p className="mt-12 text-xs text-gray-400">
        ※ 診断結果は匿名で利用できます
      </p>
    </div>
  );
};

export default TopPage;
