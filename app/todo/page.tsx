"use client";

import { useState, useEffect } from "react";
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";
// import "@/app/app.css";
// import "@aws-amplify/ui-react/styles.css";
import { fetchUserAttributes, FetchUserAttributesOutput } from "aws-amplify/auth";
import { useAuthenticator } from "@aws-amplify/ui-react";


const client = generateClient<Schema>();

export default function App() {
  const [todos, setTodos] = useState<Array<Schema["Todo"]["type"]>>([]);
  const [attributes, setAttributes] = useState<FetchUserAttributesOutput | undefined>(undefined);

  useEffect(() => {
    const internal = async () => {
      const att = await fetchUserAttributes();
      setAttributes(att);
    }
    internal();

  }, [])

  const { user, signOut } = useAuthenticator();

  function listTodos() {
    client.models.Todo.observeQuery().subscribe({
      next: (data) => setTodos([...data.items]),
    });
  }

  const deleteTodo = (id: string) => {
    client.models.Todo.delete({ id });
  };

  useEffect(() => {
    listTodos();
  }, []);

  function createTodo() {
    client.models.Todo.create({
      content: window.prompt("Todo content"),
    });
  }

  return (
    <main>
      <h1>{attributes?.nickname}'s todos</h1>
      <button onClick={createTodo}>+ new</button>
      <ul>
        {todos.map((todo) => (
          <li 
            key={todo.id}
            onClick={() => deleteTodo(todo.id)}
          >{todo.content}</li>
        ))}
      </ul>
      <div>
        🥳 App successfully hosted. Try creating a new todo.
        <br />
        <a href="https://docs.amplify.aws/nextjs/start/quickstart/nextjs-app-router-client-components/">
          Review next steps of this tutorial.
        </a>
      </div>
      <button onClick={signOut}>Sign Out</button>
    </main>
  );
}
