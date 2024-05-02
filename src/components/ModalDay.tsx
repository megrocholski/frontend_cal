import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  IconButton,
  Typography,
  Input,
} from "@material-tailwind/react";
import { Moment } from "moment";
import { ActivitiesTimeline } from "./Timeline";
import { PlusIcon } from "@heroicons/react/24/solid";
import ActivityForm from "./ActiveForm";
import InfoTask from "./InfoTask";
import { TaskProps } from "@/app/interfaces/Task";

interface ModalProps {
  open: boolean;
  setOpen: (value: boolean) => void;
  inDay: Moment | null;
  idTask: string;
  setIdTask: (value: string) => void;
}

export function Modal1(props: ModalProps) {
  const [add, setAdd] = React.useState(false);
  const [task, setTask] = useState<TaskProps | null>(null);

  const handleOpen = () => {
    props.setIdTask("");
    setAdd(false);
    props.setOpen(!props.open);
  };

  const handleAddForm = () => {
    setAdd(true);
  };

  return (
    <section className="grid place-items-center">
      {/* <Button
        onClick={handleOpen}
        placeholder={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
      >
        Open Modal
      </Button> */}
      <Dialog
        className="p-4"
        size="md"
        open={props.open}
        handler={handleOpen}
        placeholder={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
      >
        <DialogHeader
          className="justify-between"
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          <Typography
            color="blue-gray"
            className="mb-1 font-bold size-7"
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            {props.inDay?.format("DD/MM/YYYY")}
          </Typography>
          <IconButton
            color="gray"
            size="sm"
            variant="text"
            onClick={() => {
              props.setIdTask("");
              setAdd(false);
              props.setOpen(false);
            }}
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              className="h-4 w-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </IconButton>
        </DialogHeader>
        <DialogBody
          className="overflow-y-scroll"
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          {add ? (
            <ActivityForm setAdd={setAdd} inDay={props.inDay} task={task} />
          ) : (
            <ActivitiesTimeline
              initialDate={props.inDay}
              finalDate={props.inDay}
              setTask={setTask}
              setAdd={setAdd}
            />
          )}
        </DialogBody>
        {!add && props.idTask === "" ? (
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
        ) : null}
      </Dialog>
    </section>
  );
}

export default Modal1;
