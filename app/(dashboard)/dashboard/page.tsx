import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { Settings } from "./settings";

export default async function SettingsPage() {
  const cookieStore = await cookies();
  const authToken = cookieStore.get("authToken")?.value;

  if (!authToken) {
    redirect("/sign-in");
  }

  return <Settings />;
}
