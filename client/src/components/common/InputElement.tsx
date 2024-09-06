type InputElementPropsType = {
  placeholder: string;
  onChange: (value: string) => void;
  customClassName?: string;
};

function InputElement(props: InputElementPropsType) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    props.onChange(event.target.value);
  };
  return (
    <>
      <input
        placeholder={props.placeholder}
        onChange={handleChange}
        className={`px-[15px] py-[10px] w-full bg-white shadow-md rounded-[6px] ${
          props.customClassName ?? ""
        }`}
      />
    </>
  );
}

export default InputElement;
