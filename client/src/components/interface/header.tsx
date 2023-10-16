import { NavLink } from "react-router-dom";
import { NavBar } from "./navigation";

export const Header = () => {
  return (
    <header className="inline-flex justify-between px-4 py-2 shadow-md">
      <NavLink to="/" className="text-2xl font-semibold">
        Certification
      </NavLink>
      <NavBar />
    </header>
  );
};
