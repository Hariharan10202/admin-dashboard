import { fetchUsers } from "@/app/lib/data";
import UserTable from "@/components/UserTable";

const UserPage = async () => {
  const users = await fetchUsers();

  return (
    <div className="w-full p-5">
      <UserTable users={JSON.stringify(users)} />
    </div>
  );
};

export default UserPage;
