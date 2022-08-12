const Input = ({
  name,
  placeholder = " Enter the amount",
  value,
  handleChange,
  handleBlur,
}) => {
  return (
    <input
      aria-label="input value"
      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      name={name}
      placeholder={placeholder}
      type="text"
      value={value}
      onChange={handleChange}
      onBlur={handleBlur}
    />
  );
};

export default Input;
