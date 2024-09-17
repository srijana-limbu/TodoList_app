import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import { v4 as uuidv4 } from "uuid";
 // ⇨ '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

function App() {
  const [todo, setTodo] = useState("")
  const [todoS, setTodoS] = useState([])
  const [showFinished, setShowFinished] = useState(true)

  useEffect(() =>{
    let todoString = localStorage.getItem("todoS")
    if(todoString){
      let todoS = JSON.parse(localStorage.getItem("todoS"))
      setTodoS(todoS)
    }
  }, [])

  const saveToLS = (params) => {
    // retrieve a list of items (todoS) from the browser's localStorage
    // and converts it back into a js object or array.
    localStorage.setItem("todoS", JSON.stringify(todoS));
  }
  
  const toggleFinished = (params) => {
    setShowFinished(!showFinished)
  }
  
  

  const handleAdd = () => {
    setTodoS([...todoS, {id: uuidv4(), todo, isCompleted: false}])
    setTodo("")
    //console.log(todoS)
    saveToLS();
  }

  const handleChange = (e) => {
    setTodo(e.target.value);

  };

  const handleCheckBox = (e) => {
    console.log(e, e.target);
    let id = e.target.name;
    console.log(`The id is ${id}`);

    // Find the index of the todo item in the todoS array
    let index = todoS.findIndex((item) => {
      return item.id === id;
    });
    console.log(index);

    // If item is found, toggle isCompleted status
    let newTodoS = [...todoS];
    newTodoS[index].isCompleted = !newTodoS[index].isCompleted;
    setTodoS(newTodoS);
    //console.log(newTodoS);
    saveToLS();
  }
  

  const handleEdit = (e, id) => {
    // Filters the todoS array for the item with the matching id
    let t = todoS.filter((i) => i.id === id);
    setTodo(t[0].todo);

    // Removes the item with the matching id from the array
    let newTodoS = todoS.filter((item) => {
      return item.id !== id;
    });
    setTodoS(newTodoS);
    saveToLS()
  }

  const handleDelete = (e, id) => {

    // Find the index of the todo item in the todoS array
    let index = todoS.findIndex((item) => {
      return item.id === id;
    });

    // Creates a new array by filtering out the item whose id matches the given id
    // Removes the item with the matching id from the array
    let newTodoS = todoS.filter((item) => {
      return item.id !== id;
    });
    setTodoS(newTodoS);
    saveToLS();
  }
  
 

  return (
    <>
      <Navbar />
      <div className="mx-3 md:container md:mx-auto my-5 rounded-xl bg-violet-100 p-5 min-h-[70vh] md:w-[35%]">
        {/* <h1 className="font-bold text-center text-xl">Manage your tasks at one place</h1> */}
        <div className="addTodo my-5 flex flex-col gap-4">
          <h2 className="text-2xl font-bold"> Add a Todo</h2>
          <div className="flex">
            <input
              onChange={handleChange}
              value={todo}
              type="text"
              className="w-full rounded-md px-5 py-2"
            />
            <button
              onClick={handleAdd}
              disabled={todo.length < 3}
              className="bg-violet-800 hover:bg-violet-950 p-6 
            disabled:bg-violet-700 py-1 text-white text-sm font-bold 
            rounded-md mx-2"
            >
              Save
            </button>
          </div>
        </div>
        <input
          onChange={toggleFinished}
          type="checkbox"
          checked={showFinished}
          className="my-4"
          id="show"
        />
        <label htmlFor="show mx-2"> Show Finished</label>

        <div className="h-[1px] bg-white w-[95%] mx-auto my-2"></div>
        <h2 className="text-2xl font-bold">Todo List</h2>
        <div className="todoS">
          {todoS.length === 0 && <div className="m-5">No Tasks to display</div>}

          {todoS.map((item) => {
            return (
              // Show item if showFinished is true or if item is not completed
              (showFinished || !item.isCompleted) && (
                <div key={item.id} className="todo flex  my-3 justify-between">
                  <div className="flex gap-5">
                    <input
                      name={item.id}
                      onChange={handleCheckBox}
                      type="checkbox"
                      checked={item.isCompleted}
                      id=""
                    />

                    <div className={item.isCompleted ? "line-through" : ""}>
                      {item.todo}
                    </div>
                  </div>
                  <div className="buttons flex h-full">
                    <button
                      onClick={(e) => {
                        handleEdit(e, item.id);
                      }}
                      className="bg-violet-800 hover:bg-violet-950 p-2 
                py-1 text-white text-sm font-bold rounded-md mx-2"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={(e) => {
                        handleDelete(e, item.id);
                      }}
                      className="bg-violet-800 hover:bg-violet-950 p-2 
                py-1 text-white text-sm font-bold rounded-md mx-0"
                    >
                      <MdDelete />
                    </button>
                  </div>
                </div>
              )
            );
          })}
        </div>
      </div>
    </>
  );
}

export default App;
