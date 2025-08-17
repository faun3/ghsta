import { LoggedInState } from "@/components/LoggedInState";
import LoginButton from "@/components/LoginButton";

export default function Home() {
  return (
    <div>
      <LoggedInState />
      <LoginButton />
    </div>
  );
}
