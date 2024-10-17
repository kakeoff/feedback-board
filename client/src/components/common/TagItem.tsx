export const TagItem = ({
  tag,
  isButton,
  isSelected,
}: {
  tag: string;
  isButton?: boolean;
  isSelected?: boolean;
}) => {
  return (
    <span
      className={`bg-blue-100 px-[5px] py-[2px] rounded-[4px] ${
        isSelected ? "bg-blue-300" : ""
      } ${
        isButton
          ? "hover:bg-blue-300 cursor-pointer transition duration-200"
          : ""
      }`}
    >
      #{tag}
    </span>
  );
};
