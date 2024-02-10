export async function getToken(): Promise<string> {
  const res = await fetch(
    `${import.meta.env.VITE_API_HOST}/auth/register/new`,
    {
      mode: "cors",
      credentials: "include",
    }
  );
  const data = (await res.json()) as { token: string };
  if (!res.ok) throw data;
  return data.token;
}
