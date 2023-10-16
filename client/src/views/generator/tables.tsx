import { StudentService, TeacherService } from "@/services";
import { Student, Teacher } from "@/types/api";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const ListAll = () => {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [students, setStudents] = useState<Student[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const apiData = async () => {
      const teacherData = await TeacherService.list();
      if (teacherData) setTeachers(teacherData);

      const studentData = await StudentService.list();
      if (studentData) setStudents(studentData);
    };
    apiData();
  }, []);

  return (
    <div className="flex flex-col gap-2">
      <p className="text-2xl font-semibold text-center">Tables</p>
      <div className="grid grid-cols-1 gap-2 overflow-auto md:grid-cols-2">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {teachers.length > 0 &&
              teachers.map((teacher) => (
                <tr>
                  <td>{teacher.id}</td>
                  <td>
                    {teacher.first_name} {teacher.last_name}
                  </td>
                  <td className="text-center">
                    <button
                      className="px-4 py-1 text-white bg-blue-600 rounded-md hover:bg-blue-700"
                      onClick={() => navigate(`teacher/${teacher.id}`)}
                    >
                      Click
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
          <caption>Generate via teachers</caption>
        </table>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {students.length > 0 &&
              students.map((student) => (
                <tr>
                  <td>{student.id}</td>
                  <td>
                    {student.first_name} {student.last_name}
                  </td>
                  <td className="text-center">
                    <button
                      className="px-4 py-1 text-white bg-blue-600 rounded-md hover:bg-blue-700"
                      onClick={() => navigate(`student/${student.id}`)}
                    >
                      Click
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
          <caption>Generate via students</caption>
        </table>
      </div>
    </div>
  );
};
