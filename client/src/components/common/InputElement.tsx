type InputElementPropsType = {
  placeholder: string;
  type: string;
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
        type={props.type}
        onChange={handleChange}
        className={`px-[15px] py-[10px] border-[2px] w-full bg-white shadow-md rounded-[6px] ${
          props.customClassName ?? ""
        }`}
      />
    </>
  );
}

export default InputElement;
