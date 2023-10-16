import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="flex flex-col w-full p-2 text-white bg-black">
      <div className="grid items-end grid-cols-1 md:grid-cols-2">
        <div className="flex flex-col">
          <Link to="/generator">Generate</Link>
          <Link to="/verify">Verify</Link>
          <Link to="/sitemap">Sitemap</Link>
        </div>
        <div className="md:text-end">
          <Link
            target="_blank"
            to="https://github.com/yashodhanketkar/certification"
          >
            Source Code
          </Link>
        </div>
      </div>
      <p className="w-full text-xs text-center">Certification © 2023</p>
    </footer>
  );
};
