import "dotenv/config";

export async function getOrder(token: string, id: number) {
  const res = await fetch(process.env.VITE_API_HOST + `/order/${id}`, {
    mode: "cors",
    headers: { Authorization: `Bearer ${token}` },
  });
  const data = await res.json();
  if (res.ok) {
    return data;
  } else throw data;
}
