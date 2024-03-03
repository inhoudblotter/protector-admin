import "dotenv/config";

export async function getOrder(token: string, id: number) {
  const res = await fetch(`${process.env.API_HOST}/order/${id}`, {
    mode: "cors",
    headers: { Authorization: `Bearer ${token}` },
  });
  const data = await res.json();
  if (res.ok) {
    return data;
  }
  throw data;
}
