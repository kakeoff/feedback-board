function UserDataLoader() {
  return (
    <>
      <div className="flex flex-col gap-[10px] w-full">
        {Array.from({ length: 3 }).map((_, index) => (
          <div
            key={index}
            className="bg-gray-200 h-[45px] animate-pulse w-full flex justify-start gap-[5px] items-center pl-[3px] pr-[8px] rounded-[8px]"
          >
            <div className="h-[38px] w-[38px] bg-gray-300 rounded-[8px]" />
            <div className="bg-gray-300 w-full h-[20px] rounded-[8px]" />
          </div>
        ))}
      </div>
      <div className="bg-blue-300 px-[10px] py-[5px] text-[20px] rounded-[6px] w-full h-[40px]" />
    </>
  );
}

export default UserDataLoader;
