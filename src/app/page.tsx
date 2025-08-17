import { ListUserReposButton } from "@/components/ListUserReposButton";
import { LoggedInState } from "@/components/LoggedInState";
import { LoginButton } from "@/components/LoginButton";
import { LogOutButton } from "@/components/LogOutButton";

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <LoggedInState />
      <LoginButton />
      <LogOutButton />
      <ListUserReposButton />
    </div>
  );
}
