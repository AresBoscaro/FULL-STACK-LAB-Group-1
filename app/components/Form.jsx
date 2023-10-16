const Form = ({ title, subtitle, inputs, redirect }) => {
  return (
    <div className="p-6 bg-white rounded-2xl h-full w-[430px] flex flex-col">
      <h1 className="font-bold text-xl text-zinc-900">{title}</h1>
      <p className="font-light text-zinc-700 text-sm">{subtitle}</p>
      {inputs?.map((input, id) => (
        <div key={id}>
          <h3 className="text-base font-semibold text-zinc-900">
            {input.label}
          </h3>
          <input type={input.type} className="w-full rounded-xl bg-black" />
        </div>
      ))}
    </div>
  );
};

export default Form;
