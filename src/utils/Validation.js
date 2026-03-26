export const validateRegister = (data) => {
  const errors = {};

  if (!data.username || data.username.length < 3) {
    errors.username = "Username must be 3+ chars";
  }

  if (!/\S+@\S+\.\S+/.test(data.email)) {
    errors.email = "Invalid email";
  }

  if (!data.password || data.password.length < 6) {
    errors.password = "Password must be 6+ chars";
  }

  if (!data.fullName || data.fullName.length < 2) {
    errors.fullName = "Full name required";
  }

  return errors;
};

export const validateLogin = (data) => {
  const errors = {};

  if (!/\S+@\S+\.\S+/.test(data.email)) {
    errors.email = "Invalid email";
  }

  if (!data.password) {
    errors.password = "Password required";
  }

  return errors;
};