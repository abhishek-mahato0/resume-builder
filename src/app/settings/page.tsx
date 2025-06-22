import { getContact } from "@/components/auth/utils";
import SettingForm from "@/components/molecules/SettingForm";
import SideNav from "@/components/sidenav";

export default async function Page() {
  const contact = await getContact();
  return (
    <div className="flex w-full h-screen overflow-hidden bg-[#14191f]">
      <SideNav />
      <div className="layout-container flex w-full items-center justify-center flex-col">
        <SettingForm user={contact} />
      </div>
    </div>
  );
}
