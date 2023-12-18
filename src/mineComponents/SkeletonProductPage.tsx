
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export function SkeletonProductPage() {
  return (
    <>
      <Skeleton count={1} className="mt-5 ml-10 w-2/4"/>
      {window.innerWidth < 768 ? (
        <header className="grid items-center gap-5 mt-5 mr-10 ml-10 mt-">
          <Skeleton count={1} className="w-3/4"/>
          <Skeleton count={1} className="w-1/4"/>
        </header>
      ) : (
        <></>
      )}
      <article className="grid justify-center items-center gap-7 mr-10 mt-5 ml-10 sm:flex sm:gap-4 sm:mx-20 sm:ml-20 sm:mt-10">
        <Skeleton height={300} width={300} className="w-full h-full" />
        <aside>
          <footer className="grid gap-3">
            <Skeleton height={100}/>
            <div className="flex font-medium gap-4">
              <Skeleton height={20} width={80}/>
            </div>
            <div className="flex gap-4">
              <Skeleton height={20} width={40}/>
              <Skeleton height={20} width={40}/>
              <Skeleton height={20} width={40}/>
              <Skeleton height={20} width={40}/>
              <Skeleton height={20} width={40}/>
            </div>
            <Skeleton height={40} width={300} count={2} className="mb-4"/>
          </footer>
        </aside>
      </article>
    </>
  );
}
