import Card from "@/components/Card";
import DashboardTable from "@/components/DashboardTable";
import Stats from "@/components/Stats";
import { CircleDollarSign } from "lucide-react";
import { ImStatsDots } from "react-icons/im";
import { PiGraphDuotone } from "react-icons/pi";
import { FaWallet } from "react-icons/fa6";

const page = () => {
  return (
    <div className="p-5">
      <div className="flex items-center gap-9">
        <Card
          title={"Total Revenue"}
          amount={"$45,231.89"}
          users={"20.1"}
          Icon={<CircleDollarSign />}
        />
        <Card
          title={"subcriptions"}
          amount={"2350"}
          users={"180.1"}
          Icon={<FaWallet />}
        />
        <Card
          title={"sales"}
          amount={"12,234"}
          users={"19"}
          Icon={<ImStatsDots />}
        />
        <Card
          title={"active now"}
          amount={"573"}
          users={"201"}
          Icon={<PiGraphDuotone />}
        />
      </div>
      <div className="my-12">
        <Stats />
      </div>
      <div className="w-[80%] my-12">
        <DashboardTable />
      </div>
    </div>
  );
};

export default page;
