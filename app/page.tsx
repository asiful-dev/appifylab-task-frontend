import { redirect } from "next/navigation";

import { APP_ROUTES } from "@/shared/libs/constants";

export default function Home() {
  redirect(APP_ROUTES.login);
}
