import {
  GeneratorPage,
  StudentsToTeacher,
  TeacherToStudents,
} from "@/views/generator";
import { HomePage } from "@/views/home";
import { SiteMap } from "@/views/sitemap";
import { VerifyPage } from "@/views/verify";
import { Outlet, Route, Routes } from "react-router-dom";

export const Router = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/generator" element={<GeneratorPage />} />
        <Route path="/generator/student/:id" element={<StudentsToTeacher />} />
        <Route path="/generator/teacher/:id" element={<TeacherToStudents />} />
        <Route path="/verify" element={<VerifyPage />} />
        <Route path="/sitemap" element={<SiteMap />} />
      </Routes>
      <Outlet />
    </>
  );
};
