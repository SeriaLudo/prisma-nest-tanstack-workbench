// setup basic routes for API

const baseUrl = process.env.BASE_URL;

export const getUsers = async () => {
  const response = await fetch(`${baseUrl}/auth/all`);
  console.log(response);
  return response.json();
};
