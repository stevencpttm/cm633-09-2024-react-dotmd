import { Link } from "react-router-dom";
import NoteList from "./NoteList";

function Home() {
  return (
    <div className="container mx-auto mt-6 flex">
      <div className="w-1/2 md:w-1/3 pr-2">
        <NoteList />
      </div>

      <div className="w-1/2 md:w-2/3 px-4 text-md">
        Click on any note on the left
      </div>
    </div>
  );
}

export default Home;
