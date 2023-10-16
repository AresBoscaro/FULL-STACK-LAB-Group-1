const ActionFormButton = ({ onClick, label }) => {
  return (
    <button
      className="w-full rounded-xl p-2 text-center bg-zinc-700"
      onClick={onClick}
    >
      <h3 className="text-white font-semibold text-lg">{label}</h3>
    </button>
  );
};

export default ActionFormButton;
