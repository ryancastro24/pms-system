export async function getMaintainanceData() {
  try {
    const token = localStorage.getItem("authToken"); // Retrieve token from localStorage
    const response = await fetch(
      "https://pms-mining-api.onrender.com/api/maintenance",
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
