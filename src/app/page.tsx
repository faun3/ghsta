import { LoggedInState } from "@/components/LoggedInState";
import { LoginButton } from "@/components/LoginButton";
import { LogOutButton } from "@/components/LogOutButton";

export default function Home() {
  return (
    <div>
      <LoggedInState />
      <LoginButton />
      <LogOutButton />
    </div>
  );
}
