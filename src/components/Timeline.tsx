import {
  Timeline,
  TimelineItem,
  TimelineConnector,
  TimelineIcon,
  Typography,
  TimelineHeader,
  Checkbox,
} from "@material-tailwind/react";
import {
  BellIcon,
  ArchiveBoxIcon,
  CurrencyDollarIcon,
} from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";
import { api } from "@/services/api";
import { TaskProps } from "@/app/interfaces/Task";
import { parseCookies } from "nookies";
import { jwtDecode } from "jwt-decode";
import { UserBack, UserData } from "@/app/interfaces/User";
import moment, { Moment } from "moment";
import { finished } from "stream";

interface ActvitiesTimelineProps {
  initialDate: Moment | null;
  finalDate: Moment | null;
  setTask: (value: TaskProps) => void;
  setAdd: (value: boolean) => void;
}
export function ActivitiesTimeline(props: ActvitiesTimelineProps) {
  const [tasks, setTasks] = useState<TaskProps[]>();
  const [user, setUser] = useState<UserData | null>(null);
  const [reload, setReload] = useState(false);

  const handleCheck = async (id: string, finished: boolean) => {
    await api
      .put(`/task/update/${id}`, {
        finished: !finished,
      })
      .then((res) => {
        setReload(!reload);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleGetTasks = async (user: UserData) => {
    let initialDate;
    let finalDate;
    if (props.initialDate) {
      initialDate = new Date(
        props.initialDate?.toDate().setUTCHours(0, 0, 0, 0)
      );
    }
    if (props.finalDate) {
      finalDate = new Date(
        props.finalDate.toDate().setUTCHours(23, 59, 59, 999)
      );
    }
    await api
      .get(`/task/list/${user?.idUser}`, {
        params: {
          initialDate: initialDate,
          finalDate: finalDate,
        },
      })
      .then((res) => {
        if (res) {
          setTasks(res.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleInfo = (value: TaskProps) => {
    props.setTask(value);
    props.setAdd(true);
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

    handleGetTasks(aux);
  }, [reload]);
  return (
    <div className="w-[25rem]">
      <Timeline>
        {tasks?.map((task) => {
          return (
            <TimelineItem className="h-28">
              <TimelineConnector className="!w-[78px]" />
              <TimelineHeader className="relative rounded-xl border border-blue-gray-50 bg-white py-3 pl-4 pr-8 shadow-lg shadow-blue-gray-900/5">
                {/* <TimelineIcon className="p-3" variant="ghost">
                  <BellIcon className="h-5 w-5" />
                </TimelineIcon> */}
                <Checkbox
                  defaultChecked
                  checked={task.finished}
                  onClick={() => handleCheck(task.taskId, task.finished)}
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                  crossOrigin={undefined}
                />
                <div
                  onClick={() => handleInfo(task)}
                  className="flex flex-col gap-1"
                >
                  <Typography
                    variant="h6"
                    color="blue-gray"
                    placeholder={undefined}
                    onPointerEnterCapture={undefined}
                    onPointerLeaveCapture={undefined}
                  >
                    {task.title}
                  </Typography>
                  <div className="flex justify-between items-center gap-5">
                    <Typography
                      variant="small"
                      color="gray"
                      className="font-normal"
                      placeholder={undefined}
                      onPointerEnterCapture={undefined}
                      onPointerLeaveCapture={undefined}
                    >
                      {/* {moment(task.date, "MMMM Do YYYY, h:mm a")
                      .locale("pt-br")
                      .toString()} */}
                      {moment(task.date.toString(), "").locale("pt-br").format(
                        "DD/MM/YYYY hh:mm"
                      )}
                    </Typography>
                    <Typography
                      variant="small"
                      color="gray"
                      className="font-normal"
                      placeholder={undefined}
                      onPointerEnterCapture={undefined}
                      onPointerLeaveCapture={undefined}
                    >
                      {/* {moment(task.date, "MMMM Do YYYY, h:mm a")
                      .locale("pt-br")
                      .toString()} */}
                      {task.duration} minutos
                    </Typography>
                  </div>
                  <Typography
                    variant="small"
                    color="gray"
                    className="font-normal"
                    placeholder={undefined}
                    onPointerEnterCapture={undefined}
                    onPointerLeaveCapture={undefined}
                  >
                    {/* {moment(task.date, "MMMM Do YYYY, h:mm a")
                      .locale("pt-br")
                      .toString()} */}
                    {task.desc}
                  </Typography>
                </div>
              </TimelineHeader>
            </TimelineItem>
          );
        })}
      </Timeline>
    </div>
  );
}
