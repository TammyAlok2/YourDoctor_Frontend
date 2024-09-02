export const validateName = (name) => {
    if (!name) return 'Name is required';
    if (/[^a-zA-Z\s]/.test(name)) return 'Name must only contain alphabet characters';
    return null;
  };
  
  export const validateMobile = (mobile) => {
    if (!mobile) return 'Mobile number is required';
    if(!mobile.length===10) return 'Mobile number should be 10 digits'
    if (!/^\d+$/.test(mobile)) return 'Mobile number must be numeric';
    if (!/^[6-9]/.test(mobile)) return 'Mobile number must be start from no. 6 to 9';
    return null;
  };
  
  export const validateAge = (age) => {
    if (!age) return 'Age is required';
    if (!/^\d+$/.test(age)) return 'Age must be numeric';
    if(age > 100 || age < 0) return "Age must be btw 0 to 100"
    return null;
  };
  
  export const validateWeight = (weight) => {
    if (!weight) return 'Weight is required';
    if (!/^\d+(\.\d+)?$/.test(weight)) return 'Weight must be a valid number'; // allows decimal values
      if(weight > 300 || weight < 0) return "Weight must be btw 0 to 300"
    return null;
  };
  
  export const validateBP = (BP) => {
    if (!BP) return 'BP is required';
    if (!/^\d{2,3} \/ \d{2,3}$/.test(BP)) return 'BP must be in the format "120 / 80"';
  
    const [systolic, diastolic] = BP.split(' / ').map(Number);
  
    if (systolic < 90 || systolic > 180) return 'Systolic BP must be between 90 and 180';
    if (diastolic < 60 || diastolic > 120) return 'Diastolic BP must be between 60 and 120';
  
    return null;
  };
  
  
  export const validatePulse = (pulse) => {
    if (!pulse) return 'Pulse is required';
    if (!/^\d+$/.test(pulse)) return 'Pulse must be numeric';
    return null;
  };
  
  export const validateGender = (gender) => {
    if (!gender) return 'Gender is required';
    return null;
  };
  
  export const validateDiabetes = (diabetes) => {
    if (!diabetes) return 'Diabetes status is required';
    return null;
  };
  
  export const validateBp = (bp) => {
    if (!bp) return 'BP status is required';
    return null;
  };
  