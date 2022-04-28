import logo from "./logo.svg";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";

function App() {
  const [user, setUser] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5000/users")
      .then((res) => res.json())
      .then((data) => setUser(data));
  }, [user]);
  const handleSubmit = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const age = e.target.age.value;
    const user = { name, age };
    fetch("http://localhost:5000/user", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
  };
  return (
    <div className="w-50 mx-auto">
      <h2>There are {user.length} user here..</h2>
      {user.map((u) => (
        <li key={u.id}>
          {u.name} - age={u.age}
        </li>
      ))}
      <div className="w-50 mt-5">
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Control name="name" type="text" placeholder="Enter Name" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Control name="age" type="number" placeholder="Enter age" />
          </Form.Group>

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default App;
