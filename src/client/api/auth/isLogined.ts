export async function isLogined(): Promise<number> {
  const res = await fetch(import.meta.env.VITE_API_HOST + "/auth", {
    mode: "cors",
    credentials: "include",
  });
  const data = (await res.json()) as { id: number };
  if (!res.ok) throw data;
  return data.id;
}
