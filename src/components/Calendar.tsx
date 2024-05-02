import moment, { Moment } from "moment";
import { useEffect, useState } from "react";
import Modal1 from "./ModalDay";
import { api } from "@/services/api";
import { UserBack, UserData } from "@/app/interfaces/User";
import { parseCookies } from "nookies";
import { jwtDecode } from "jwt-decode";
import { TaskProps } from "@/app/interfaces/Task";
import "moment/locale/pt-br";
import { isInMonth } from "@/functions/check-is-in-month";
import { finished } from "stream";

interface CalendarProps {
  date: Moment;
  reload: boolean;
}

export default function Calendar(props: CalendarProps) {
  //   let daysInMonth: number;
  //   let firstDayOfMonth: number;
  //   let days: (number | null)[] = [];
  //   useEffect(() => {
  const [date, setDate] = useState(props.date);
  const [days, setDays] = useState<number[]>([]);
  const [month, setMonth] = useState(props.date.month());
  const [year, setYear] = useState(props.date.year());
  const [previousMonth, setPreviousMonth] = useState(0);
  const [firstDay, setFirstDay] = useState(0);
  const [daysInMonth, setDaysInMonth] = useState(0);
  const [open, setOpen] = useState(false);
  const [calc, setCalc] = useState(0);
  const [inDay, setInDay] = useState<Moment | null>(null);

  const [tasks, setTasks] = useState<TaskProps[]>();
  const [user, setUser] = useState<UserData | null>(null);
  const [reload, setReload] = useState(false);
  const [idTask, setIdTask] = useState("");

  const getPreviousMonth = (date: Moment, firstDayOfMonth: number) => {
    let month = date.month();
    console.log(month);
    // setMonth(month);
    let aux = date;
    let previous;
    if (month !== 0) {
      let data = aux.add(-1, "months");
      previous = data.daysInMonth() - (firstDayOfMonth + 1);
    } else {
      let data = aux.add(12, "months");
      previous = data.daysInMonth() - firstDayOfMonth;
    }
    setPreviousMonth(() => previous);
    setCalc(() => 1);
    return previous;
  };

  const handleGetTasks = async (
    user: UserData,
    initialDate: Date,
    finalDate: Date
  ) => {
    // initialDate = new Date(initialDate.setUTCHours(0, 0, 0, 0));
    // finalDate = new Date(finalDate.setUTCHours(23, 59, 59, 999));
    initialDate = moment(initialDate).locale("pt-br").startOf("day").toDate();
    finalDate = moment(finalDate).locale("pt-br").endOf("day").toDate();
    await api
      .get(`/task/list/${user?.idUser}`, {
        params: {
          initialDate: initialDate,
          finalDate: finalDate,
          finishedS: "false",
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
  useEffect(() => {
    const { "cal.token": token } = parseCookies();
    var decoded: UserBack = jwtDecode(token);
    let aux: UserData = {
      name: decoded.name,
      idUser: decoded.idUser,
      username: decoded.username,
    };
    setUser(aux);

    let dateAux = new Date();
    handleGetTasks(
      aux,
      new Date(dateAux.getFullYear(), dateAux.getMonth(), 1),
      new Date(dateAux.getFullYear(), dateAux.getMonth() + 1, 0)
    );
  }, [reload]);

  useEffect(() => {
    setDate(props.date);
    let daysInMonth = date.daysInMonth();
    let firstDayOfMonth = date.startOf("month").weekday();
    let lastDayOfMonth = date.endOf("month").weekday();
    setFirstDay(firstDayOfMonth);
    setDaysInMonth(daysInMonth + firstDayOfMonth + 1);
    let total = daysInMonth + firstDayOfMonth + (7 - lastDayOfMonth);
    let value = 0;
    let aux1: number[] = [];
    let previous = previousMonth;
    if (calc === 0) {
      previous = getPreviousMonth(date, firstDayOfMonth);
    }
    while (value < total - 1) {
      if (value <= firstDayOfMonth) {
        aux1.push(previous + value);
      } else if (value > total - (7 - lastDayOfMonth) + 1) {
        aux1.push(value - daysInMonth - firstDayOfMonth - 1);
      } else {
        aux1.push(value - firstDayOfMonth);
      }
      value++;
    }
    setDays(aux1);
  }, [props.date]);

  const handleOpenDay = (value: Moment) => {
    setOpen(true);
    setInDay(value);
  };

  const handleInfo = (value: string) => {
    setIdTask(value);
  };
  //   let days: (number | null)[] = Array.from(
  //     { length: daysInMonth + firstDayOfMonth },
  //     (_, index) => (index < firstDayOfMonth ? null : index - firstDayOfMonth + 1)
  //   );
  //   });
  return (
    <div className="lg:flex lg:h-full lg:flex-col">
      <div className="shadow ring-1 ring-black ring-opacity-5 lg:flex lg:flex-auto lg:flex-col">
        <div className="grid gap-px border-b border-gray-300 bg-gray-200 text-center text-xs font-semibold leading-6 text-gray-700 lg:flex-none">
          <div className="flex justify-center bg-white py-2">
            <span>{date.format("YYYY MMMM")}</span>
          </div>
        </div>
        <div className="grid grid-cols-7 gap-px border-b border-gray-300 bg-gray-200 text-center text-xs font-semibold leading-6 text-gray-700 lg:flex-none">
          <div className="flex justify-center bg-white py-2">
            <span>S</span>
            <span className="sr-only sm:not-sr-only">eg</span>
          </div>
          <div className="flex justify-center bg-white py-2">
            <span>T</span>
            <span className="sr-only sm:not-sr-only">er</span>
          </div>
          <div className="flex justify-center bg-white py-2">
            <span>Q</span>
            <span className="sr-only sm:not-sr-only">ua</span>
          </div>
          <div className="flex justify-center bg-white py-2">
            <span>Q</span>
            <span className="sr-only sm:not-sr-only">ui</span>
          </div>
          <div className="flex justify-center bg-white py-2">
            <span>S</span>
            <span className="sr-only sm:not-sr-only">ex</span>
          </div>
          <div className="flex justify-center bg-white py-2">
            <span>S</span>
            <span className="sr-only sm:not-sr-only">ab</span>
          </div>
          <div className="flex justify-center bg-white py-2">
            <span>D</span>
            <span className="sr-only sm:not-sr-only">om</span>
          </div>
        </div>
        <div className="flex bg-gray-200 text-xs leading-6 text-gray-700 lg:flex-auto">
          <div className="hidden w-full lg:grid lg:grid-cols-7 lg:grid-rows-6 lg:gap-px">
            {days
              ? days.map((day, index) => {
                  return index <= firstDay ? (
                    <div
                      className="relative px-3 py-2 text-gray-500"
                      key={index}
                    >
                      {day}
                    </div>
                  ) : index <= daysInMonth ? (
                    <div
                      className="relative bg-gray-50 px-3 py-2 text-gray-500"
                      key={index}
                      onClick={() =>
                        handleOpenDay(
                          moment(new Date(year, month, day)).locale("pt-br")
                        )
                      }
                    >
                      {day}
                      <ol className="mt-2">
                        {tasks?.map((task) =>
                          isInMonth(new Date(task.date), year, month, day) ? (
                            <li>
                              <a
                                // onClick={() => handleInfo(task.taskId)}
                                className="group flex"
                              >
                                <p className="flex-auto truncate font-medium text-gray-900 group-hover:text-indigo-600">
                                  {task.title}
                                </p>
                                <time
                                  dateTime="2022-01-03T10:00"
                                  className="ml-3 hidden flex-none text-gray-500 group-hover:text-indigo-600 xl:block"
                                >
                                  {moment(task.date)
                                    .locale("pt-br")
                                    .format("hh:mm a")}
                                </time>
                              </a>
                            </li>
                          ) : null
                        )}
                      </ol>
                    </div>
                  ) : (
                    <div
                      className="relative px-3 py-2 text-gray-500"
                      key={index}
                    >
                      {day}
                    </div>
                  );
                })
              : null}
            <Modal1
              open={open}
              setOpen={setOpen}
              inDay={inDay}
              idTask={idTask}
              setIdTask={setIdTask}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
