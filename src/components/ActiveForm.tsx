import { TaskInputProps, TaskProps } from "@/app/interfaces/Task";
import { UserBack, UserData } from "@/app/interfaces/User";
import { AuthContext } from "@/context/AuthProvider";
import { api } from "@/services/api";
import { Button, Input, Textarea, Typography } from "@material-tailwind/react";
import { jwtDecode } from "jwt-decode";
import moment, { Moment, duration } from "moment";
import { parseCookies } from "nookies";
import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import "moment/locale/pt-br";

interface ActivityFormProps {
  setAdd: (value: boolean) => void;
  inDay: Moment | null;
  task: TaskProps | null;
}
export default function ActivityForm(props: ActivityFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      date: props.task
        ? moment(props.task.date).locale("pt-br").format("YYYY-MM-DD")
        : props.inDay?.format("YYYY-MM-DD"),
      title: props.task?.title,
      desc: props.task?.desc,
      duration: props.task?.duration,
      time: props.task
        ? moment(props.task?.date).locale("pt-br").format("hh:mm")
        : "",
    },
  });
  const [user, setUser] = useState<UserData | null>(null);
  const handleAdd = async (data: any) => {
    let newDate = new Date(data.date);
    let date = newDate.setDate(newDate.getDate() + 1);
    const [hours, minutes] = data.time.split(":").map(Number);
    newDate.setHours(hours, minutes, 0, 0);
    console.log(newDate);
    if (props.task) {
      await api
        .put(`/task/update/${props.task.taskId}`, {
          title: data.title,
          desc: data.desc,
          date: newDate,
          duration: Number(data.duration),
        })
        .then((res) => {
          props.setAdd(false);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      await api
        .post(`/task/create`, {
          title: data.title,
          desc: data.desc,
          date: newDate,
          duration: Number(data.duration),
          userId: user?.idUser,
        })
        .then((res) => {
          props.setAdd(false);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  useEffect(() => {
    const { "cal.token": token } = parseCookies();
    var decoded: UserBack = jwtDecode(token);
    let aux: UserData = {
      name: decoded.name,
      idUser: decoded.idUser,
      username: decoded.username,
    };
    setUser(aux);
  }, []);
  return (
    <form
      method="POST"
      onSubmit={handleSubmit(handleAdd)}
      className="flex flex-col gap-3"
    >
      <Input
        label="Título"
        {...register("title", {
          required: "Campo de titulo é obrigatório",
        })}
        className="col-span-2 col-start-1 col-end-2"
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
        crossOrigin={undefined}
      />
      <div className="flex gap-3">
        <Input
          type="date"
          {...register("date", {
            required: "Campo de data é obrigatório",
          })}
          //   defaultValue={props.inDay?.format("DD/MM/YYYY")}
          label="Data"
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
          crossOrigin={undefined}
        />
        <Input
          type="time"
          label="Hora"
          {...register("time", {
            required: "Campo de hora é obrigatório",
          })}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
          crossOrigin={undefined}
        />
      </div>
      <div className="grid grid-cols-2 gap-3 items-center">
        <Input
          type="number"
          label="Duração"
          {...register("duration", {
            required: "Campo de duração é obrigatório",
          })}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
          crossOrigin={undefined}
        />
        <Typography
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          * Duração em minutos
        </Typography>
      </div>
      <Textarea
        label="Descrição"
        {...register("desc", {
          required: "Campo de descrição é obrigatório",
        })}
        className="col-span-2 col-end-2"
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
      />
      <Button
        className="col-start-2"
        type="submit"
        placeholder={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
      >
        Salvar
      </Button>
    </form>
  );
}
