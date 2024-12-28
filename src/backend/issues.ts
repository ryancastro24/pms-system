const apiUrl = import.meta.env.VITE_API_URL;
export async function getAllIssues() {
  try {
    const token = localStorage.getItem("authToken"); // Retrieve token from localStorage
    const response = await fetch(`${apiUrl}/api/issues`, {
      headers: {
        Authorization: `Bearer ${token}`, // Add Authorization header
        "Content-Type": "application/json", // Optional, depends on your API's requirements
      },
    });

    const data = await response.json();

    console.log(data);
    return data;
  } catch (error) {
    console.error("Error fetching the data:", error);
  }
}

export async function updateIssueRepair(id: any) {
  try {
    const token = localStorage.getItem("authToken"); // Retrieve token from localStorage
    console.log("Using token:", token);

    const response = await fetch(`${apiUrl}/api/issues/issueRepair/${id}`, {
      method: "PUT", // Set the request method to PUT
      headers: {
        Authorization: `Bearer ${token}`, // Add any necessary headers
        "Content-Type": "application/json", // Optional, depending on API requirements
      },
    });

    if (!response.ok) {
      console.error(`Error: ${response.statusText}`);
    } else {
      const responseData = await response.json();
      console.log("Response data:", responseData);
      return responseData;
    }
  } catch (error) {
    console.error("Error sending the request:", error);
  }
}
