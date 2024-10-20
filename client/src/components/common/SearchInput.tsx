import Icon from "@mdi/react";
import InputElement from "./InputElement";
import { mdiClose, mdiMagnify } from "@mdi/js";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useDebounced } from "../../hooks/useDebounced";

export const SearchInput = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [value, setValue] = useState(() => searchParams.get("search") || "");

  const debouncedValue = useDebounced(value, 1000);

  useEffect(() => {
    const currentSearch = searchParams.get("search") || "";
    if (currentSearch !== value) {
      setValue(currentSearch);
    }
  }, [searchParams]);

  useEffect(() => {
    if (debouncedValue !== undefined) {
      const newParams = new URLSearchParams(searchParams);
      if (debouncedValue) {
        newParams.set("search", debouncedValue);
      } else {
        newParams.delete("search");
      }
      if (newParams.toString() !== searchParams.toString()) {
        setSearchParams(newParams);
      }
    }
  }, [debouncedValue, searchParams, setSearchParams]);

  return (
    <div className="relative flex items-center justify-center">
      <Icon
        path={mdiMagnify}
        size={1.3}
        className="text-black left-[10px] absolute"
      />
      <InputElement
        customClassName="!px-[50px]"
        value={value}
        placeholder="Type to search posts..."
        type="text"
        onChange={(val) => setValue(val)}
      />
      {value && (
        <button
          className="border-l-[1px] pl-[5px] group right-[10px] absolute"
          onClick={() => setValue("")}
        >
          <Icon
            className="text-gray-400 group-hover:text-black transition duration-200"
            path={mdiClose}
            size={1.2}
          />
        </button>
      )}
    </div>
  );
};
