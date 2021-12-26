import { useState } from 'react';

import Header from './Header';
import AddItem from './AddItem';
import SearchItem from './SearchItem';
import Content from './Content';
import Footer from './Footer';

function App() {
  
  // items state and default list values
  const [items, setItems] = useState(JSON.parse(localStorage.getItem('shoppinglist')));

  const [newItem, setNewItem] = useState('');

  const[search, setSearch] = useState('');

  const setAndSaveItems = (newItems) => {
    // send new listItem array to state via setItems
    setItems(newItems);
    // save state value to localStorage
    localStorage.setItem('shoppinglist', JSON.stringify(newItems));
  }

  const addItem = (item) => {

    //item construction
    /*  check the id and set the value for new item
    if other items exist, get the last element id and increment it by 1, otherwise just set into 1 */
    const id = items.length ? items[items.length - 1].id + 1 : 1;

    const myNewItem = { id, checked: false, item };
    // add new item into the array; create new array listItem - spread existing items and add new
    const listItems = [...items, myNewItem];

    // call the setAndSaveItems function and pass there array 'listItems' - updated after changes
    setAndSaveItems(listItems);
  }

  const handleCheck = (id) => {
    // console.log(`key: ${id}`);
    /* iterate on items and check if item.id === id that got from input then create new object
    equal to original (using spread operator) and flip the current checked property value (!item.checked),
    otherwise return the current 'item' w/o changes
    */
    const listItems = items.map((item) => item.id === id ? { ...item,
    checked: !item.checked } : item);

    // call the setAndSaveItems function and pass there array 'listItems' - updated after changes
    setAndSaveItems(listItems);
  }

  const handleDelete = (id) => {
    /*use filter method - it creates new filtered array 
        filter out the items that have item.id == id,
        other items added to new array = listItems
    */
    const listItems = items.filter((item) => item.id !== id);

    // call the setAndSaveItems function and pass there array 'listItems' - updated after changes
    setAndSaveItems(listItems);
  }

  const handleSubmit = (event) => {
    // disable default behavior on submit (page reload, etc)
    event.preventDefault();
    if(!newItem) return;
    // add Item - with newItem state as a parameter
    addItem(newItem);
    // reset state value after submit. it's deleting previous input
    setNewItem('');
  }
  
  return (
    <div className="App">

      {/* send the 'title' prop to Header - props drilling */}
      <Header title="Grocery List" />
      <AddItem 
        newItem={newItem}
        setNewItem={setNewItem}
        handleSubmit={handleSubmit}
      />
      {/* Search component - sending props to SearchItem*/}
      <SearchItem 
        search={search}
        setSearch={setSearch}
      />
       {/* send the 'items' and handler-functions props to Content - props drilling */}
      <Content 
      // add filtering by 'search input' value - with lowering case 
        items={items.filter(item => ((item.item).toLowerCase()).includes(search.toLowerCase()))}
        handleCheck={handleCheck}
        handleDelete={handleDelete}
      />
      <Footer 
        length={items.length}
      />
    </div>
  );
}

export default App;
