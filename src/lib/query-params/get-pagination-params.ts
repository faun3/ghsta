import { NextRequest } from "next/server";
import { queryParamToValidIntegerValue } from "./query-params-to-valid-integer-value";

export function getRestApiPaginationParams(request: NextRequest) {
  const page = request.nextUrl.searchParams.get("page");
  const perPage = request.nextUrl.searchParams.get("per_page");

  return {
    page: queryParamToValidIntegerValue(page, 1),
    perPage: queryParamToValidIntegerValue(perPage, 30, 100),
  };
}

export function getGraphqlApiPaginationParams(request: NextRequest) {
  const first = request.nextUrl.searchParams.get("first");
  const after = request.nextUrl.searchParams.get("after");

  return {
    first: queryParamToValidIntegerValue(first, 30, 100),
    after: after ?? null,
  };
}
