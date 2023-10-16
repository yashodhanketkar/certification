import { NavLink } from "react-router-dom";

export const NavBar = () => {
  return (
    <nav>
      <ul className="inline-flex gap-2">
        <li>
          <NavLink to="/generator">Generator</NavLink>
        </li>
        <li>
          <NavLink to="/verify">Verify</NavLink>
        </li>
      </ul>
    </nav>
  );
};
