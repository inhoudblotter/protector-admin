export async function setPrice(id: number, price: number) {
  const res = await fetch(import.meta.env.VITE_API_HOST + `/order/${id}`, {
    method: "PATCH",
    mode: "cors",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ price }),
  });
  if (!res.ok) throw await res.json();
}
