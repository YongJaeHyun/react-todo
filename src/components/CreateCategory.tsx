import { useSetRecoilState } from "recoil";
import { categoryList } from "../atoms";
import { useForm } from "react-hook-form";

interface IForm {
  newCategory: string;
}

const CreateCategory = () => {
  const setCategories = useSetRecoilState(categoryList);
  const { register, handleSubmit, setValue } = useForm<IForm>();
  const handleValid = ({ newCategory }: IForm) => {
    setCategories((oldCategory) => {
      const newCategories = [...oldCategory, newCategory];
      return newCategories;
    });
    setValue("newCategory", "");
  };
  return (
    <form onSubmit={handleSubmit(handleValid)}>
      <input
        {...register("newCategory", {
          required: "Please write a category",
        })}
        placeholder="Write a your own category"
      />
      <button>Add</button>
    </form>
  );
};
export default CreateCategory;
