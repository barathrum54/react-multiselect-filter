import React, { useState, useEffect } from 'react';
import './App.css';
import MultiSelect from './components/Filters/MultiSelect';
import CategoryProps from './types/Category';

function App() {
  const [items, setItems] = useState<CategoryProps[]>([]);
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    fetch('/data.json')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network request failed. Please check your internet connection.');
        }
        return response.json();
      })
      .then((data) => {
        if (!data || !Array.isArray(data.data)) {
          throw new Error("Data is not valid or corrupted");
        }
        const categories = data.data.map((item: string, index: number) => {
          item = item.replace(/&amp;/g, '&');
          const category: CategoryProps = {
            id: index,
            name: item
          };
          return category;
        });
        setItems(categories);
        setLoading(false);
      })
      .catch((error) => {
        const errorMessage = error instanceof Error ? error.message : 'An error occurred while fetching data.';
        alert(errorMessage);
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <div className="App">
      <div className='Filters'>
        <MultiSelect items={items} loading={loading} title='Kategoriler' />
      </div>
    </div>
  );
}

export default App;
