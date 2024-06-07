import { Modalbox } from "../common/Modalbox";

interface ConfirmModalProps {
  onClose: () => void;
  onSubmit: () => void;
  title: string;
  text: string;
}

export function ConfirmModal(props: ConfirmModalProps) {
  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    props.onSubmit();
  };
  return (
    <Modalbox width={"300px"} title={props.title} onClose={props.onClose}>
      <form
        onSubmit={onSubmit}
        className="text-[13px] text-gray-500 flex flex-col items-end gap-[10px]"
      >
        <div className="w-full">
          <p className="text-[13px]">{props.text}</p>
        </div>
        <button
          type="submit"
          className="bg-green-100 px-[10px] py-[5px] w-[100px] rounded-[6px] hover:scale-[1.03] hover:bg-green-200 transition duration-200"
        >
          Submit
        </button>
      </form>
    </Modalbox>
  );
}
