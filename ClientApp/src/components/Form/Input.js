const Input = ({ label, type, name, placeholder, getInputs, value }) => {
  return (
    <div className='flex flex-col gap-2 text-sm'>
      <label htmlFor={label}>{name}</label>
      <input
        type={type}
        className='input'
        placeholder={placeholder}
        onChange={getInputs}
        value={value}
      />
    </div>
  );
};

export default Input;
