interface FormValues {
  userName: string;
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
}
const initialValues: FormValues = {
  userName: "",
  fullName: "",
  email: "",
  password: "",
  confirmPassword: "",
};
import { Form, Formik } from "formik";
import { useNavigate } from "react-router-dom";
import { registerSchemas } from "../../../schemas";
import { axiosRequest } from "../../../utils/AxiosRequest";
import Button from "../button";
import { PasswordFormik, RegisterFormik } from "./form-from-formik";
const RegisterForm = () => {
  const navigate = useNavigate();
  const handleSubmit = async (value: FormValues) => {
    const { email, fullName, password, userName, confirmPassword } = {
      ...value,
    };
    let user = {
      userName: userName,
      fullName: fullName,
      email: email,
      password: password,
      confirmPassword: confirmPassword,
    };
    try {
      let { data } = await axiosRequest.post("Account/register", user);
      if (data.statusText == "OK") {
        navigate("/");
      }
      return data;
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={registerSchemas}
    >
      {(props) => (
        <Form>
          <RegisterFormik
            name="email"
            type="email"
            placeholder="Моб тел.эл.адрес"
          />
          <RegisterFormik
            name="userName"
            type="text"
            placeholder="Имя фамиля"
          />
          <RegisterFormik
            name="fullName"
            type="text"
            placeholder="Имя пользователь"
          />
          <PasswordFormik
            name="password"
            type="password"
            placeholder="Пароль"
          />
          <RegisterFormik
            name="confirmPassword"
            type="password"
            placeholder="Повторить пороль"
          />

          <Button
            onClick={() => handleSubmit({ ...props.values })}
            label={"Войти"}
            clasName={`p-[8px_15px] mt-5 w-full  rounded-2xl`}
            disabled={false}
          />
        </Form>
      )}
    </Formik>
  );
};

export default RegisterForm;
