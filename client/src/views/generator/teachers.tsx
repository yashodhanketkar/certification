import { CertificateService, TeacherService } from "@/services";
import { Student, Teacher } from "@/types/api";
import { CertificateGenerate } from "@/types/form";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useParams } from "react-router-dom";

export const TeacherToStudents = () => {
  const { id } = useParams();
  const [teacher, setTeacher] = useState<Teacher>();
  const [students, setStudents] = useState<Student[]>([]);
  const [resp, setResp] = useState<{ id: number; key: string } | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CertificateGenerate>();

  useEffect(() => {
    const getStudent = async () => {
      const teacherData = await TeacherService.get(id!);
      const studentsData = await TeacherService.getStudents(id!);
      if (teacherData) setTeacher(teacherData);
      if (studentsData) setStudents(studentsData);
    };
    getStudent();
  }, [id]);

  if (!teacher) return <>Error fetching teacher</>;

  const onSubmit: SubmitHandler<CertificateGenerate> = async (data) => {
    const response = await CertificateService.generte(data);
    if (response) setResp(response);
    reset();
  };

  return (
    <div className="flex flex-col items-center w-full gap-2">
      <p className="text-2xl font-semibold">
        {teacher.first_name} {teacher.last_name} making cerficate
      </p>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col w-full gap-2 md:w-1/4"
      >
        <div className="flex flex-col gap-2">
          <label htmlFor="student">Teacher ID</label>
          <input
            className="p-1 rounded ring-1 ring-black/50"
            type="text"
            disabled
            {...register("teacher", {
              valueAsNumber: true,
              required: true,
              value: teacher.id,
            })}
          />
          {!!errors.student && (
            <span className="text-xs text-red-500">
              Student is required field
            </span>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="student">Student</label>
          <select
            id="student"
            className="p-1 rounded ring-1 ring-black/50"
            {...register("student", {
              valueAsNumber: true,
              required: true,
            })}
          >
            <option disabled className="hidden" value={0}>
              Please select a student
            </option>
            {students.length > 0 &&
              students.map((student) => (
                <option key={student.id} value={student.id}>
                  {student.first_name} {student.last_name}
                </option>
              ))}
          </select>
          {!!errors.student && (
            <span className="text-xs text-red-500">
              student is required field
            </span>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="title">Title</label>
          <input
            className="p-1 rounded ring-1 ring-black/50"
            type="text"
            {...register("title", { required: true })}
          />
          {!!errors.title && (
            <span className="text-xs text-red-500">
              Title is required field
            </span>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="date">Date</label>
          <input
            className="p-1 rounded ring-1 ring-black/50"
            type="date"
            {...register("date", { required: true })}
          />
          {!!errors.date && (
            <span className="text-xs text-red-500">Date is required field</span>
          )}
        </div>
        <button
          className="px-2 py-1 text-white bg-blue-600 rounded-md hover:bg-blue-700 w-fit"
          type="submit"
        >
          Generate
        </button>
      </form>
      {resp && (
        <div className="flex flex-col w-full my-4 md:w-1/4">
          <p className="text-base font-bold">Certificate</p>
          <p>id: {resp.id}</p>
          <p>Verification Key:</p>
          <p
            onClick={() => {
              navigator.clipboard.writeText(resp.key);
              alert("Key copied");
            }}
            className="break-words"
          >
            {resp.key}
          </p>
        </div>
      )}
    </div>
  );
};
