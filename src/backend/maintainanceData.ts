const apiUrl = import.meta.env.VITE_API_URL;
export async function getMaintainanceData() {
  try {
    const token = localStorage.getItem("authToken"); // Retrieve token from localStorage
    const response = await fetch(`${apiUrl}/api/maintenance`, {
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

export async function getSpecificTruckMaintainanceData(id: string | undefined) {
  try {
    const token = localStorage.getItem("authToken"); // Retrieve token from localStorage
    const response = await fetch(
      `${apiUrl}/api/maintenance/getSpecificTruckMaintenance/maintenance/${id}`,
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
  id?: string;
};

export async function addMaintainance(data: AddMaintainanceType | null) {
  try {
    const token = localStorage.getItem("authToken"); // Retrieve token from localStorage
    const response = await fetch(`${apiUrl}/api/maintenance`, {
      method: "POST", // Set the request method to POST
      headers: {
        Authorization: `Bearer ${token}`, // Add Authorization header
        "Content-Type": "application/json", // Set content type to JSON
      },
      body: JSON.stringify(data), // Send data as JSON
    });
    const returnData = await response.json();

    console.log(returnData);
    return returnData;
  } catch (error) {
    console.error("Error adding the employee data:", error);
  }
}

export async function updateMaintainance(data: AddMaintainanceType | null) {
  try {
    const token = localStorage.getItem("authToken"); // Retrieve token from localStorage
    const response = await fetch(`${apiUrl}/api/maintenance/${data?.id}`, {
      method: "PUT", // Set the request method to POST
      headers: {
        Authorization: `Bearer ${token}`, // Add Authorization header
        "Content-Type": "application/json", // Set content type to JSON
      },
      body: JSON.stringify(data), // Send data as JSON
    });
    const returnData = await response.json();

    console.log(returnData);
    return returnData;
  } catch (error) {
    console.error("Error adding the employee data:", error);
  }
}

export async function deleteMaintainance(id: string | null) {
  try {
    const token = localStorage.getItem("authToken"); // Retrieve token from localStorage
    const response = await fetch(`${apiUrl}/api/maintenance/${id}`, {
      method: "DELETE", // Set the request method to POST
      headers: {
        Authorization: `Bearer ${token}`, // Add Authorization header
        "Content-Type": "application/json", // Set content type to JSON
      },
    });
    const returnData = await response.json();

    console.log(returnData);
    return returnData;
  } catch (error) {
    console.error("Error adding the employee data:", error);
  }
}
