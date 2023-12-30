import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export function SkeletonProductPage() {
  return (
    <>
      <Skeleton count={1} className="mt-5 ml-10 w-3/4" />
      <article className="grid justify-center items-center gap-7 mr-10 mt-5 ml-10 sm:flex sm:gap-4 sm:mx-20 sm:ml-20 sm:mt-10">
        <Skeleton
          height={window.innerWidth}
          width={window.innerWidth}
          className="w-full h-full"
        />
        <aside>
          <footer className="grid gap-5">
            <Skeleton height={45} width={200} />
            <section className="flex gap-4">
              {Array.from({ length: 2 }, (_, index) => (
                <Skeleton key={index} height={45} width={45} circle />
              ))}
            </section>
            <div className="grid grid-cols-4 gap-1">
              {Array.from({ length: 5 }, (_, index) => (
                <Skeleton key={index} height={45} width={85} />
              ))}
            </div>
          </footer>
        </aside>
      </article>
    </>
  );
}
