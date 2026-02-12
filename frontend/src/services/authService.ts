export async function getProfile() {
  try {
    const res = await fetch(import.meta.env.VITE_API_USER_URL + "/me", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });
    const data = await res.json();
    return data.success ? data.user : null;
  } catch (err) {
    console.error(err);
    return null;
  }
}
