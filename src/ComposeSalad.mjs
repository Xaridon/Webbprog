import { useState } from 'react';
import Salad from './Salad.mjs';
import inventory from './inventory.mjs';

function ComposeSalad(props) {
  const extras = Object.keys(props.inventory).filter(name => props.inventory[name].extra);
  const foundations = Object.keys(props.inventory).filter(name => props.inventory[name].foundation);
  const proteins = Object.keys(props.inventory).filter(name => props.inventory[name].protein);
  const dressings = Object.keys(props.inventory).filter(name => props.inventory[name].dressing);
  const [foundation, setFoundation] = useState('Sallad');
  const [extra, setExtra] = useState({});
  const [protein, setProtein] = useState('Kycklingfilé')
  const [dressing, setDressing] = useState('Ceasardressing')

  const sallads = Array[0]

  function handleSubmit(e){
    let sallad = new Salad()
      .add(foundation, inventory[foundation])
      .add(protein, inventory[protein])
      .add(dressing, inventory[dressing])
      
      Object.keys(extra).forEach(key => (sallad.add(key, inventory[key])))

    sallads.push(sallad);
    
    setFoundation('Sallad')
    setExtra({})
    setProtein('Kycklingfilé')
    setDressing('Ceasardressing')
    e.preventDefault();
  }



  function extraEventHandler(e, name){
    if (e.target.checked === true){
      setExtra({...extra, [name]: true})
    } 
    if (e.target.checked !== true) {
      setExtra(prev => {
        const current = {...prev};
        delete current[name];
        return current;
      });
    }
  }
  

  function buildList(name) {
    return(
      <div>
        <label>
          <input type='checkbox' name={name} checked={extra[name]} onChange={e => (extraEventHandler(e, name))}></input>
          {name} {inventory[name].price}kr
        </label>
      </div>
      )
      
  }

  function buildOptions(name) {
    return(
      <option value={name}>{name} {inventory[name].price}kr</option>
      )
      
  }

  return (
    <div className="continer col-12">
      <div className="row h-200 p-5 bg-light border rounded-3">
      <form>
        <h2>Välj Bas</h2>
        <select name='foundation' value={foundation} onChange={e => setFoundation(e.target.value)}>
        {foundations.map(name => buildOptions(name))}
        </select>
        <h2>Välj Protein</h2>
        <select name='protein' value={protein} onChange={e => setProtein(e.target.value)}>
        {proteins.map(name => buildOptions(name))}
        </select>
        <h2>Välj Dressing</h2>
        <select name='dressing' value={dressing} onChange={e => setDressing(e.target.value)}>
        {dressings.map(name => buildOptions(name))}
        </select>
        <h2>Välj Extra</h2>
        {extras.map(name => buildList(name))}
        <button type='submit' className="btn" onSubmit={e => handleSubmit(e)}>Lägg till i korgen</button>
        </form>
      </div>
      {foundations}
    </div>
  );
}


export default ComposeSalad;