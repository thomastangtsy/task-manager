export const categories = ["Work", "Personal", "School"] as const;

type Category = (typeof categories)[number];

export default Category;
