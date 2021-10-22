import * as React from "react";
import { Book } from "./components/Book/Book";
import "./App.scss";
import { Bookshelf } from "./components/bookshelf/Bookshelf";
// import component authors
import { Author } from "./components/Author/Author";

type BookType = {
  title: string,
  nroPages: number,
  authors: Array<string>,
};

function App(): React.Node {
  const bookData: BookType = {
    title: "alicia en el pais de las maravillas",
    nroPages: 54,
    authors: ["juan", "pedro", "jose"],
  };

  return (
    <div>
      <Book {...bookData} />
      <Bookshelf />
      <Author />
    </div>
  );
}

export default App;
