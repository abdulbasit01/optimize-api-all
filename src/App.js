import React, { useState } from "react";
import "./styles.css";
import axios from "axios";
export default function App() {
  const [val, setVl] = useState("");
  const [todos, setTodos] = useState(null);
  const [fetching, setFetching] = useState(true);
  let cancelToken;
  const submitHandellet = async (e) => {
    let res = e.target.value;
    if (typeof cancelToken !== typeof undefined) {
      cancelToken.cancel("cancel the overloaded request");
    }
    cancelToken = axios.CancelToken.source();
    setVl(res);
    const result = await axios.get(
      `https://jsonplaceholder.typicode.com/todos?q=${val}`,
      {
        cancelToken: cancelToken.token
      }
    );
    console.log(val);
    // console.table(result);
    setTodos(result.data.slice(1, 5));
    setFetching(false);
  };
  return (
    <div className="App">
      <h3>How to Fetch Response From Api</h3>
      <input
        placeholder="enter some thing"
        value={val}
        onChange={submitHandellet}
      />
      <br />
      {fetching ? null : (
        <ul style={{ listStyleType: "none", textAlign: "justify" }}>
          {todos.map((todo) => (
            <li
              style={{
                marginTop: "10px",
                backgroundColor: "#fdfd",
                padding: "10px",
                backgroundImage:
                  "url('https://www.freeiconspng.com/thumbs/list-icon/list-icons-free-icons-in-devine--icon-search-engine--5.png') ",
                backgroundSize: "30px 30px",
                backgroundRepeat: "no-repeat"
              }}
              key={todo.id}
            >
              <span style={{ marginLeft: "35px" }}>{todo.title}</span>
            </li>
          ))}{" "}
        </ul>
      )}
    </div>
  );
}
