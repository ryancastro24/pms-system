const apiUrl = import.meta.env.VITE_API_URL;
export async function login(username: string, password: string) {
  try {
    console.log(username);
    console.log(password);
    const response = await fetch(`${apiUrl}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        // Example login credentials
        username: username,
        password: password,
      }),
    });

    const data = await response.json();
    return data; // Returns the response data
  } catch (error) {
    console.error("Error:", error);
  }
}

export async function getProfile() {
  try {
    const token = localStorage.getItem("authToken"); // Retrieve token from localStorage
    const response = await fetch(`${apiUrl}/api/personnel/me`, {
      headers: {
        Authorization: `Bearer ${token}`, // Add Authorization header
        "Content-Type": "application/json", // Optional, depends on your API's requirements
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching the data:", error);
  }
}

// change password

export async function changePassword(
  password?: string | null,
  confirmPassword?: string | null
) {
  try {
    const token = localStorage.getItem("authToken"); // Retrieve token from localStorage

    if (password === confirmPassword) {
      const response = await fetch(`${apiUrl}/api/auth/changePassword`, {
        method: "POST", // Set the request method to POST
        headers: {
          Authorization: `Bearer ${token}`, // Add Authorization header
          "Content-Type": "application/json", // Set content type to JSON
        },
        body: JSON.stringify({ password: password }), // Send data as JSON
      });
      const returnData = await response.json();

      console.log(returnData);
      return returnData;
    } else {
      return { message: "password don't match" };
    }
  } catch (error) {
    console.error("Error adding the employee data:", error);
  }
}
