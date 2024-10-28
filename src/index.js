import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";

import {
  createBrowserRouter,
  RouterProvider,
  redirect,
} from "react-router-dom";

import Root from "./Root";
import Home from "./Home";
import Note from "./Note";
import Create from "./Create";
import Edit from "./Edit";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/note/:id",
        element: <Note />,
        loader: async ({ params }) => {
          const id = Number(params.id);

          const response = await fetch(`http://localhost:3001/notes/${id}`);
          const data = await response.json();

          return {
            id: id,
            data: data,
          };
        },
      },
      {
        path: "/create",
        element: <Create />,
        action: async ({ request }) => {
          const formData = await request.formData();
          const body = Object.fromEntries(formData);

          // send POST request to the API route
          const response = await fetch(`http://localhost:3001/notes`, {
            method: "POST",
            headers: {
              "Content-type": "application/json",
            },
            body: JSON.stringify({
              title: body.title,
              content: body.content,
            }),
          });

          const data = await response.json();

          return redirect(`/note/${data.id}`);
        },
      },
      {
        path: "/edit/:id",
        element: <Edit />,
        loader: async ({ params }) => {
          const id = params.id;

          const response = await fetch(`http://localhost:3001/notes/${id}`);
          const data = await response.json();

          return {
            data: data,
          };
        },
        action: async ({ request, params }) => {
          const id = params.id;
          const formData = await request.formData();
          const data = Object.fromEntries(formData);

          const response = await fetch(`http://localhost:3001/notes/${id}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              title: data.title,
              content: data.content,
            }),
          });
          const updateData = await response.json();

          return redirect(`/note/${id}`);
        },
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
