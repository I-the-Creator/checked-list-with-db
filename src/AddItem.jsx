import { FaPlus } from 'react-icons/fa';
import { useRef } from 'react';

// get the props from App.js
const AddItem = ({ newItem, setNewItem, handleSubmit }) => {
    // to set the focus back to input after we click '+' button(add the item)
    const inputRef = useRef();

    return (
        // on form submit call the handleSubmit function
        <form className="addForm" onSubmit={handleSubmit}>
            {/* label will be hidden */}
            <label htmlFor='addItem'>Add Item</label>

            <input 
                autoFocus
                ref={inputRef}  /* link to input ref */
                id='addItems'
                type='text'
                placeholder='Add Item'
                required
                // put the prop into controlled input - this is the typed text - get the value from state
                value={newItem}
                //change the state newItem passing event.target.value into setNewItem - pass to App.js and change it
                onChange={(event) => setNewItem(event.target.value)}
            />
            <button
                type='submit'
                aria-label='Add Item'
                /*to set the focus back to INPUT after clicking '+' button
                useRef always has .current property
                 - focus set to element with inputRef in attribute*/
                onClick={() => inputRef.current.focus()}
            >
                <FaPlus />
            </button>
        </form>
    )
}

export default AddItem