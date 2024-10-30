export async function getAllTrucksData() {
  //! change the actual trucks data api
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts");
    const data = await response.json();
    return data; // Optional: return the result if you want to use it elsewhere
  } catch (error) {
    console.error("Error fetching the data:", error);
  }
}

//todo: add new truck
export async function addNewTruckData() {
  //! change the actual trucks data api
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts");
    const data = await response.json();
    return data; // Optional: return the result if you want to use it elsewhere
  } catch (error) {
    console.error("Error fetching the data:", error);
  }
}

//todo: update truck data
export async function updateTruckData(id: string) {
  //! change the actual trucks data api and parameters
  // ! insert id in the URL

  console.log(id);
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts");
    const data = await response.json();
    return data; // Optional: return the result if you want to use it elsewhere
  } catch (error) {
    console.error("Error fetching the data:", error);
  }
}

//todo: delete truck data
export async function deleteTruckData(id: string) {
  //! change the actual trucks data api and parameters
  // ! insert id in the URL

  console.log(id);
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts");
    const data = await response.json();
    return data; // Optional: return the result if you want to use it elsewhere
  } catch (error) {
    console.error("Error fetching the data:", error);
  }
}
