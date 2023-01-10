import { categoryList, categoryState } from "../atoms";
import { useRecoilState, useRecoilValue } from "recoil";
const Category = () => {
  const [oldCategory, setOldCategory] = useRecoilState(categoryState);
  const categories = useRecoilValue(categoryList);
  const onInput = (event: React.FormEvent<HTMLSelectElement>) => {
    setOldCategory(event.currentTarget.value as any);
  };
  return (
    <select value={oldCategory} onInput={onInput}>
      {categories.map((category) => (
        <option key={category} value={category}>
          {category}
        </option>
      ))}
    </select>
  );
};
export default Category;
