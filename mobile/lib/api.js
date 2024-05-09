// Replace 'your-local-ip-address' with your actual local IP address

import { API_BASE_URL } from "./variablesAPI";

export const imagesResponse = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/auth/`);
    if (!response.ok) {
      return console.log("Network response was not ok");
    }
    const data = await response.json(); // Parse the JSON response
    console.log("Data:", data); // Access the parsed data here
    // Handle response data here
    return data; // Return the data if needed
  } catch (error) {
    console.error("Error:", error);
    // Handle errors here
    throw error; // Re-throw the error if needed
  }
};

export const fetchMedia = async () => {
  try {
    // Fetch data from images collection
    const imagesResponse = await fetch(`${API_BASE_URL}/api/image/getall`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!imagesResponse.ok) {
      return console.log(imagesResponse.error);
    }
    console.log(imagesResponse);
    const imagesData = await imagesResponse.json();

    // Fetch data from videos collection

    const videosResponse = await fetch(`${API_BASE_URL}/api/video/getall`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const videosData = await videosResponse.json();

    const mixedMedia = [...imagesData, ...videosData];

    const shuffledMedia = shuffleArray(mixedMedia);

    return shuffledMedia;
  } catch (error) {
    console.error("Error fetching media:", error);
    return [];
  }
};

const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};
