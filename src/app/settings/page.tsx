import { getContact } from "@/components/auth/utils";
import DashboardLayout from "@/components/Layout/Dashboard";
import SettingForm from "@/components/molecules/SettingForm";

export default async function Page() {
  const contact = await getContact();
  return (
    <div className="bg-[#14191f] w-ull h-full">
      <DashboardLayout>
        <SettingForm user={contact} />
      </DashboardLayout>
    </div>
  );
}
