export const categories: Readonly<Array<string>> = [
  "Work",
  "Personal",
  "School",
];

type Category = (typeof categories)[number];

export default Category;
