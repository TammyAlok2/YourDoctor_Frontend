import type { MetadataRoute } from "next";
import toast from "react-hot-toast";

export const revalidate = 3; //revalidate at most every hour

// Function to fetch API data dynamically
async function fetchDynamicDataFromAPI(apiUrl: string) {
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error(`Failed to fetch data from ${apiUrl}`);
    }
    const data = await response.json();
    // console.log('API data:', data); // Add logging to check the data structure
    return data.data;
  } catch (error:any) {
    toast.error("Error to fetch doctors: ", error)
    // console.error("Error fetching data from API:", error);
    return null; // Return null or empty array on failure
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Fetch dynamic data from the API
  const doctorsData = await fetchDynamicDataFromAPI(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/doctor/allDoctors`
  );

  // Ensure that dynamicData is an array, otherwise default to an empty array
  const dynamicDoctorsRoutes = Array.isArray(doctorsData)
    ? doctorsData?.map((item: any) => ({
        url: `http://www.yourlab.in/doctor/${item._id}`,
        lastModified: new Date(item.updatedAt),
        changeFrequency: "monthly" as "monthly", // Explicitly cast the string to the allowed type
        priority: 0.7,
      }))
    : []; // If dynamicData is not an array, return an empty array of dynamic routes

  const staticRoutes = [
    {
      url: "https://www.yourlab.in",
      lastModified: new Date(),
      changeFrequency: "yearly" as "yearly",
      priority: 1,
    },
    
    ...dynamicDoctorsRoutes,
  ];

  // Return combined static and dynamic routes
  return staticRoutes;
}
