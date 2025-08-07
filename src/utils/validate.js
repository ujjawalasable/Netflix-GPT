export const checkValidData = (name, email, password) => {
  // Email regex
  const isEmailValid = /^[a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);

  // Password regex: min 8 chars, at least one digit, one lowercase, one uppercase
  const isPasswordValid =
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(password);

  // If name is provided (i.e., signup form)
  if (name !== undefined && name.trim() !== '') {
    const isNameValid = /^([A-ZÀ-ÿ][a-zà-ÿ.'-]{1,})(\s[A-ZÀ-ÿ][a-zà-ÿ.'-]{1,})*$/.test(name.trim());
    if (!isNameValid) return 'Name is not valid';
  }

  if (!isEmailValid) return 'Email ID is not valid';
  if (!isPasswordValid)
    return 'Password must be at least 8 characters and include a digit, a lowercase and an uppercase letter.';

  return null;
};
