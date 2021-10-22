import {
  createStore,
  compose,
  applyMiddleware,
  bindActionCreators,
} from "redux";

const makeLouder = (string) => string.toUpperCase();
const repeatThreeTime = (string) => string.repeat(3);
const embolden = (string) => string.bold();

// 1st option
const makeLouderRepeatThreeTimeAndEmbolden = (string) =>
  embolden(repeatThreeTime(makeLouder(string)));
// 2nd option
const makeLouderRepeatThreeTimeAndEmbolden1 = compose(
  embolden,
  repeatThreeTime,
  makeLouder
);

console.log(makeLouderRepeatThreeTimeAndEmbolden("hello"));
console.log(makeLouderRepeatThreeTimeAndEmbolden1("hello1"));

export const Author = () => {
  return <div>author</div>;
};
