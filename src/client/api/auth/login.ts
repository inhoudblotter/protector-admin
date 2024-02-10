export async function login(username: string, password: string) {
  const res = await fetch(`${import.meta.env.VITE_API_HOST}/auth/login`, {
    method: "POST",
    mode: "cors",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });
  const data = await res.json();
  if (res.ok) {
    return data.id;
  }
  throw data;
}
