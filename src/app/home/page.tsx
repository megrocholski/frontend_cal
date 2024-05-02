"use client";
import { useState } from "react";
import MenuType from "@/components/Menu";
import { NavbarDefault } from "@/components/Navbar";
import Calendar from "@/components/Calendar";
import "moment/locale/pt-br";
import moment from "moment";
import WeekCalendar from "@/components/WeekCalendar";
import { ActivitiesTimeline } from "@/components/Timeline";
import { IconButton } from "@material-tailwind/react";
import ActivityForm from "@/components/ActiveForm";
import { TaskProps } from "../interfaces/Task";

export default function Home() {
  const [type, setType] = useState("Mês");
  const [date, setDate] = useState(moment().locale("pt-br"));
  const [add, setAdd] = useState(false);
  const [task, setTask] = useState<TaskProps | null>(null);
  const [open, setOpen] = useState(false);
  const [reload, setReload] = useState(false);
  const [idTask, setIdTask] = useState("");

  const handleOpen = () => {
    setIdTask("");
    setAdd(false);
    setOpen(!open);
  };

  const handleAddForm = () => {
    setAdd(true);
  };

  return (
    <div className="w-screen h-screen gap-5 flex flex-col">
      <NavbarDefault
        setType={setType}
        type={type}
        date={date}
        setDate={setDate}
        reload
        setReaload={setReload}
      />
      {type === "Mês" ? (
        <Calendar date={date} reload={reload} />
      ) : type === "Semana" ? (
        <WeekCalendar date={date} />
      ) : add ? (
        <ActivityForm setAdd={setAdd} inDay={date} task={task} />
      ) : (
        <div>
          <ActivitiesTimeline
            initialDate={date.startOf("day")}
            finalDate={date.endOf("day")}
            setTask={setTask}
            setAdd={setAdd}
          />
          <div className="flex justify-end px-5">
            <IconButton
              className="rounded-full"
              onClick={() => handleAddForm()}
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            >
              {/* <i className="fas fa-plus" color="#FFFFFF" /> */}
              {/* <PlusIcon className="text-white" /> */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
                className="h-4 w-4 transform rotate-45"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </IconButton>
          </div>
        </div>
      )}
    </div>
  );
}
