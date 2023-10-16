const RedirectLink = ({ label, span, onRedirect }) => {
  return (
    <div className="w-full flex justify-center mt-2">
      <p className="text-xs font-light text-zinc-500">
        {label}{" "}
        <span
          className="font-semibold text-zinc-900 text-sm cursor-pointer"
          onClick={onRedirect}
        >
          {span}
        </span>
      </p>
    </div>
  );
};

export default RedirectLink;
