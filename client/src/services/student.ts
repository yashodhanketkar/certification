import { api } from "@/config/api";
import { Student, Teacher } from "@/types/api";

class StudentServiceClass {
  list = async (): Promise<Student[]> => {
    return api
      .get("/students/")
      .then((res) => res.data)
      .catch((err) => console.log(err));
  };

  get = async (id: string): Promise<Student> => {
    return api
      .get(`/students/${id}/`)
      .then((res) => res.data)
      .catch((err) => console.log(err));
  };

  getTeachers = async (id: string): Promise<Teacher[]> => {
    return api
      .get(`/students/${id}/teachers/`)
      .then((res) => res.data)
      .catch((err) => console.log(err));
  };
}

export const StudentService = new StudentServiceClass();
