// Define the return type for validation functions
type ValidationResult = string | null;

export const validateName = (name: string): ValidationResult => {
  if (!name) return "Name is required";
  if (/[^a-zA-Z\s]/.test(name)) return "Name must only contain alphabet characters";
  return null;
};

export const validateMobile = (mobile: string): ValidationResult => {
  if (!mobile) return "Mobile number is required";
  if (mobile.length !== 10) return "Mobile number should be 10 digits";
  if (!/^\d+$/.test(mobile)) return "Mobile number must be numeric";
  if (!/^[6-9]/.test(mobile)) return "Mobile number must start from a digit between 6 and 9";
  return null;
};

export const validateAge = (age: number): ValidationResult => {
  if (!age && age !== 0) return "Age is required";
  if (!/^\d+$/.test(age.toString())) return "Age must be numeric";
  if (age > 100 || age < 0) return "Age must be between 0 and 100";
  return null;
};

export const validateWeight = (weight: number): ValidationResult => {
  if (!weight && weight !== 0) return "Weight is required";
  if (!/^\d+(\.\d+)?$/.test(weight.toString())) return "Weight must be a valid number"; // allows decimal values
  if (weight > 300 || weight < 0) return "Weight must be between 0 and 300";
  return null;
};

export const validateBP = (BP: string): ValidationResult => {
  if (!BP) return "BP is required";
  if (!/^\d{2,3} \/ \d{2,3}$/.test(BP)) return 'BP must be in the format "120 / 80"';

  const [systolic, diastolic] = BP.split(" / ").map(Number);

  if (systolic < 90 || systolic > 180) return "Systolic BP must be between 90 and 180";
  if (diastolic < 60 || diastolic > 120) return "Diastolic BP must be between 60 and 120";

  return null;
};

export const validatePulse = (pulse: number): ValidationResult => {
  if (!pulse && pulse !== 0) return "Pulse is required";
  if (!/^\d+$/.test(pulse.toString())) return "Pulse must be numeric";
  return null;
};

export const validateGender = (gender: string): ValidationResult => {
  if (!gender) return "Gender is required";
  return null;
};

export const validateDiabetes = (diabetes: string): ValidationResult => {
  if (!diabetes) return "Diabetes status is required";
  return null;
};

export const validateBp = (bp: string): ValidationResult => {
  if (!bp) return "BP status is required";
  return null;
};
