const BASE_URL = process.env.REACT_APP_API_URL;

const debug_mode = false;

export async function fetchWithAuth(path, options = {}) {
  try {

    if (debug_mode) {
      console.log("fetchWithAuth path:");
      console.log(path);

      console.log("options: ");
      console.log(options);
    }

    const res = await fetch(`${BASE_URL}${path}`, {
      ...options,
      credentials: "include",
    });

    if (res.status === 401) {
      window.location.href = "/login";
      return;
    }

    if (!res.ok) {
      throw new Error(`Request failed with status ${res.status}`);
    }

    return res;
  } catch (error) {
    console.error("Error during fetchWithAuth:", error);
    throw error;
  }
}

export async function fetchGetWithAuth(path) {
  try {
    const res = await fetchWithAuth(path);
    return res.json();
  } catch (error) {
    console.error("Error during fetchGetWithAuth:", error);
    throw error;
  }
}

export async function fetchPostWithAuth(path, data) {

  if (debug_mode) {
    console.log("fetchPostWithAuth data: ");
    console.log(data);
  }

  return fetchWithAuth(path, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
}
