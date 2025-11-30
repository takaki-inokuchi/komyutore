type topProps = {
  onClick: () => void;
};

const TopPage = ({ onClick }: topProps) => {
  return (
    <div>
      <button onClick={onClick} className="cursor-pointer text-white bg-green-600 rounded-full px-3 py-2">
        始める
      </button>
    </div>
  );
};

export default TopPage;
