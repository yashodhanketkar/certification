import { api } from "@/config/api";
import { Student, Teacher } from "@/types/api";

class TeacherServiceClass {
  list = async (): Promise<Teacher[]> => {
    return api
      .get("/teachers/")
      .then((res) => res.data)
      .catch((err) => console.log(err));
  };

  get = async (id: string): Promise<Teacher> => {
    return api
      .get(`/teachers/${id}/`)
      .then((res) => res.data)
      .catch((err) => console.log(err));
  };

  getStudents = async (id: string): Promise<Student[]> => {
    return api
      .get(`/teachers/${id}/students/`)
      .then((res) => res.data)
      .catch((err) => console.log(err));
  };
}

export const TeacherService = new TeacherServiceClass();
