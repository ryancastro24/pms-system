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

export async function getProfile() {
  try {
    const token = localStorage.getItem("authToken"); // Retrieve token from localStorage
    const response = await fetch(
      "https://pms-mining-api.onrender.com/api/personnel/me",
      {
        headers: {
          Authorization: `Bearer ${token}`, // Add Authorization header
          "Content-Type": "application/json", // Optional, depends on your API's requirements
        },
      }
    );
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
      const response = await fetch(
        "https://pms-mining-api.onrender.com/api/auth/changePassword",
        {
          method: "POST", // Set the request method to POST
          headers: {
            Authorization: `Bearer ${token}`, // Add Authorization header
            "Content-Type": "application/json", // Set content type to JSON
          },
          body: JSON.stringify({ password: password }), // Send data as JSON
        }
      );
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
