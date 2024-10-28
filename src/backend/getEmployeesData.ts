export async function getAllEmployeesData() {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    const data = await response.json();
    return data; // Optional: return the result if you want to use it elsewhere
  } catch (error) {
    console.error("Error fetching the data:", error);
  }
}
