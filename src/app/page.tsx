"use client";
import { LoadingIcon } from "@/components/icons";
import { AuthContext } from "@/context/AuthProvider";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Checkbox,
  Button,
  Alert,
} from "@material-tailwind/react";
import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export default function Login() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const { signIn } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  async function handleSignIn(data: any) {
    setLoading(true);
    await signIn(data)
      .then((res) => {
        setLoading(false);
        // if (res) {
        //   setMessage(res);
        //   setShowAlert(true);
        // }
      })
      .catch((err) => {
        setLoading(false);
        if (err) {
          if (typeof err.error === "string") {
            setMessage(err.error);
            setShowAlert(true);
          } else {
            setMessage("Ocorreu um erro, tente novamente mais tarde");
            setShowAlert(true);
          }
        }
      });
  }

  useEffect(() => {
    const timeId = setTimeout(() => {
      // After 3 seconds set the show value to false
      setShowAlert(false);
    }, 3000);

    return () => {
      clearTimeout(timeId);
    };
  }, [message]);

  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <Card
        className="w-96"
        placeholder={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
      >
        <CardHeader
          variant="gradient"
          color="gray"
          className="mb-4 grid h-28 place-items-center"
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          <Typography
            variant="h3"
            color="white"
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            Bem Vindo
          </Typography>
        </CardHeader>
        <form method="POST" onSubmit={handleSubmit(handleSignIn)}>
          <CardBody
            className="flex flex-col gap-4"
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            <Input
              label="Username"
              size="lg"
              {...register("username", {
                required: "Campo de username é obrigatório",
              })}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
              crossOrigin={undefined}
            />
            <Input
              label="Senha"
              size="lg"
              type="password"
              {...register("password", {
                required: "Campo de senha é obrigatório",
              })}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
              crossOrigin={undefined}
              icon={
                <i
                  onClick={() => setPasswordVisible(!passwordVisible)}
                  className="fas fa-heart"
                />
              }
            />
          </CardBody>
          <CardFooter
            className="pt-0"
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            <Button
              variant="gradient"
              fullWidth
              type="submit"
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
              className="flex justify-center items-center"
            >
              {!loading ? (
                <p className="font-normal text-white">Login</p>
              ) : (
                <LoadingIcon colorFill="#FFFFFF" />
              )}
            </Button>
            <Typography
              variant="small"
              className="mt-6 flex justify-center"
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            >
              Não possui uma conta?
              <Typography
                as="a"
                href="#signup"
                variant="small"
                color="blue-gray"
                className="ml-1 font-bold"
                placeholder={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
              >
                Cadastre-se
              </Typography>
            </Typography>
          </CardFooter>
        </form>
      </Card>
      <Alert
        open={showAlert}
        onClose={() => setShowAlert(false)}
        className="bg-[#F97373] bottom-0 right-0 w-fit absolute m-7"
        animate={{
          mount: { y: 0 },
          unmount: { y: 100 },
        }}
      >
        {message}
      </Alert>
    </div>
  );
}
