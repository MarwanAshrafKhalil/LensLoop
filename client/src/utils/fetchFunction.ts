export const fetchMedia = async () => {
  try {
    // Fetch data from images collection
    const imagesResponse = await fetch("/api/image/getall", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const imagesData = await imagesResponse.json();

    // Fetch data from videos collection

    const videosResponse = await fetch("/api/video/getall", {
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

const shuffleArray = (array: any) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};
