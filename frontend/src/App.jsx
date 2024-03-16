import Footer from "./components/footer";
import Header from "./components/header";
import Tasks from "./components/tasks";
import CreateTask from "./components/todoForm";

function App() {
  return (
    <>
      <Header></Header>
      <CreateTask></CreateTask>
      <Tasks></Tasks>
      <Footer></Footer>
    </>
  );
}

export default App;
