import Icon from "@mdi/react";
import { mdiLoading } from "@mdi/js";

interface LoaderProps {
  itemsCount: number;
  itemHeight: number;
  showSpinner: boolean;
}

export function PostsScreenLoader(props: LoaderProps) {
  return (
    <div className="flex flex-col gap-[20px] w-full">
      {Array.from({ length: props.itemsCount }).map((_, index) => (
        <div
          key={index}
          className="bg-gray-200 animate-pulse border-[1px] shadow-lg p-[10px] w-full flex justify-center items-center rounded-[8px]"
          style={{ height: props.itemHeight }}
        >
          {props.showSpinner && (
            <Icon
              className="animate-spin"
              path={mdiLoading}
              size={3}
              color="gray"
            />
          )}
        </div>
      ))}
    </div>
  );
}
