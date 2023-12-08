import * as yup from "yup";
const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/;
export const loginSchemas = yup.object().shape({
  userName: yup.string().required("Required"),
  password: yup.string().min(5).required("Required"),
});

export const registerSchemas = yup.object().shape({
  userName: yup.string().required("Required"),
  fullName: yup.string().required("Required"),
  email: yup.string().email("Please enter a valid emil").required("Required"),
  password: yup
    .string()
    .min(5)
    .matches(passwordRules, { message: "Please create a stronger password" })
    .required("Required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), undefined], "Password must match")
    .required("Required"),
});
