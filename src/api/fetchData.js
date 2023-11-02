import axios from "axios";

export const fetchAllProviders = async () => {
  try {
    const response = await axios.get(
      "http://localhost:5000/api/v1/providers/getAllProviders"
    );

    if (!response || !response.data) {
      throw new Error(response.message);
    }

    const { providers } = response.data.data;
    console.log(providers);
    if (providers.length === 0) return [];
    return providers;
  } catch (error) {
    console.log(error.message);
    return null;
  }
};
