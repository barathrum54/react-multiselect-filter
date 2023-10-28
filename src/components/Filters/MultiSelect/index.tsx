import React, { useState, useEffect } from 'react';
import CategoryProps from '../../../types/Category';
import "./style.css";
import SearchBar from './SearchBar';
import Item from './Item';
import Button from './Button';

type MultiSelectProps = {
  items: CategoryProps[];
  loading: boolean;
  title: string;
};

const MultiSelect: React.FC<MultiSelectProps> = ({ items, loading, title }) => {
  const [selectedItems, setSelectedItems] = useState<CategoryProps[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const handleItemSelect = (item: CategoryProps) => {
    setSelectedItems((prevSelectedItems) => {
      if (prevSelectedItems.some((selected) => selected.id === item.id)) {
        const updatedItems = prevSelectedItems.filter((selected) => selected.id !== item.id);
        localStorage.setItem("selectedItems", JSON.stringify(updatedItems));
        return updatedItems;
      } else {
        const updatedItems = [...prevSelectedItems, item];
        localStorage.setItem("selectedItems", JSON.stringify(updatedItems));
        return updatedItems;
      }
    });
  };

  useEffect(() => {
    const savedItems = localStorage.getItem('selectedItems');
    if (savedItems) {
      setSelectedItems(JSON.parse(savedItems));
    }
  }, []);

  const filteredItems = items.filter((item) => {
    const itemText = item.name;
    if (!searchQuery || searchQuery === "") {
      return true;
    }
    return itemText && itemText.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const selected = selectedItems.map((selectedItem) => (
    <Item category={selectedItem} handleItemSelect={handleItemSelect} checked={true} key={selectedItem.id} />
  ));

  const unselected = filteredItems
    .filter((item) => !selectedItems.some((selected) => selected.id === item.id))
    .map((item) => (
      <Item category={item} handleItemSelect={handleItemSelect} checked={false} key={item.id} />
    ));
  const [searchButtonLoading, setSearchButtonLoading] = useState<boolean>(false);
  const mockSearchAction = () => {
    setSearchButtonLoading(true);
    setTimeout(() => {
      alert("Error searching categories, please try again.")
      setSearchButtonLoading(false);
    }, 1500);
  }
  return (
    <div className='multi-select-wrapper'>
      <h3 className='title'>{title}</h3>
      <SearchBar value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
      {loading ? (
        <div>Yükleniyor...</div>
      ) : (
        <>
          <div className='multi-select-content'>
            {selected}
            {unselected}
          </div>
          <Button text='Ara' onClick={mockSearchAction} isLoading={searchButtonLoading} />
        </>
      )}
    </div>
  );
};

export default MultiSelect;
