"use client";

import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { getAuthenticatedUserReposForCombobox } from "@/requests/get-authenticated-user-repos-for-combobox";
import { Combobox } from "../combobox/Combobox";

// TODO: users might have 100+ repos, we need to fetch more of them in a paginated way
// TODO: what if users search for a repo that has not been fetched yet?
// TODO: show something if we've fetched everything but the user still has not found their searched for repo
export function ReposCombobox() {
  const { data, isPending } = useQuery({
    queryFn: () => getAuthenticatedUserReposForCombobox(),
    queryKey: ["user-repos"],
  });

  const dataMappedAsComboboxEntries: React.ComponentProps<typeof Combobox>["entries"] = useMemo(() => {
    if (!data) return [];

    return data.map((repo) => ({
      value: repo.id.toString(10),
      label: repo.name,
    }));
  }, [data]);

  // TODO: better loading state
  if (isPending) {
    return <p>Loading...</p>;
  }

  return <Combobox entries={dataMappedAsComboboxEntries} placeholder="Repos" />;
}
