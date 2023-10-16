import { Link } from "react-router-dom";
import { LinkUnit, links } from "./data";

const LinkFactory = (props: LinkUnit) => {
  return (
    <li>
      <Link className="hover:font-semibold hover:underline" to={props.url}>
        {props.name}
      </Link>
    </li>
  );
};

export const SiteMap = () => {
  return (
    <div className="flex flex-col gap-2 text-lg">
      <p className="text-2xl font-bold">Sitemap</p>
      <ul className="list-disc list-inside">
        {links.map((link, i) => (
          <LinkFactory key={i} {...link} />
        ))}
      </ul>
    </div>
  );
};
