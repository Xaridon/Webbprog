import { useState } from 'react';

function ComposeSalad(props) {
  const extras = Object.keys(props.inventory).filter(name => props.inventory[name].extra);
  const foundations = Object.keys(props.inventory).filter(name => props.inventory[name].foundation);
  const proteins = Object.keys(props.inventory).filter(name => props.inventory[name].protein);
  const dressings = Object.keys(props.inventory).filter(name => props.inventory[name].dressing);
  const [foundation, setFoundation] = useState('Pasta');
  const [extra, setExtra] = useState({});
  const [protein, setProtein] = useState('Kycklingfilé')
  const [dressing, setDressing] = useState('Ceasardressing')

  function createSallad(){
    let sallad = new Array();
    sallad.push(foundation, protein, dressing, extra)
    return sallad;
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
    {return(
      <div>
        <label>
          <input type='checkbox' name={name} checked={extra[name]} onChange={e => (extraEventHandler(e, name))}></input>
          {name}
        </label>
      </div>
      )
      }
  }

  function buildOptions(name) {
    {return(
      <option value={name}>{name}</option>
      )
      }
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
        <button type='submit' className="btn">Lägg till i korgen</button>
        </form>
      </div>
    </div>
  );
}
export default ComposeSalad;