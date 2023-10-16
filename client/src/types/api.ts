export type Teacher = {
  id: number;
  first_name: string;
  last_name: string;
};

export type Student = {
  id: number;
  first_name: string;
  last_name: string;
  teachers: number[];
};

export type Certificate = {
  title: string;
  date: string;
  by: string;
  to: string;
};
