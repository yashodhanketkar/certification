export const HomePage = () => {
  return (
    <div className="flex flex-col w-full gap-2 mx-auto md:w-1/2">
      <h1 className="text-3xl font-semibold text-center">
        Welcome to certification!
      </h1>
      <p>You can generate or verify generated certificates on this website</p>
      <p>This website is powered by</p>
      <ul className="list-disc list-inside">
        <li>React</li>
        <li>Django RestFramework</li>
      </ul>
    </div>
  );
};
