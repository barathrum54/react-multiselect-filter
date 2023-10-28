import React from 'react';
import CategoryProps from '../../../../types/Category';
import "./style.css"
type ItemProps = {
  category: CategoryProps;
  handleItemSelect: (item: CategoryProps) => void;
  checked: boolean;
};

const Item: React.FC<ItemProps> = ({ category, handleItemSelect, checked }) => {
  return (
    <div className={`multi-select-item ${checked ? "selected" : ""}`} key={category.id}>
      <label>
        <input
          type='checkbox'
          checked={checked}
          onChange={() => handleItemSelect(category)}
        />
        {category.name}
      </label>
    </div>
  );
};

export default Item;
