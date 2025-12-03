type topProps = {
  onClick: () => void;
};

const TopPage = ({ onClick }: topProps) => {
  return (
    <div className="flex flex-col justify-center items-center gap-3">
      <div>
        このアプリはコミュニケーショントレーニングアプリだよ！ <br />
        アプリを使用することで君のコミュニケーション能力を検査し向上を目的として使ってみよう！
      </div>
      <button
        onClick={onClick}
        className="cursor-pointer text-white bg-green-600 rounded-full px-3 py-2"
      >
        始める
      </button>
    </div>
  );
};

export default TopPage;
