import * as React from "react";
import { useEffect, useState } from "react";
import NProgress from "nprogress";
import confetti from "canvas-confetti";

type BookProps = {
  title: string,
  nroPages?: number,
  authors: Array<string>,
};

export const Book = (props: BookProps): React.Node => {
  const [changeCase, setChangeCase] = useState(false);
  const [title, setTitle] = useState(props.title);
  (title: string);

  const changeCaseHandle = (): void => {
    setChangeCase(!changeCase);
  };

  confetti({
    particleCount: 100,
    startVelocity: 30,
    spread: 360,
    origin: {
      x: Math.random(),
      // since they fall down, start a bit higher than random
      y: Math.random() - 0.2,
    },
  });

  useEffect(() => {
    let titleCased = changeCase ? title?.toUpperCase() : title?.toLowerCase();
    setTitle(titleCased);
  }, [changeCase, title]);

  useEffect(() => {
    NProgress.start();
    setTimeout(() => {
      NProgress.done();
    }, 10000);
  }, []);

  return (
    <div>
      <h2>book!</h2>
      <p>
        ORIGINAL:
        {props.title}
      </p>
      <p>
        CASED:
        {title}
      </p>
      <p>{props.nroPages}</p>
      <p>
        {props.authors.map((author, index) => (
          <span key={index}> {author} </span>
        ))}
      </p>
      <div>
        <button onClick={changeCaseHandle}>
          CHANGE TO {changeCase ? "LOWERCASE" : "UPPERCASE"}
        </button>
      </div>
      <hr />
      <input readOnly value={title} />
    </div>
  );
};

Book.defaultProps = {
  title: "",
  nroPages: 0,
  authors: [""],
};

