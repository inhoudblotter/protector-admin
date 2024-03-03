import "dotenv/config";

export async function isLogined(token: string): Promise<number> {
  const res = await fetch(`${process.env.API_HOST}/auth`, {
    mode: "cors",
    headers: { Authorization: `Bearer ${token}` },
  });
  const data = (await res.json()) as { id: number };
  if (!res.ok) throw data;
  return data.id;
}
