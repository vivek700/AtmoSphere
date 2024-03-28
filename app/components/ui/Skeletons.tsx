const Skeletons = () => {
  return (
    <>
      <div className="flex flex-col animate-pulse md:flex-row  rounded-xl">
        <section className=" flex-1 ">
          <p className="h-5 w-28 bg-zinc-800 rounded"></p>
          <p className="h-8 w-36 mt-1 mb-2 md:mb-6 bg-zinc-800 rounded"></p>
          <p className="h-11 w-36 bg-zinc-800 rounded"></p>
          <p className="h-5 w-36 mt-3 md:mt-4 bg-zinc-800 rounded"></p>
          <section className="text-neutral-400 my-5 px-5 flex gap-x-6 border-l border-red-500">
            <section>
              <p className=" h-4 w-16  md:my-0 bg-zinc-800 rounded"></p>
              <p className=" h-4 w-24 my-3 md:my-4 bg-zinc-800 rounded"></p>
              <p className=" h-4 w-32  md:my-0 bg-zinc-800 rounded"></p>
            </section>
            <section>
              <p className=" h-4 w-16 md:my-0 bg-zinc-800 rounded"></p>
              <p className=" h-4 w-12 my-3 md:my-4 bg-zinc-800 rounded"></p>
              <p className=" h-4 w-24 md:my-0 bg-zinc-800 rounded"></p>
            </section>
          </section>
        </section>

        <section className=" overflow-hidden flex-1 text-neutral-300">
          <h1 className=" h-11 w-40 mb-4  bg-zinc-800 rounded"></h1>
          <p className=" h-9 my-2 bg-zinc-800 rounded"></p>
          <p className=" h-9 my-2 bg-zinc-800 rounded"></p>
          <p className=" h-9 my-2 bg-zinc-800 rounded"></p>
          <p className=" h-9 my-2 bg-zinc-800 rounded"></p>
          <p className=" h-9 my-2 bg-zinc-800 rounded"></p>
          <p className=" h-9 my-2 bg-zinc-800 rounded"></p>
          <p className=" h-9 my-2 bg-zinc-800 rounded"></p>
          <p className=" h-9 my-2 bg-zinc-800 rounded"></p>
        </section>
      </div>

      <p className=" animate-pulse h-11 w-44 my-5  bg-zinc-800 rounded"></p>

      <section className={`animate-pulse overflow-x-auto w-full`}>
        <p className="h-72 mb-4  bg-zinc-800 rounded"></p>
      </section>
    </>
  );
};

export default Skeletons;
