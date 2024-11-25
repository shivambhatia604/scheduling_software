import clsx from "clsx";

const Loader = ({ className, ...props }: { className?: string }) => {
  return (
    <div
      className={clsx([
        "flex",
        "items-center",
        "justify-center",
        "min-h-screen",
        "bg-transparent",
        className,
      ])}
      {...props}
    >
      <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
};

export default Loader;
