const API_BASE_URL = "http://192.168.1.2:3000";

export async function getUser(data: { username: string; password: string }) {
  try {
    return await fetch(`${API_BASE_URL}/api/auth/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  } catch (error) {
    console.log(error);
  }
}
