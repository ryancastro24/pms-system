export async function getAllEmployeesData() {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    const data = await response.json();
    return data; // Optional: return the result if you want to use it elsewhere
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
};

export async function addEmployeeData(data: AddSampleData | null) {
  try {
    console.log("Add Data received:", data);

    // Introduce a 5-second delay
    await new Promise((resolve) => setTimeout(resolve, 5000));

    console.log("Data processed after delay");
    return data;
  } catch (error) {
    console.error("Error adding the employee data:", error);
  }
}

export async function editEmployeeData(data: AddSampleData | null) {
  try {
    console.log("Edit Data received:", data);

    return data;
  } catch (error) {
    console.error("Error adding the employee data:", error);
  }
}
