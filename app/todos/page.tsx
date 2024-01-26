import { title } from "@/components/primitives";
import TodosTable from "@/components/todos-table";

async function fetchTodosApiCall() {
  console.log("fetchTodosApiCll called");
  const res = await fetch(`${process.env.BASE_URL}/api/todos/`);
  return res.json();
}

export default async function TodosPage() {
  const result = await fetchTodosApiCall();
  return (
    <div className="flex flex-col space-y-8">
      <h1 className={title()}>Todos</h1>
      <TodosTable todos={result.data ?? []} />
    </div>
  );
}
