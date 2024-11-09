export async function getAllEmployeesData() {
  try {
    const token = localStorage.getItem("authToken"); // Retrieve token from localStorage
    const response = await fetch(
      "https://pms-mining-api.onrender.com/api/personnel",
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

type AddSampleData = {
  name?: string;
  gender?: string;
  username?: string;
  email?: string;
  age?: string;
  address?: string;
  id?: string;
};

export async function addEmployeeData(data: AddSampleData | null) {
  try {
    const token = localStorage.getItem("authToken"); // Retrieve token from localStorage
    const response = await fetch(
      "https://pms-mining-api.onrender.com/api/auth/register",
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

export async function editEmployeeData(data: AddSampleData | null) {
  try {
    const token = localStorage.getItem("authToken"); // Retrieve token from localStorage
    const response = await fetch(
      `https://pms-mining-api.onrender.com/api/personnel/${data?.id}`,
      {
        method: "PUT", // Set the request method to POST
        headers: {
          Authorization: `Bearer ${token}`, // Add Authorization header
          "Content-Type": "application/json", // Set content type to JSON
        },
        body: JSON.stringify(data), // Send data as JSON
      }
    );
    const updatedData = await response.json();

    console.log(updatedData);
    return updatedData;
  } catch (error) {
    console.error("Error adding the employee data:", error);
  }
}

export async function deleteEmployeeData(id: string) {
  try {
    const token = localStorage.getItem("authToken"); // Retrieve token from localStorage
    const response = await fetch(
      `https://pms-mining-api.onrender.com/api/personnel/${id}`, // Use the id parameter directly
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
