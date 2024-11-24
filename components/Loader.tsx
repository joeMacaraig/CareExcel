import Image from "next/image";

const Loader = () => {
  return (
    <div className="h-screen flex flex-col justify-center items-center gap-4">
      <Image
        src="/assets/icons/loader.svg"
        alt="loader"
        width={32}
        height={32}
        className="animate-spin"
      />
      Loading...
    </div>
  );
};

export default Loader;
