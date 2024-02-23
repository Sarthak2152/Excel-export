import Form from "./Components/Form";
import Table from "./Components/Table";
function App() {
  return (
    <main className="min-h-screen bg-slate-900 pb-10">
      <header className="mx-auto w-10/12 py-8">
        <h1 className="text-5xl  font-bold text-slate-50">Assignment</h1>
      </header>
      <Form />
      <Table />
    </main>
  );
}

export default App;
