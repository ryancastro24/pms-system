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

type AddMaintainanceType = {
  person_incharge?: string;
  truck_id?: string;
  scheduled_date?: string;
};

export async function addMaintainance(data: AddMaintainanceType | null) {
  try {
    const token = localStorage.getItem("authToken"); // Retrieve token from localStorage
    const response = await fetch(
      "https://pms-mining-api.onrender.com/api/maintenance",
      {
        method: "POST", // Set the request method to POST
        headers: {
          Authorization: `Bearer ${token}`, // Add Authorization header
          "Content-Type": "application/json", // Set content type to JSON
        },
        body: JSON.stringify(data), // Send data as JSON
      }
    );
    const returnData = await response.json();

    console.log(returnData);
    return returnData;
  } catch (error) {
    console.error("Error adding the employee data:", error);
  }
}
