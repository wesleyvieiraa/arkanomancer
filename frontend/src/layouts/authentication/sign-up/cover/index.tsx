import { Link } from "react-router-dom";
import Card from "@mui/material/Card";
import Checkbox from "@mui/material/Checkbox";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import CoverLayout from "layouts/authentication/components/CoverLayout";
import bgImage from "assets/images/bg-sign-up-cover.jpeg";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import authService from "services/auth-service";
import { useContext, useState } from "react";
import { AuthContext } from "context";

function Cover(): JSX.Element {
  interface FormData {
    name: string;
    email: string;
    password: string;
  }

  const authContext = useContext(AuthContext);
  const [credentialsErros, setCredentialsError] = useState(null);
  const validationSchema: yup.ObjectSchema<FormData> = yup
    .object({
      name: yup.string().required("Campo obrigatório"),
      email: yup.string().email("E-mail inválido").required("Campo obrigatório"),
      password: yup.string().required("Campo obrigatório"),
    })
    .required();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(validationSchema) as any,
  });
  const onSubmit = async (data: FormData) => {
    try {
      const response = await authService.register(data);
      authContext.login(response.token);
    } catch (res: any) {
      setCredentialsError(res.errors.map((e: { msg: string }) => e.msg).join(", "));
    }
  };

  return (
    <CoverLayout>
      <Card sx={{ backgroundColor: "#71080d" }}>
        <MDBox
          // variant="gradient"
          bgColor="#B62E34"
          borderRadius="lg"
          coloredShadow="success"
          mx={2}
          mt={-3}
          p={3}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            Cadastre-se
          </MDTypography>
          <MDTypography display="block" variant="button" color="white" my={1}>
            Digite seu e-mail e senha para se registrar
          </MDTypography>
        </MDBox>
        <MDBox pt={4} pb={3} px={3} bgColor="#71080d">
          <MDBox component="form" role="form" method="POST" onSubmit={handleSubmit(onSubmit)}>
            <MDBox mb={2}>
              <MDInput
                type="text"
                label="Name"
                variant="standard"
                fullWidth
                {...register("name")}
                error={errors.name}
              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="email"
                label="E-mail"
                variant="standard"
                fullWidth
                {...register("email")}
                error={errors.email}
              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="password"
                label="Senha"
                variant="standard"
                fullWidth
                {...register("password")}
                error={errors.password}
              />
            </MDBox>
            {credentialsErros && (
              <MDTypography variant="caption" color="error" fontWeight="light">
                {credentialsErros}
              </MDTypography>
            )}
            <MDBox mt={4} mb={1}>
              <MDButton variant="gradient" color="error" fullWidth type="submit">
                Inscrever-se
              </MDButton>
            </MDBox>
            <MDBox mt={3} mb={1} textAlign="center">
              <MDTypography variant="button" color="text">
                Já possui uma conta?{" "}
                <MDTypography
                  component={Link}
                  to="/auth/login"
                  variant="button"
                  color="error"
                  fontWeight="medium"
                  textGradient
                >
                  Entrar
                </MDTypography>
              </MDTypography>
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
    </CoverLayout>
  );
}

export default Cover;
