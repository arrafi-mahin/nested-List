import React, { useEffect, useState } from "react";
import "./Parent.css";
function Parent(props) {
  const [parent, setParent] = useState("");
  const [view, setView] = useState("");
  const [data, setData] = useState([
    {
      id: "1",
      parent: {
        name: "test",
        child: [
          {
            id: "2",
            parent: {
              name: "child 1",
              child: [
                {
                  id: "3",
                  parent: {
                    name: "child 2",
                    child: [
                      { id: "4", parent: { name: "child 3", child: [] } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ]);
  useEffect(() => {
    renderData();
  }, [data]);
  const getId = () => {
    const date = new Date();
    return date.getTime();
  };
  const renderData = () => {
    console.log(data);
    const renderData = recursive(data);
    setView(renderData);
    return;
  };
  //   Recurtion
  const recursive = (inputData) => {
    return inputData.map((item) => {
      return (
        <>
          <ul className="child" key={item.id}>
            <li>
              <span>{item.parent.name}</span>
              <button onClick={showInput}>New</button>
            </li>

            <form id={item.id} onSubmit={childAdd} className="hidden">
              <input type="text" name="child" placeholder="Child Name" />
              <button type="submit">Add</button>
            </form>
            {item.parent.child.length !== 0 && recursive(item.parent.child)}
          </ul>
        </>
      );
    });
  };

  const childRecursive = (data, inputData, id) => {
    data.map((item) => {
      if (Number(item.id) === id) {
        item.parent.child.push(inputData);
        renderData();
        return 0;
      } else if (item.parent.child.length !== 0) {
        return childRecursive(item.parent.child, inputData, id);
      } else {
        // console.log("not found");
        return 0;
      }
    });
  };

  const showInput = (e) => {
    e.target.parentElement.parentElement
      .querySelector(".hidden")
      .classList.add("show");
  };

  //  submit
  const submitHandler = (e) => {
    e.preventDefault();

    let newData = {
      id: getId(),
      parent: { name: parent, child: [] },
    };
    setData([...data, newData]);
    setParent("");
  };

  const childAdd = (e) => {
    e.preventDefault();
    let testId = e.target.id;
    let newData = {
      id: getId(),
      parent: { name: e.target[0].value, child: [] },
    };
    childRecursive(data, newData, Number(testId));
    e.target.classList.remove("show");
    e.target[0].value = "";
  };
  return (
    <div className="parent">
      <h2>Nested Parent </h2>
      <form onSubmit={submitHandler}>
        <input
          type="text"
          onChange={(e) => setParent(e.target.value)}
          value={parent}
          name="parent"
          placeholder="Parent Name"
        />
        <button type="submit">Add</button>
      </form>
      <h3>List View</h3>
      {view}
    </div>
  );
}

export default Parent;
