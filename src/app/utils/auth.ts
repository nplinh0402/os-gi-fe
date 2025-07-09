class AuthUtils {
  getAuthenticatedUser = () => {
    if (!sessionStorage.getItem("authUser")) {
      return null;
    }
    return JSON.parse(sessionStorage.getItem("authUser"));
  };
}
