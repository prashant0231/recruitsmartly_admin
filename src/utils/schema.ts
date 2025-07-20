import * as Yup from "yup";

export const LoginFormSchema = Yup.object().shape({
  email: Yup.string()
    .matches(
      /^[^\s@]+@[^\s@]+\.(com|co|in|uk|net|org|gov|edu|info|biz|us|ca|au|de|fr|cn|jp|ru|xyz|tech|store|online|site)$/,
      "Email must have a valid domain extension (e.g., .com, .co, .in, .uk, etc.)"
    )
    .required("Email is required"),
  // password: Yup.string()
  //   .min(
  //     8,
  //     "Password must be at least 8 characters, with one uppercase and one special character"
  //   )
  //   .matches(
  //     /(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>])/,
  //     "Password must be at least 8 characters, with one uppercase and one special character"
  //   )
  //   .required("Password is required"),
  password: Yup.string().required(),
});
