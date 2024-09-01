import * as Yup from "yup";

export const ValidationSchema = Yup.object({
  name: Yup.string()
    .max(20, "Must be 15 characters or less")
    .required("Required"),
  phone: Yup.string()
    .matches(/^\+91\d{10}$/, "Phone number must be in the format +91XXXXXXXXXX")
    .required("Required"),
  age: Yup.number()
    .min(1, "Must be at least 1")
    .required("Required")
    .integer("Must be an integer"),
  message: Yup.string()
    .min(10, "Must be at least 10 characters")
    .required("Required"),
});
