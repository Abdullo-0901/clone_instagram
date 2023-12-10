import { useFormik } from "formik";
import React from "react";
import "../../../App.css";
import { registerSchemas } from "../../../schemas";
import useToggle from "../../customersHook/useToogle";
import Button from "../button";
import { useNavigate } from "react-router-dom";
const RegisterForm: React.FC = () => {
  const [isToggled, toggle] = useToggle(false);
  const navigate = useNavigate();
  const onSubmit = () => {
    console.log("submit");
  };

  const { values, errors, touched, handleChange, handleSubmit } = useFormik({
    initialValues: {
      userName: "",
      fullName: "",
      email: "",
      password: "",
    },
    onSubmit,
    validationSchema: registerSchemas,
  });

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full flex-col mt-10 p-[10px_15px] "
    >
      <div className="flex flex-col mb-3">
        <input
          id="email"
          name="email"
          type="text"
          onChange={handleChange}
          value={values.email}
          className={`border p-[5px_10px] w-full border-[#ccc9c9] outline-none border-1 bg-[#e3dfdf] ${
            errors.email && touched.email ? "input-error" : ""
          }`}
          placeholder="Моб тел.эл.адрес "
        />
        {errors.email && touched.email && (
          <span className="error">{errors.email}</span>
        )}
      </div>
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
          placeholder="Имя фамиля  "
        />
        {errors.userName && touched.userName && (
          <span className="error">{errors.userName}</span>
        )}
      </div>
      <div className="flex flex-col mb-3">
        <input
          id="fullName"
          name="fullName"
          type="text"
          onChange={handleChange}
          value={values.fullName}
          className={`border p-[5px_10px] w-full border-[#ccc9c9] outline-none border-1 bg-[#e3dfdf] ${
            errors.fullName && touched.fullName ? "input-error" : ""
          }`}
          placeholder="Имя пользователь"
        />
        {errors.fullName && touched.fullName && (
          <span className="error">{errors.fullName}</span>
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
      <p className="text-[12px] p-[5px_15px] text-gray-400 text-center">
        Люди, которые пользуются нашим сервисом, могли загрузить вашу контактную
        информацию в Instagram. Подробнее
      </p>
      <p className="text-[12px] p-[5px_15px] text-gray-400 text-center">
        Регистрируясь, вы принимаете наши{" "}
        <span className="text-blue-600 cursor-pointer">
          Условия, Политику конфиденциальности и Политику в отношении файлов
          cookie
        </span>
        .
      </p>
      {values.userName == "" || values.password == "" ? (
        <Button
          label={"Войти"}
          clasName={`p-[8px_15px] mt-5  rounded-2xl`}
          disabled={true}
        />
      ) : (
        <Button
          label={"Войти"}
          clasName={`p-[8px_15px] mt-5  rounded-2xl`}
          disabled={false}
        />
      )}
    </form>
  );
};

export default RegisterForm;
