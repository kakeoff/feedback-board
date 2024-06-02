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
    <div className="w-full md:w-fit min-w-[250px] p-[20px] h-fit flex flex-col gap-[5px] rounded-[8px] shadow-lg border overflow-hidden">
      <p className="font-[700] text-[19px]">Tags</p>
      {isLoading ? (
        <TagsSkeleton />
      ) : (
        props.tags.items.map((tag, index) => (
          <div
            className="hover:bg-gray-100 cursor-pointer px-[3px] py-[2px] transition duration-200 rounded-[6px]"
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
  const count = 5;
  for (let i = 0; i < count; i++) {
    elements.push(
      <div key={i} className="pb-[5px]">
        <hr className="h-[25px] w-full bg-gray-200 rounded-[6px] animate-pulse" />
      </div>
    );
  }

  return <>{elements}</>;
};
