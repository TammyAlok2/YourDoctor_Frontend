import type { MetadataRoute } from "next";
import { cookies } from "next/headers";

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
  } catch (error) {
    console.error("Error fetching data from API:", error);
    return null; // Return null or empty array on failure
  }
}

async function fetchDynamicAppointmentDataFromAPI(apiUrl: string) {
  try {
    // Access cookies from the incoming request
    const cookieStore = cookies();
    const token = cookieStore.get("loginToken"); // Assuming 'token' is the cookie key
    const tokenValue = token?.value; // Assuming 'token' is the cookie key
    const isLoggedIn = cookieStore.get("isLoggedIn");
    const loginValue = isLoggedIn?.value;
    
    if (!token || loginValue !== 'true') {
      console.log("Unauthorized! please login to continue");
    }
    console.log("cookies token: ", tokenValue);
    console.log("login success: ", loginValue);
    const response = await fetch(apiUrl, {
      headers: {
        Authorization: `Bearer ${tokenValue}`, // Attach token in the Authorization header
      },
    });
    console.log("appointment data: ", response); // Check if data is received correctly

    if (!response.ok) {
      // Log response details to get more info
      console.error("Error in response:", response.status, response.statusText);
      throw new Error("Unauthorized request");
    }

  } catch (error) {}
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Fetch dynamic data from the API
  const doctorsData = await fetchDynamicDataFromAPI(
    "http://localhost:5000/api/v1/doctor/allDoctors"
  );
  const cartData = await fetchDynamicAppointmentDataFromAPI(
    "http://localhost:5000/api/v1/user/allAppointments"
  );
  console.log("dynamic data: ", cartData);

  // Ensure that dynamicData is an array, otherwise default to an empty array
  const dynamicDoctorsRoutes = Array.isArray(doctorsData)
    ? doctorsData?.map((item: any) => ({
        url: `http://www.yourlab.in/doctor/${item._id}`,
        lastModified: new Date(item.updatedAt),
        changeFrequency: "monthly" as "monthly", // Explicitly cast the string to the allowed type
        priority: 0.7,
      }))
    : []; // If dynamicData is not an array, return an empty array of dynamic routes

  // Log the dynamic routes to verify
  // console.log('Dynamic Routes:', dynamicRoutes);

  // Static routes
  const staticRoutes = [
    {
      url: "https://www.yourlab.in",
      lastModified: new Date(),
      changeFrequency: "yearly" as "yearly",
      priority: 1,
    },
    
    ...dynamicDoctorsRoutes,
  ];

  // Log the final sitemap
  // console.log('Sitemap:', staticRoutes);

  // Return combined static and dynamic routes
  return staticRoutes;
}
