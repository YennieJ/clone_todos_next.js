import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { title } from "@/components/primitives";

import Header from "@/components/header/header";
import RoutineTable from "@/components/routine-table/routine-table";

export default function Home() {
  return (
    <>
      <section className="flex flex-col items-center justify-center gap-4 mb-8">
        <div className="flex flex-col text-center sm:w-96">
          <h1 className={`${title()} mb-10`}>My Routine</h1>

          <Header />
          <RoutineTable />
        </div>
      </section>

      <ToastContainer
        theme="dark"
        pauseOnFocusLoss={false}
        pauseOnHover={false}
        autoClose={2000}
      />
    </>
  );
}
