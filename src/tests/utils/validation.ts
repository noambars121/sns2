export const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

export const phoneRegex = /^\+?[1-9]\d{1,14}$/;

export const validateEmail = (email: string): boolean => {
  return emailRegex.test(email);
};

export const validatePhone = (phone: string): boolean => {
  return phoneRegex.test(phone);
};

export const validateRequired = (value: string): boolean => {
  return value.trim().length > 0;
};

export const validateZipCode = (zipCode: string): boolean => {
  return /^\d{5}(-\d{4})?$/.test(zipCode);
};

export const validateCreditCard = (cardNumber: string): boolean => {
  return /^\d{16}$/.test(cardNumber);
};

export const getErrorMessage = (field: string, type: string): string => {
  const messages = {
    required: `${field} is required`,
    email: "Invalid email address",
    phone: "Invalid phone number",
    zipCode: "Invalid ZIP code",
    creditCard: "Invalid credit card number",
  };
  return messages[type] || "Invalid input";
};
