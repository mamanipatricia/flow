// @flow
function test(param: 1 | 2 | 3 | 4 | 5) {
  // ...
}

declare var oneOrTwo: 1 | 2; // Subset of the input parameters type.
declare var fiveOrSix: 5 | 6; // Not a subset of the input parameters type.

test(oneOrTwo); // Works!
// $ExpectError
// test(fiveOrSix); // Error!

//? Subtypes of complex types
// 1
type ObjectA = {
  foo: string,
};
type ObjectB = {
  foo: string,
  bar: number,
};

let objectB: ObjectB = { foo: "test", bar: 42 };
let objectA: ObjectA = objectB; // Works!

//2

type Object1 = {
  foo: string,
};
type Object2 = {
  foo: number,
  bar: number,
};

let object2: Object2 = { foo: 1, bar: 2 };
// $ExpectError
let object1: Object1 = { foo: "1" }; // Error!

console.log(`object1: `, object1);
console.log(`object2: `, object2);

// declare var obj: {
//   a: 1 | 2,
//   b: 3 | 4,
// };

//
function method(obj: { foo: string }) {
  // ...
}

method({
  foo: "test", // Works!
  bar: 42, // Works!
});

// {| foo: string, bar: number |}
var foo: {| foo: string, bar: string |} = { foo: "Hello", bar: "World!" }; // Error!

//? Intersections of exact object types may not work as you expect. If you need to combine exact object types, use object type spread:

type FooT = {| foo: string |};
type BarT = {| bar: number |};

type FooBarFailT = FooT & BarT;
type FooBarT = {| ...FooT, ...BarT |}; // _/

// const fooBarFail: FooBarFailT = { foo: "123", bar: 12 }; // Error!
const fooBar: FooBarT = { foo: "123", bar: 12 }; // Works!

// $Exact
// @flow
type ExactUser = $Exact<{
  name: string,
}>;

type ExactUserShorthand = {|
  name: string,
|};

const user2 = { name: "John Wilkes Booth" };
// These will both be satisfied because they are equivalent
(user2: ExactUser);
(user2: ExactUserShorthand);

//? $Diff<A, B>
// Para  cualquier X/xCA ^ xC/B

type Props = {
  name: string,
  age: number,
};
type DefaultProps = {
  age: number,
};
type RequiredProps = $Diff<Props, DefaultProps>; // name _/

function setProps(props: RequiredProps) {
  //   console.log("RequiredProps>>", RequiredProps);
}

setProps({ name: "foo" });
setProps({ name: "foo", age: 42, baz: false }); // you can pass extra props too
// setProps({ age: 42 }); // error, name is required

// ? Note that $Diff<A, B> will error if the object you are removing properties from does not have the property being removed, i.e. if B has a key that doesn’t exist in A:

type Props1 = { name: string, age: number };
type DefaultProps1 = { age: number, other: string }; // Will error due to this `other` property not being in Props1.
type RequiredProps1 = $Diff<Props1, DefaultProps1>;

function setProps1(props: RequiredProps1) {
  //   props.name;
  // ...
}
//? As a workaround, you can specify the property not present in A as optional. -- Como solución alternativa, puede especificar la propiedad que no está presente en A como opcional.

type A = $Diff<{}, { nope: number }>; // Error
type B = $Diff<{}, { nope: number | void }>; // OK

//? rest

type CEO = {
  title: string,
};
type Props21 = { name: string, age: number, title: CEO };

const props: Props21 = { name: "Jon", age: 42, title: { title: "CEO" } };
const { age, ...otherProps } = props; //*  otherProps =  { name: "Jon", title: { title: "CEO" } };
(otherProps: $Rest<Props21, {| age: number |}>); // ==> name?:string, title?:CEO - REST optional properties
otherProps.name = "PAT";
otherProps.name.toUpperCase(); // "Jon"
console.log(">> ", otherProps.title?.title);
// otherProps.age; // Error

//? $NonMaybeType<T>

type MaybeName = ?string;
type Name = $NonMaybeType<MaybeName>;

("Gabriel": MaybeName); // Ok
(null: MaybeName); // Ok
("Gabriel": Name); // Ok
// (null: Name); // Error! null can't be annotated as Name because Name is not a maybe type

