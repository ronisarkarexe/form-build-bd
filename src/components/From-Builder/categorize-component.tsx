import { FaPlus } from "react-icons/fa6";

type CategorizeComponentProps = {
  section: string;
  category: string;
  setCategoryPoint: (value: string) => void;
  categories: string[];
  setCategories: React.Dispatch<React.SetStateAction<string[]>>;
  items: { itemValue: string; belongTo: string }[];
  setItems: React.Dispatch<
    React.SetStateAction<{ itemValue: string; belongTo: string }[]>
  >;
};

const CategorizeComponent = ({
  section,
  category,
  setCategoryPoint,
  categories,
  setCategories,
  items,
  setItems,
}: CategorizeComponentProps) => {
  const handleAddCategory = () => {
    setCategories([...categories, ""]);
  };

  const handleCategoryChange = (index: number, value: string) => {
    const updatedCategories = [...categories];
    updatedCategories[index] = value;
    setCategories(updatedCategories);
  };

  const handleAddItem = () => {
    setItems([...items, { itemValue: "", belongTo: "" }]);
  };

  const handleItemChange = (index: number, value: string) => {
    const updatedItems = [...items];
    updatedItems[index].itemValue = value;
    setItems(updatedItems);
  };

  const handleBelongToChange = (index: number, category: string) => {
    const updatedItems = [...items];
    updatedItems[index].belongTo = category;
    setItems(updatedItems);
  };

  return (
    <div className="bg-slate-200 p-4 rounded">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-blue-500">{section}</h1>
        <h1>Type: {category}</h1>
        <input
          type="text"
          placeholder="Point"
          className="input input-bordered input-xs w-full max-w-xs focus:outline-none"
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          onChange={(event: any) => setCategoryPoint(event.target.value)}
          required={true}
        />
      </div>
      <div>
        <h1 className="mb-2 text-1xl font-bold">Categories</h1>
        <div className="px-5">
          {categories.map((category, index) => (
            <div key={index} className="mb-2">
              <input
                type="text"
                value={category}
                onChange={(e) => handleCategoryChange(index, e.target.value)}
                placeholder={`Category ${index + 1}`}
                className="input input-bordered w-full max-w-xs focus:outline-none"
                required={true}
              />
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddCategory}
            className="btn btn-xs btn-outline mt-2"
          >
            <FaPlus /> Add
          </button>
        </div>

        <div>
          <h1 className="mb-2 text-1xl font-bold">Items</h1>
          <div className="px-5">
            {items.map((item, index) => (
              <div key={index} className="flex mb-2">
                <div className="w-1/2 pr-2">
                  <input
                    type="text"
                    value={item.itemValue}
                    onChange={(e) => handleItemChange(index, e.target.value)}
                    placeholder={`Item ${index + 1}`}
                    className="input input-bordered w-full focus:outline-none"
                    required={true}
                  />
                </div>
                <div className="w-1/2 pl-2">
                  <select
                    className="select select-bordered w-full focus:outline-none"
                    value={item.belongTo}
                    onChange={(e) =>
                      handleBelongToChange(index, e.target.value)
                    }
                  >
                    <option value="">Select Category</option>
                    {categories.map((category, catIndex) => (
                      <option key={catIndex} value={category}>
                        {category || `Category ${catIndex + 1}`}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            ))}
            <button
              type="button"
              onClick={handleAddItem}
              className="btn btn-xs btn-outline mt-2"
            >
              <FaPlus /> Add
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategorizeComponent;
