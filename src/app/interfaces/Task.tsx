export interface TaskProps {
  title: string;
  desc: string;
  date: Date;
  duration: number;
  userId: string;
  finished: boolean;
  taskId: string;
}
export interface TaskInputProps {
  title: string;
  desc: string;
  date: Date;
  duration: number;
  time: string;
  userId: string;
}
