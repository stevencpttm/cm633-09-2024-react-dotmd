import { Link, useLoaderData } from "react-router-dom";
import NoteList from "./NoteList";
import { marked } from "marked";

function Note() {
  const { id, data } = useLoaderData();

  return (
    <div className="container mx-auto mt-6 flex">
      <div className="w-1/2 md:w-1/3 pr-2">
        <NoteList activeId={id} />
      </div>

      <div className="w-1/2 md:w-2/3 px-4 text-md">
        <h2 className="text-lg font-semibold">{data.title}</h2>
        <hr className="my-4" />

        <div
          className="markdown"
          dangerouslySetInnerHTML={{
            __html: marked.parse(data.content),
          }}
        ></div>

        <div className="mt-4 text-sm">
          <Link to={`/edit/${data.id}`} className="text-slate-400">
            [Edit]
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Note;
