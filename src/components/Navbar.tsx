import React, { useContext } from "react";
import {
  Navbar,
  MobileNav,
  Typography,
  Button,
  IconButton,
  Input,
} from "@material-tailwind/react";
import MenuType from "./Menu";
import { Moment } from "moment";
import { AuthContext } from "@/context/AuthProvider";

interface NavbarProps {
  type: string;
  setType: (value: string) => void;
  date: Moment;
  setDate: (value: Moment) => void;
  reload: boolean;
  setReaload: (value: boolean) => void;
}

export function NavbarDefault(props: NavbarProps) {
  const [openNav, setOpenNav] = React.useState(false);
  const { logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
  };

  const handleData = (value: string) => {
    if (props.type === "Mês") {
      if (value === "plus") {
        props.setDate(props.date.add(1, "month"));
        props.setReaload(!props.reload);
      } else {
        props.setDate(props.date.subtract(1, "month"));
        props.setReaload(!props.reload);
      }
    } else if (props.type === "Dia") {
      if (value === "plus") {
        props.setDate(props.date.add(1, "day"));
        props.setReaload(!props.reload);
      } else {
        props.setDate(props.date.subtract(1, "day"));
        props.setReaload(!props.reload);
      }
    }
  };
  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);

  const navList = (
    <ul className="mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6 w-full">
      <Input
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
        crossOrigin={undefined}
        label="Buscar"
        className="w-full"
      />
      <MenuType setType={props.setType} type={props.type} />
    </ul>
  );

  return (
    <Navbar
      className="mx-auto max-w-screen-xl px-4 py-2 lg:px-8 lg:py-4"
      placeholder={undefined}
      onPointerEnterCapture={undefined}
      onPointerLeaveCapture={undefined}
    >
      <div className="container mx-auto flex items-center justify-between text-blue-gray-900">
        <Typography
          as="a"
          href="#"
          className="mr-4 cursor-pointer py-1.5 font-bold flex justify-center items-center gap-3"
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          Calendário |{" "}
          <Button
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
            onClick={() => handleData("minos")}
          >
            <Typography
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            >
              {"<"}
            </Typography>
          </Button>
          <Typography
            className="justify-center items-center text-center"
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            {props.type === "Mês"
              ? props.date.format("YYYY MMMM")
              : props.type === "Dia"
              ? props.date.format("YYYY MMMM DD")
              : null}
          </Typography>
          <Button
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
            onClick={() => handleData("plus")}
          >
            <Typography
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            >
              {">"}
            </Typography>
          </Button>
        </Typography>
        <div className="hidden lg:block">{navList}</div>
        <div className="flex items-center gap-x-1">
          <Button
            variant="text"
            size="sm"
            className="hidden lg:inline-block"
            onClick={() => handleLogout()}
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            <span>Logout</span>
          </Button>
        </div>
        <IconButton
          variant="text"
          className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
          ripple={false}
          onClick={() => setOpenNav(!openNav)}
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          {openNav ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              className="h-6 w-6"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </IconButton>
      </div>
      <MobileNav open={openNav}>
        <div className="container mx-auto">
          {navList}
          <div className="flex items-center gap-x-1">
            <Button
              fullWidth
              variant="text"
              size="sm"
              className=""
              onClick={() => handleLogout()}
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            >
              <span>Logout</span>
            </Button>
          </div>
        </div>
      </MobileNav>
    </Navbar>
  );
}
