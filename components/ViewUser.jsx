import Image from "next/image";
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";
import { AiFillMinusCircle } from "react-icons/ai";

import { RadioButton } from "primereact/radiobutton";
import { Tooltip } from "primereact/tooltip";

const ViewUser = ({ viewData }) => {
  return (
    <div className="p-5 flex w-full justify-between gap-5">
      <div className="relative w-[300px] h-[250px] p-5 ">
        <Image
          className="rounded-2xl user-img object-cover"
          src={viewData.img}
          fill
          alt="user-image"
          sizes="(max-width: 300px)"
          data-pr-tooltip="User Image"
        />
        <Tooltip target=".user-img" mouseTrack mouseTrackLeft={10} />
      </div>
      <div className="flex-1 flex flex-col gap-y-5">
        <InputText
          value={viewData.username}
          readOnly
          tooltip="Username"
          id="username"
          className="w-full"
        />
        <InputText
          value={viewData.email}
          id="email"
          readOnly
          tooltip="Email"
          className="w-full"
        />
        <InputNumber
          id="number-input"
          useGrouping={false}
          value={viewData.phone}
          name="phone"
          tooltip="Contact"
          readOnly
          className="w-full"
        />
        <div className="flex gap-5 items-center">
          <div className="flex flex-col gap-y-2">
            <div className="flex align-items-center">
              <RadioButton
                inputId="gender1"
                name="gender"
                value="Male"
                readOnly
                checked={viewData.gender === "Male"}
              />
              <label htmlFor="gender1" className="ml-2">
                Male
              </label>
            </div>
            <div className="flex align-items-center">
              <RadioButton
                inputId="gender2"
                name="gender"
                value="Female"
                readOnly
                checked={viewData.gender === "Female"}
              />
              <label htmlFor="gender2" className="ml-2">
                Female
              </label>
            </div>
          </div>
          <div className="mt-5">
            <InputText
              readOnly
              tooltip="role"
              placeholder="Role"
              value={viewData.role.name}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewUser;
