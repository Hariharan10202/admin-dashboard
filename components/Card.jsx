const Card = ({ users, title, amount, Icon }) => {
  return (
    <div className="text-black dark:text-white w-[20%] border border-gray-600 rounded-2xl p-5 transition-all cursor-pointer hover:bg-gray-400/10">
      <div className="flex flex-col">
        <span className="capitalize flex items-center w-full justify-between">
          {title} {Icon}
        </span>
        <span className="font-bold">+{amount}</span>
        <span className="text-xs text-gray-400">+{users}% from last month</span>
      </div>
    </div>
  );
};

export default Card;
