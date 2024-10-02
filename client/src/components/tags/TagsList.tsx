import { LoadingStatus } from "../../types";

type TagsListProps = {
  tags: {
    items: String[];
    status: String;
  };
};
export const TagsList = (props: TagsListProps) => {
  const isLoading = props.tags.status === LoadingStatus.LOADING;
  return (
    <div className="w-full md:w-[250px] p-[20px] h-fit flex flex-wrap gap-[5px] rounded-[8px] shadow-lg border overflow-hidden">
      {isLoading ? (
        <TagsSkeleton />
      ) : (
        props.tags.items.map((tag, index) => (
          <div
            className="bg-blue-100 px-[5px] py-[2px] rounded-[4px]"
            key={index}
          >
            # {tag}
          </div>
        ))
      )}
    </div>
  );
};

const TagsSkeleton = () => {
  const elements = [];
  const count = 10;
  for (let i = 0; i < count; i++) {
    const randomNumber = Math.floor(Math.random() * 31) + 40;
    elements.push(
      <div
        style={{ width: randomNumber + "px" }}
        className={`bg-gray-200 px-[5px] animate-pulse h-[28px] py-[2px] rounded-[4px]`}
        key={i}
      />
    );
  }

  return <>{elements}</>;
};
