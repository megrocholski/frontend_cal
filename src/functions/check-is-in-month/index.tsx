import moment from "moment";
import "moment/locale/pt-br";

const isDateBetween = (
  dateToCheck: Date,
  startDate: Date,
  endDate: Date
): boolean => {
  return dateToCheck >= startDate && dateToCheck <= endDate;
};

export const isInMonth = (
  dateToCheck: Date,
  year: number,
  month: number,
  day: number
): boolean => {
  const sd = new Date(year, month, day - 1);
  const startDate = moment(sd).locale("pt-br").endOf("day").toDate();
  // Obter a data de fim do mês
  const ed = new Date(year, month, day + 1);
  const endDate = moment(ed).locale("pt-br").startOf("day").toDate();

  return isDateBetween(dateToCheck, startDate, endDate);
};
