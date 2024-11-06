export async function login(username: string, password: string) {
  try {
    console.log(username);
    console.log(password);
    const response = await fetch(
      "https://pms-mining-api.onrender.com/api/auth/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          // Example login credentials
          username: username,
          password: password,
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    console.log(data); // Logs the API response
    return data; // Returns the response data
  } catch (error) {
    console.error("Error:", error);
  }
}
