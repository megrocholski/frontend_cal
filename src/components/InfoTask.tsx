import { IconButton, Typography } from "@material-tailwind/react";

interface InfoTaskProps {
  idTask: string;
}
export default function InfoTask(props: InfoTaskProps) {
  return (
    <div>
      <Typography
        placeholder={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
      >
        AAAAAAAaa
      </Typography>
      <div className="flex justify-end px-5">
        <IconButton
          className="rounded-full"
        //   onClick={() => handleAddForm()}
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
  );
}
