import { useState } from "react";

type CategorizeViewProps = {
  section: string;
  category: string;
  categories: string[];
  items: { itemValue: string; belongTo: string }[];
  point: string;
};

const CategorizeView = ({
  section,
  category,
  categories,
  items,
  point,
}: CategorizeViewProps) => {
  const [categoryItems, setCategoryItems] = useState<Record<string, string[]>>(
    () =>
      categories.reduce((acc, category) => {
        acc[category] = [];
        return acc;
      }, {} as Record<string, string[]>)
  );

  const [draggedItem, setDraggedItem] = useState<string | null>(null);

  const handleDragStart = (itemValue: string) => {
    setDraggedItem(itemValue);
  };

  const handleDrop = (category: string) => {
    if (draggedItem) {
      setCategoryItems((prev) => {
        const updatedCategories = Object.entries(prev).reduce(
          (acc, [key, values]) => {
            acc[key] = values.filter((item) => item !== draggedItem);
            return acc;
          },
          {} as Record<string, string[]>
        );

        updatedCategories[category].push(draggedItem);

        return updatedCategories;
      });

      setDraggedItem(null);
    }
  };

  const handleRefresh = () => {
    setCategoryItems(
      categories.reduce((acc, category) => {
        acc[category] = [];
        return acc;
      }, {} as Record<string, string[]>)
    );
  };

  return (
    <div className="p-4 space-y-6 bg-gray-50 rounded-md shadow">
      <div className="mb-4">
        <h2 className="text-lg font-bold">{section}</h2>
      </div>
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-4">
          <h2 className="text-lg font-bold">{category}</h2>
          <span className="border rounded px-3 py-1 text-xs bg-gray-100">
            {point ? `${point} Points` : "0 Points"}
          </span>
        </div>
        <button
          onClick={handleRefresh}
          className="bg-blue-500 text-white px-4 py-1 rounded shadow hover:bg-blue-600"
        >
          Refresh
        </button>
      </div>

      <div className="flex flex-wrap gap-4 mb-6">
        {items
          .filter(
            (item) =>
              !Object.values(categoryItems).some((list) =>
                list.includes(item.itemValue)
              )
          )
          .map((item) => (
            <div
              key={item.itemValue}
              draggable
              onDragStart={() => handleDragStart(item.itemValue)}
              className="border rounded-md p-2 bg-gray-100 hover:bg-gray-200 shadow cursor-move"
            >
              {item.itemValue}
            </div>
          ))}
      </div>

      <div className="flex flex-wrap gap-4">
        {categories.map((category) => (
          <div
            key={category}
            onDragOver={(e) => e.preventDefault()}
            onDrop={() => handleDrop(category)}
            className="border-2 border-dashed border-gray-400 rounded-md p-4 w-1/3 min-w-[200px] max-w-[300px] bg-white shadow"
          >
            <h3 className="text-sm font-semibold mb-2">{category}</h3>
            <div className="flex flex-wrap gap-2">
              {categoryItems[category].map((itemValue) => (
                <div
                  key={itemValue}
                  className="border rounded-md p-2 bg-blue-100 shadow"
                >
                  {itemValue}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategorizeView;
