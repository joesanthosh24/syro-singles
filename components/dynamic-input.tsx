type PropType = {
  type: string;
  id?: string;
  name: string;
  required: boolean;
  classes?: string;
  text?: string;
  labelClasses?: string;
  labelText?: string;
  options?: Array<{ name: string; id: number }>;
  labelFor?: string;
  radioBtns?: Array<{ text: string; id: string }>;
};

const fieldClasses =
  "mt-2 rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-slate-900 placeholder:text-slate-400 shadow-sm transition-colors focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/30";

const DynamicInput = ({
  type,
  id,
  name,
  required,
  classes = "",
  text,
  options,
  labelFor,
  labelClasses = "",
  labelText,
  radioBtns,
}: PropType) => {
  return (
    <div>
      <label
        htmlFor={labelFor}
        className={`${labelClasses} block text-sm font-medium text-slate-700`}
      >
        {labelText}
      </label>
      {type === "select" ? (
        <div className="relative">
          <select
            className={`${classes} ${fieldClasses} appearance-none pr-10`}
            name={name}
            id={id}
            required={required}
            defaultValue=""
          >
            <option value="" disabled>
              {text}
            </option>
            {options?.map(({ name, id }) => (
              <option key={id}>{name}</option>
            ))}
          </select>
          <svg
            className="pointer-events-none absolute right-3 top-1/2 mt-1 h-4 w-4 -translate-y-1/2 text-slate-500"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M5.23 7.21a.75.75 0 0 1 1.06.02L10 11.17l3.71-3.94a.75.75 0 1 1 1.08 1.04l-4.25 4.5a.75.75 0 0 1-1.08 0l-4.25-4.5a.75.75 0 0 1 .02-1.06Z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      ) : type === "radio" ? (
        <div className="mt-2 grid grid-cols-2 gap-3">
          {radioBtns?.map(({ id, text }) => (
            <label key={id} htmlFor={id} className="cursor-pointer">
              <input
                type={type}
                name={name}
                id={id}
                value={id}
                required={required}
                className="peer sr-only"
              />
              <span className="block rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-center text-sm font-medium text-slate-700 shadow-sm transition-colors hover:border-brand-300 peer-checked:border-brand-600 peer-checked:bg-brand-50 peer-checked:text-brand-800 peer-focus-visible:ring-2 peer-focus-visible:ring-brand-500/30">
                {text}
              </span>
            </label>
          ))}
        </div>
      ) : (
        <input
          className={`${classes} ${fieldClasses}`}
          name={name}
          id={id}
          required={required}
          type={type}
          placeholder={text}
        />
      )}
    </div>
  );
};

export default DynamicInput;
