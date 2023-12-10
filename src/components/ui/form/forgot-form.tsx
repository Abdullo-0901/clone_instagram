import { useFormik } from "formik";
import { forgotSchemas } from "../../../schemas";
import Button from "../button";

const ForgotForm = () => {
  const onSubmit = () => {
    console.log("submit");
  };
  const { values, errors, touched, handleChange, handleSubmit } = useFormik({
    initialValues: {
      email: "",
    },
    onSubmit,
    validationSchema: forgotSchemas,
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
          value={values.email}
          className={`border p-[10px_10px] rounded-[10px] w-full border-[#ccc9c9] outline-none border-1 bg-[#e3dfdf] ${
            errors.email && touched.email ? "input-error" : ""
          }`}
          placeholder="Теллефон,имя пользователя или эл.адрес "
        />
        {errors.email && touched.email && (
          <span className="error">{errors.email}</span>
        )}
      </div>
      <Button
        clasName={"p-[10px_15px] text-center rounded-xl"}
        label={"Получить ссылку для входа"}
      />
    </form>
  );
};

export default ForgotForm;
