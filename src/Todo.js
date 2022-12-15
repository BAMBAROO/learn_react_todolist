import { useState } from "react"
export default function App() {
  const [secretId, setSecretId] = useState(null)
  const [value, setValue] = useState('')
  const [edit, setEdit] = useState(true)
  const [add, setAdd] = useState([])
  function generateId() {
    return Date.now();
  }
  function addValue(e) {
    e.preventDefault()
    if (value === '') {
      return setAdd([...add]);
    } else if (secretId) {
      let data = add.find(value => value.id === secretId.id);
      data.value = value;
      setSecretId(null);
      setAdd([...add])
    } else {
      setAdd([...add,{
        id: generateId(),
        value: value,
        done: false
      }]);
    }
    setValue('');
  };
  function removeAdd(id) {
    const resultFilter = add.filter(data => data.id !== id)
    setAdd(resultFilter);
  }
  function changeDone(id) {
    const done = add.find(data => data.id === id)
    done.done = done.done ? false : true;
    setAdd([...add])
  }
  return (
   <>
    <h1>Simple To Do List</h1>
    <form onSubmit={addValue}>
      <input type="text"
      value={value}
      placeholder="add list"
      className='input'
      onChange={ (e) => {
        setValue(e.target.value);
      }} />
      {edit ? (<button type="submit" >Add</button>) 
      : (<button onClick={function () {
        setEdit(true);
      }}>save edit</button>)}
      {!edit ? (<button onClick={function () {
          setEdit(true);
          setSecretId(null);
          setValue('');
      }}>cancel</button>) : null}

    </form>
    {add.length !== 0 ? 
    <ul>
      {add.map(function(data) { 
        return (  
        <li key={data.id}>
          <input type="checkbox" 
          checked={data.done ? "checked" : ""}
          onChange={changeDone.bind(this,data.id)}/>
          {data.done 
          ? data.value + "(done)" 
          : data.value}
          <button onClick={function () {
            setEdit(false);
            setValue(data.value);
            setSecretId(data);
          }}>edit</button>
          <button onClick={function () {
            removeAdd(data.id);
            setValue('');
            setEdit(true);
            setSecretId(null);
          }}>remove</button>
        </li>
        )
      })}
    </ul> 
    : <p><i>no list yet</i></p>} 
    </>
  )
};