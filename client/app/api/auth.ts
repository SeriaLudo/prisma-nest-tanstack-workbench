// auth.ts (or within your api module)
export const getUser = () => {
  const token = localStorage.getItem("authToken");
  if (!token) return null;

  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );
    const payload = JSON.parse(jsonPayload);
    return payload.user;
  } catch (error) {
    console.error("Failed to decode token", error);
    return null;
  }
};

export const isLoggedIn = () => {
  return getUser() !== null;
};
