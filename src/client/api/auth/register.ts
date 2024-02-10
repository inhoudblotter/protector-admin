export async function register(
  username: string,
  password: string,
  token: string
) {
  const res = await fetch(
    `${import.meta.env.VITE_API_HOST}/auth/register?token=${token}`,
    {
      method: "POST",
      mode: "cors",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    }
  );
  const data = await res.json();
  if (res.ok) {
    return data.id;
  }
  throw data;
}
