"use client";
import {
  Button,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
  Option,
  Select,
} from "@material-tailwind/react";

interface MenuTypeProps {
  type: string;
  setType: (value: string) => void;
}

export default function MenuType(props: MenuTypeProps) {
  const handleChangeType = (value: string) => {
    props.setType(value);
  };
  return (
    <Select
      label="Tipo"
      placeholder={undefined}
      onPointerEnterCapture={undefined}
      onPointerLeaveCapture={undefined}
      value={props.type}
	  size="md"
    >
      <Option onClick={() => handleChangeType("Dia")}>Dia</Option>
      <Option onClick={() => handleChangeType("Semana")}>Semana</Option>
      <Option onClick={() => handleChangeType("Mês")}>Mês</Option>
    </Select>
  );
}
