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
import { registerSchemas } from "../../../schemas";
import Button from "../button";
import { PasswordFormik, RegisterFormik } from "./form-from-formik";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const RegisterForm = () => {
  const navigate = useNavigate();
  const handleSubmit = async (value: FormValues) => {
    const { email, fullName, password, userName, confirmPassword } = {
      ...value,
    };
    try {
      const data = await axios.post(
        `http://65.108.148.136:8085/Account/register`,
        {
          userName: userName,
          fullName: fullName,
          email: email,
          password: password,
          confirmPassword: confirmPassword,
        },
      );
      console.log(data == null);
      console.log(data.statusText === "null");
      console.log(data.statusText == "OK");

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
