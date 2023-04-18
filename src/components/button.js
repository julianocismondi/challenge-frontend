import Link from "next/link";
const Button = ({ name, href, type }) => {
  const primarySolid =
    "bg-red-600 border-2 border-red-600  text-white text-center font-medium rounded-md py-2 px-8 hover:bg-transparent hover:text-red-600 transition-colors";
  const secondarySolid =
    "bg-transparent border-2 border-white text-white text-center font-medium rounded-md py-2 px-8 hover:bg-white hover:text-gray-800 transition-colors";
  const primaryOutline =
    "bg-transparent border-2 border-red-600 text-red-600 text-center font-medium rounded-md py-2 px-8 hover:bg-red-600 hover:text-white transition-colors";
  const secondaryOutline =
    "bg-transparent border-2 border-gray-800 text-gray-800 text-center font-medium rounded-md py-2 px-8 hover:bg-gray-800 hover:text-white transition-colors";
  const returnClassName = (type) => {
    switch (type) {
      case "primary-solid":
        return primarySolid;
      case "secondary-solid":
        return secondarySolid;
      case "primary-outline":
        return primaryOutline;
      case "secondary-outline":
        return secondaryOutline;
    }
  };
  return (
    <Link className={returnClassName(type)} href={href}>
      {name}
    </Link>
  );
};

export default Button;
