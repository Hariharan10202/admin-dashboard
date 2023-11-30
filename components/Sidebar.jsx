import MenuLink from "./MenuLink";

import {
  AppWindow,
  BadgeDollarSign,
  DollarSign,
  HelpCircle,
  LogOutIcon,
  Settings,
  ShoppingCartIcon,
  UserCircle,
  Users,
} from "lucide-react";
import { ImStatsDots } from "react-icons/im";
import UserContainer from "./UserContainer";

const Sidebar = () => {
  const menuLinks = [
    {
      id: 1,
      title: "Pages",
      list: [
        { path: "/dashboard", Icon: <AppWindow />, name: "Dashboard" },
        { path: "/dashboard/users", Icon: <UserCircle />, name: "Users" },
        {
          path: "/dashboard/products",
          Icon: <ShoppingCartIcon />,
          name: "Products",
        },
        {
          path: "/dashboard/transcations",
          Icon: <DollarSign />,
          name: "Transcations",
        },
      ],
    },
    {
      id: 2,
      title: "Analytics",
      list: [
        {
          path: "/revenue",
          Icon: <BadgeDollarSign />,
          name: "Revenue",
        },
        { path: "/dashboard/reports", Icon: <ImStatsDots />, name: "Reports" },
        { path: "/dashboard/teams", Icon: <Users />, name: "Teams" },
      ],
    },
    {
      id: 3,
      title: "Settings",
      list: [
        { path: "/dashboard/settings", Icon: <Settings />, name: "Settings" },
        { path: "/dashboard/help", Icon: <HelpCircle />, name: "Help" },
        { path: "/login", Icon: <LogOutIcon />, name: "Logout" },
      ],
    },
  ];

  return (
    <div className="text-white p-5 sticky top-0">
      <UserContainer />
      {menuLinks.map((link) => (
        <div key={link.id}>
          <h1 key={link.id} className="text-gray-400 mb-3">
            {link.title}
          </h1>
          {link.list.map((list) => (
            <div key={list.path} className="flex flex-col gap-y-3 mb-3 ">
              <MenuLink item={list} />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Sidebar;
