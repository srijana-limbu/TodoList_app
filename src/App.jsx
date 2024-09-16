import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import { v4 as uuidv4 } from "uuid";
 // ⇨ '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'

function App() {
  const [todo, setTodo] = useState("")
  const [todoS, setTodoS] = useState([])
  const [setshowFinished, setsetshowFinished] = useState(true)

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
      <div className="container mx-auto my-5 rounded-xl bg-violet-100 p-5 min-h-[70vh]">
        <div className="addTodo my-5">
          <h2 className="text-lg font-bold"> Add Todo</h2>
          <input
            onChange={handleChange}
            value={todo}
            type="text"
            className="w-1/2"
          />
          <button
            onClick={handleAdd}
            className="bg-violet-800 hover:bg-violet-950 p-2 
          py-1 text-white text-sm font-bold rounded-md mx-6"
          >
            Save
          </button>
        </div>
        <h2 className="text-lg font-bold">Your Todo List:</h2>
        <div className="todoS">

          {todoS.length ===0 && <div className="m-5">No Todo list to display</div>}

          {todoS.map((item) => {
            return (
              <div
                key={item.id}
                className="todo flex w-1/2 my-3 justify-between"
              >
                <div className="flex gap-5">
                  <input
                    name={item.id}
                    onChange={handleCheckBox}
                    type="checkbox"
                    value={item.isCompleted}
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
                    Edit
                  </button>
                  <button
                    onClick={(e) => {
                      handleDelete(e, item.id);
                    }}
                    className="bg-violet-800 hover:bg-violet-950 p-2 
                py-1 text-white text-sm font-bold rounded-md mx-0"
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default App;
