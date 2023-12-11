import { FieldHookConfig, useField } from "formik";
import { ClassAttributes, InputHTMLAttributes } from "react";

type MyRegisterProps = {
  userName?: string;
  fullName?: string;
  email?: string;
};
type MyRegisterPropsPassword = {
  password?: string;
};
const RegisterFormik = ({
  ...props
}: MyRegisterProps &
  InputHTMLAttributes<HTMLInputElement> &
  ClassAttributes<HTMLInputElement> &
  FieldHookConfig<string>) => {
  const [field, meta] = useField(props);
  console.log(field);

  return (
    <div className="flex flex-col mb-3">
      <input
        {...field}
        {...props}
        className={`border p-[5px_10px] w-full border-[#ccc9c9] outline-none border-1 bg-[#e3dfdf] ${
          meta.touched && meta.error ? "input-error" : ""
        }`}
      />
      {meta.touched && meta.error && (
        <span className="error">{meta.error}</span>
      )}
    </div>
  );
};

const PasswordFormik = ({
  ...props
}: MyRegisterPropsPassword &
  InputHTMLAttributes<HTMLInputElement> &
  ClassAttributes<HTMLInputElement> &
  FieldHookConfig<string>) => {
  const [field, meta] = useField(props);
  console.log(field.value);

  return (
    <div className="flex flex-col mb-3">
      <div className="flex flex-col mb-3 relative">
        <input
          {...field}
          {...props}
          className={`border p-[5px_10px] w-full border-[#ccc9c9] outline-none border-1 bg-[#e3dfdf] ${
            meta.touched && meta.error ? "input-error" : ""
          }`}
        />
        {field.value != "" && (
          <span
            className="absolute right-2 mt-1 cursor-pointer hover:text-gray-400"
            // onClick={toggle}
          >
            {/* {isToggled ? "Скрыт" : "Показать"} */}
          </span>
        )}
      </div>
      {meta.touched && meta.error && (
        <span className="error">{meta.error}</span>
      )}
    </div>
  );
};
export { PasswordFormik, RegisterFormik };
