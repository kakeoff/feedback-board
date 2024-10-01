type FileInputElementPropsType = {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  customClassName?: string;
  children: React.ReactNode;
  accept?: string;
};

function FileInputElement(props: FileInputElementPropsType) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    if (event.target) {
      props.onChange(event);
    }
  };
  return (
    <>
      <label
        htmlFor="fileInput"
        className={`border-[2px] m-0 p-0 w-full bg-white shadow-md rounded-[6px] ${
          props.customClassName ?? ""
        }`}
      >
        {props.children}
      </label>
      <input
        accept={props.accept}
        type="file"
        onChange={handleChange}
        id="fileInput"
        className="hidden"
      />
    </>
  );
}

export default FileInputElement;
