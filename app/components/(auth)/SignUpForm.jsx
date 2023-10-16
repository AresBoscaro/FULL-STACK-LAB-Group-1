import RedirectButton from "../RedirectButton";
import RedirectLink from "../RedirectLink";

const SignUpForm = ({
  title,
  subtitle,
  inputsR,
  inputsL,
  redirectLabel,
  redirectSpan,
  onRedirect,
}) => {
  return (
    <div className="py-6 px-16 bg-white/40 rounded-2xl h-full w-[860px] flex flex-col justify-between shadow-sm">
      <div className="flex flex-col w-full items-center">
        <h1 className="font-bold text-xl text-zinc-900">{title}</h1>
        <p className="font-light text-zinc-500 text-sm">{subtitle}</p>
      </div>
      <div className="flex items-start w-full justify-center gap-10">
        <div className="w-full">
          {inputsL?.map((input, id) => (
            <div key={id} className="mt-8">
              <h3 className="text-base font-semibold text-zinc-900">
                {input.label}
              </h3>
              <input
                type={input.type}
                className="w-full p-2 rounded-lg border-[1px] border-zinc-500/40 mt-4 outline-none"
              />
            </div>
          ))}
        </div>
        <div className="w-full">
          {inputsR?.map((input, id) => (
            <div key={id} className="mt-8">
              <h3 className="text-base font-semibold text-zinc-900">
                {input.label}
              </h3>
              <input
                type={input.type}
                className="w-full p-2 rounded-lg border-[1px] border-zinc-500/40 mt-4 outline-none"
              />
            </div>
          ))}
          <div className="w-full text-right mt-2">
            <p className="text-xs font-light text-zinc-500">
              Forgot the password?
            </p>
          </div>
        </div>
      </div>
      <div>
        <RedirectButton label={"Sign Up"} />
        <RedirectLink
          label={redirectLabel}
          span={redirectSpan}
          onRedirect={onRedirect}
        />
      </div>
    </div>
  );
};

export default SignUpForm;
