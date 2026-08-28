const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

if (!API_URL) {
  throw new Error(
    "NEXT_PUBLIC_BACKEND_URL is not configured",
  );
}

export async function apiClient<T>(
  endpoint: string,
  options?: RequestInit,
): Promise<T> {
  const response = await fetch(
    `${API_URL}${endpoint}`,
    {
      ...options,
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        ...(options?.headers ?? {}),
      },
      cache: "no-store",
    },
  );

  if (!response.ok) {
    let message = `API request failed: ${response.status}`;

    try {
      const error = await response.json();

      message =
        error?.message ||
        error?.error ||
        message;
    } catch {
      // ignore
    }

    throw new Error(message);
  }

  return response.json();
}
