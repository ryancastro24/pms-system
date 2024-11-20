export async function getAllTrucksData() {
  try {
    const token = localStorage.getItem("authToken"); // Retrieve token from localStorage
    const response = await fetch(
      "https://pms-mining-api.onrender.com/api/trucks",
      {
        headers: {
          Authorization: `Bearer ${token}`, // Add Authorization header
          "Content-Type": "application/json", // Optional, depends on your API's requirements
        },
      }
    );

    const data = await response.json();

    console.log(data);
    return data;
  } catch (error) {
    console.error("Error fetching the data:", error);
  }
}

type TruckData = {
  plate_number?: string;
  chassis_number?: string;
  vin_number?: string;
  model?: string;
  type?: string;
  person_incharge?: string;
  status?: string;
  date_deployed?: string;
};

//todo: add new truck
export async function addNewTruck(data: TruckData | null) {
  try {
    const token = localStorage.getItem("authToken"); // Retrieve token from localStorage
    const response = await fetch(
      "https://pms-mining-api.onrender.com/api/trucks",
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

//todo: update truck data
export async function updateTruckData(id: any, data: any) {
  try {
    const token = localStorage.getItem("authToken"); // Retrieve token from localStorage
    const response = await fetch(
      `https://pms-mining-api.onrender.com/api/trucks/${id}`,
      {
        method: "PUT", // Set the request method to POST
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

export async function deleteTruckData(id: string) {
  try {
    const token = localStorage.getItem("authToken"); // Retrieve token from localStorage
    const response = await fetch(
      `https://pms-mining-api.onrender.com/api/trucks/${id}`, // Use the id parameter directly
      {
        method: "DELETE", // Set the request method to DELETE
        headers: {
          Authorization: `Bearer ${token}`, // Add Authorization header
          "Content-Type": "application/json", // Set content type to JSON
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to delete employee data");
    }

    const deletedData = await response.json();
    console.log(deletedData);
    return deletedData;
  } catch (error) {
    console.error("Error deleting the employee data:", error);
  }
}
