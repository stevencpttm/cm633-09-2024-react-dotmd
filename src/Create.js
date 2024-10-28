import { Form } from "react-router-dom";
import { useState } from "react";

function Create() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  return (
    <Form method="POST">
      <div className="container mx-auto mt-6 flex">
        <div className="w-1/2 md:w-2/3 mr-4 text-md">
          <input
            type="text"
            className="w-full border px-3 py-2 rounded border-slate-400"
            placeholder="Note title"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            name="title"
          />
          <hr className="my-4" />
          <textarea
            name="content"
            className="w-full h-96 border px-3 py-2 rounded border-slate-400"
            value={content}
            onChange={(e) => {
              setContent(e.target.value);
            }}
          ></textarea>
          <button type="submit">Create</button>
        </div>
        <div className="w-1/2 md:w-2/3 px-4 text-md">
          <h2 className="text-lg font-semibold py-2">{title}</h2>
          <hr className="my-4" />
          {content}
        </div>
      </div>
    </Form>
  );
}

export default Create;
