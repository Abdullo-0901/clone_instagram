import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import {
  Button,
  Checkbox,
  FormControlLabel,
  FormHelperText,
  IconButton,
  InputAdornment,
  OutlinedInput,
  Stack,
  Typography,
} from "@mui/material";
import axios from "axios";
import { Formik } from "formik";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginSchemas } from "../../../schemas";
import { setToken } from "../../../store/storeSlice";
import { saveToken } from "../../../utils/token";

const LoginForm = () => {
  const [showPassword, setShowPassword] = React.useState(false);
  const [checked, setChecked] = React.useState(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [erorEP, setErorEP] = React.useState();
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  console.log(loading);

  const handleMouseDownPassword = (event: any) => {
    event.preventDefault();
  };
  const navigate = useNavigate();
  const dispatch = useDispatch();
  return (
    <div className="bg-[#fafafb]">
      <div className="bgLogin">
        <Formik
          initialValues={{
            userName: "",
            password: "",
            submit: null,
          }}
          validationSchema={loginSchemas}
          onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
            try {
              setStatus({ success: false });
              setSubmitting(false);
              setLoading(true);
              const data = await axios.post(
                `${import.meta.env.VITE_APP_API_URL}Account/login`,
                {
                  userName: values.userName,
                  password: values.password,
                },
              );
              if (data.statusText == "OK") {
                navigate("/home");
                dispatch(setToken(data.data.data));
                saveToken(data.data.data);
              }
            } catch (error: any) {
              setErorEP(error.response.data);
              setStatus({ success: false });
              setErrors({ submit: error.message });
              setSubmitting(false);
            }
          }}
        >
          {({
            errors,
            handleBlur,
            handleChange,
            handleSubmit,
            isSubmitting,
            touched,
            values,
          }) => (
            <form
              noValidate
              onSubmit={handleSubmit}
              className="flex  items-center justify-center"
            >
              <div className="flex flex-col  gap-y-7">
                <Stack>
                  <OutlinedInput
                    id="userName-login"
                    type="userName"
                    value={values.userName}
                    name="userName"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder=""
                    fullWidth
                    error={Boolean(touched.userName && errors.userName)}
                  />
                  {touched.userName && errors.userName && (
                    <FormHelperText
                      className="!-mb-3"
                      error
                      id="standard-weight-helper-text-email-login"
                    >
                      {errors.userName}
                    </FormHelperText>
                  )}
                </Stack>
                <Stack spacing={1}>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched.password && errors.password)}
                    id="-password-login"
                    type={showPassword ? "text" : "password"}
                    value={values.password}
                    name="password"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                          size="large"
                        >
                          {showPassword ? (
                            <VisibilityIcon />
                          ) : (
                            <VisibilityOffIcon />
                          )}
                        </IconButton>
                      </InputAdornment>
                    }
                    placeholder="Введите пароль"
                  />
                  {touched.password && errors.password && (
                    <FormHelperText
                      className="!-mb-3"
                      error
                      id="standard-weight-helper-text-password-login"
                    >
                      {errors.password}
                    </FormHelperText>
                  )}
                </Stack>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  className="-mt-4"
                  alignItems="center"
                >
                  <FormControlLabel
                    className="!text-[1rem]"
                    control={
                      <Checkbox
                        checked={checked}
                        onChange={(event) => setChecked(event.target.checked)}
                        name="checked"
                        color="primary"
                        size="small"
                      />
                    }
                    label={<Typography variant="h6">Запомнить меня</Typography>}
                  />
                </Stack>

                {erorEP && (
                  <FormHelperText
                    className="!-my-5"
                    error
                    id="standard-weight-helper-text-password-login"
                  >
                    {erorEP === "Wrong password"
                      ? "Неверный пароль"
                      : erorEP === "User width this email not exist"
                        ? "Такой адрес электронной почты не существует"
                        : null}
                  </FormHelperText>
                )}

                <Button
                  className="!mt-1"
                  disableElevation
                  disabled={isSubmitting}
                  fullWidth
                  size="large"
                  type="submit"
                  variant="contained"
                  color="primary"
                >
                  {loading ? "loading..." : "Войти"}
                </Button>
              </div>
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default LoginForm;
