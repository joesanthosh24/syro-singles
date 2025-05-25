type PropType = {
  type: string;
  id?: string;
  name: string;
  required: boolean;
  classes?: string;
  text?: string;
  labelClasses?: string;
  labelText?: string;
  options?: Array<string>;
  labelFor?: string;
  radioBtns?: Array<{ text: string; id: string }>;
};

const DynamicInput = ({
  type,
  id,
  name,
  required,
  classes,
  text,
  options,
  labelFor,
  labelClasses,
  labelText,
  radioBtns,
}: PropType) => {
  return (
    <div>
      <label
        htmlFor={labelFor}
        className={`${labelClasses} block text-sm font-medium text-gray-700`}
      >
        {labelText}
      </label>
      {type === "select" ? (
        <select
          className={`${classes} mt-2 p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none`}
          name={name}
          id={id}
          required={required}
        >
          <option></option>
          {options?.map((value) => (
            <option>{value}</option>
          ))}
        </select>
      ) : type === "radio" ? (
        radioBtns?.map(({ id, text }) => (
          <div>
            <input type={type} name={name} id={id} className="mt-2 pt-3" />{" "}
            {text}
          </div>
        ))
      ) : (
        <input
          className={`${classes} mt-2 p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none`}
          name={name}
          id={id}
          required={required}
          type={type}
        >
          {text}
        </input>
      )}
    </div>
  );
};

export default DynamicInput;
