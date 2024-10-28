import { useState, useEffect } from "react";
import { useLoaderData, Form } from "react-router-dom";
import { marked } from "marked";

function Edit() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const { data } = useLoaderData();

  useEffect(() => {
    setTitle(data.title);
    setContent(data.content);
  }, [data]);

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this note?")) {
      const response = await fetch(`http://localhost:3001/notes/${data.id}`, {
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
        },
      });
      const deleteData = await response.json();

      window.location = "/";
    }
  };

  return (
    <Form method="PUT">
      <div className="container mx-auto mt-6 flex">
        <div className="w-1/2 md:w-2/3 mr-4 text-md">
          <input
            type="text"
            className="w-full border px-3 py-2 rounded border-slate-400"
            placeholder="Note title"
            name="title"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
          <hr className="my-4" />
          <textarea
            className="w-full h-96 border px-3 py-2 rounded border-slate-400"
            name="content"
            value={content}
            onChange={(e) => {
              setContent(e.target.value);
            }}
          ></textarea>
          <button type="submit">Update</button>
          <button
            onClick={handleDelete}
            className="bg-red-500 text-white inline-block px-2 py-1 rounded ml-4 hover:bg-red-600 transition"
          >
            Delete
          </button>
        </div>
        <div className="w-1/2 md:w-2/3 px-4 text-md">
          <h2 className="text-lg font-semibold py-2">{title}</h2>
          <hr className="my-4" />
          <div
            className="markdown"
            dangerouslySetInnerHTML={{
              __html: marked.parse(content),
            }}
          ></div>
        </div>
      </div>
    </Form>
  );
}

export default Edit;
