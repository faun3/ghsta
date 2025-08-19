import { NextResponse } from "next/server";

type ErrorResponse = {
  error: string;
  details?: string;
};

// Centralized function to handle API errors
export function handleApiError(error: unknown, defaultMessage = "Unexpected error") {
  console.error("API Error:", error);
  console.error("Message:", defaultMessage);

  if (typeof error === "object" && error !== null && "status" in error) {
    const err = error as { status: number; message?: string };
    if (err.status === 400) {
      return NextResponse.json<ErrorResponse>({ error: "Bad Request", details: err.message }, { status: 400 });
    }
    if (err.status === 401) {
      return NextResponse.json<ErrorResponse>(
        { error: "GitHub authentication failed", details: err.message },
        { status: 401 },
      );
    }
    if (err.status === 403) {
      return NextResponse.json<ErrorResponse>(
        { error: "Server refused the request", details: err.message },
        { status: 403 },
      );
    }
    if (err.status === 429) {
      return NextResponse.json<ErrorResponse>(
        { error: "GitHub API rate limit exceeded", details: err.message },
        { status: 429 },
      );
    }
    return NextResponse.json<ErrorResponse>({ error: err.message || defaultMessage }, { status: err.status });
  }

  if (error instanceof Error) {
    return NextResponse.json<ErrorResponse>({ error: error.message || defaultMessage }, { status: 500 });
  }

  return NextResponse.json<ErrorResponse>({ error: defaultMessage }, { status: 500 });
}
