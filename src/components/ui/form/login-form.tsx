import { useFormik } from "formik";
import React from "react";
import Button from "../button";
import { loginSchemas } from "../../../schemas";
import "../../../App.css";
import useToggle from "../../customersHook/useToogle";
const LoginForm: React.FC = () => {
  const [isToggled, toggle] = useToggle(false);
  const onSubmit = () => {
    console.log("submit");
  };

  const { values, errors, touched, handleChange, handleSubmit } = useFormik({
    initialValues: {
      userName: "",
      password: "",
    },
    onSubmit,
    validationSchema: loginSchemas,
  });

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full flex-col mt-10 p-[10px_15px] "
    >
      <div className="flex flex-col mb-3">
        <input
          id="userName"
          name="userName"
          type="text"
          onChange={handleChange}
          value={values.userName}
          className={`border p-[5px_10px] w-full border-[#ccc9c9] outline-none border-1 bg-[#e3dfdf] ${
            errors.userName && touched.userName ? "input-error" : ""
          }`}
          placeholder="Теллефон,имя пользователя или эл.адрес "
        />
        {errors.userName && touched.userName && (
          <span className="error">{errors.userName}</span>
        )}
      </div>
      <div className="flex flex-col mb-3 relative">
        <input
          id="password"
          name="password"
          type={`${isToggled ? "text" : "password"}`}
          onChange={handleChange}
          value={values.password}
          className={`border p-[5px_10px] border-[#ccc9c9]  outline-none border-1 bg-[#e3dfdf] ${
            errors.password && touched.password ? "input-error" : ""
          }`}
          placeholder="Пароль"
        />
        {errors.password && touched.password && (
          <span className="error my-[0px]">{errors.password}</span>
        )}

        {values.password != "" && (
          <span
            className="absolute right-2 mt-1 cursor-pointer hover:text-gray-400"
            onClick={toggle}
          >
            {isToggled ? "Скрыт" : "Показать"}
          </span>
        )}
      </div>
      {values.userName == "" || values.password == "" ? (
        <Button
          label={"Войти"}
          clasName={`p-[8px_15px]  rounded-2xl`}
          disabled={true}
        />
      ) : (
        <Button
          label={"Войти"}
          clasName={`p-[8px_15px]  rounded-2xl`}
          disabled={false}
        />
      )}

      <div className="flex items-center justify-center mt-5">
        <div className="h-px bg-gray-700 w-1/2" />
        <p className="mx-4">ИЛИ</p>
        <div className="h-px bg-gray-700 w-1/2" />
      </div>
    </form>
  );
};

export default LoginForm;
