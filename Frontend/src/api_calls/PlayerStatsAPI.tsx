import axios from "axios";

export const GetPlayerStats = async (userId: number) => {
    // Retrieve the token from localStorage (or wherever it's stored)
    const token = localStorage.getItem("token");

    // Include the token in the request header for authorization
    const response = await axios.get(
      `http://localhost:5432/api/playerstats/getplayerstats/${userId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,  // Add Bearer token to Authorization header
        },
      }
    );

    if (response.status !== 200) {
        throw new Error(response.data?.message || "Failed to fetch userStats");
    }

    return response.data;  // Return the player stats data
};
