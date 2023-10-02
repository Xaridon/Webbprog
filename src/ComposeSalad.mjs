import { useState } from 'react';
import Salad from './Salad.mjs';
import inventory from './inventory.mjs';
import { useNavigate ,useOutletContext } from "react-router-dom";


function ComposeSalad() {
  const props = useOutletContext();
  const navigate = useNavigate();
  const extras = Object.keys(props.inventory).filter(name => props.inventory[name].extra);
  const foundations = Object.keys(props.inventory).filter(name => props.inventory[name].foundation);
  const proteins = Object.keys(props.inventory).filter(name => props.inventory[name].protein);
  const dressings = Object.keys(props.inventory).filter(name => props.inventory[name].dressing);
  const [foundation, setFoundation] = useState('');
  const [extra, setExtra] = useState({});
  const [protein, setProtein] = useState('')
  const [dressing, setDressing] = useState('')

  function handleSubmit(e){
    e.preventDefault()
    if(!e.target.checkValidity()){
      e.target.classList.add("was-validated");
      return;
    }
    let newSalad = new Salad()
      .add(foundation, inventory[foundation])
      .add(protein, inventory[protein])
      .add(dressing, inventory[dressing])
      
      Object.keys(extra).forEach(key => newSalad.add(key, inventory[key]))

    let newSaladArray = [...props.shoppingCart, newSalad]
    props.setSalads(newSaladArray);      

    setFoundation('')
    setExtra({})
    setProtein('')
    setDressing('');
    e.target.classList.remove("was-validated");
    navigate('/view-order/confirm/'+ newSalad.uuid)
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
      <div class="form-check form-check-inline">
        <label>
          <input type='checkbox' name={name} checked={extra[name]} onChange={e => (extraEventHandler(e, name))}></input>
          {name} {inventory[name].price}kr
        </label>
      </div>
      )
      
  }

  function buildOptions(name) {
    return(
      <option value={name}>{name} - {inventory[name].price}kr</option>
      )
      
  }

  return (
    <div className="row h-200 p-5 bg-light border rounded-3">
          <h2>Välj innehållet i din sallad</h2>
    <div className="continer col-12">
      <div className="row h-200 p-5 bg-light border rounded-3">
      <form  onSubmit={handleSubmit} className='g-3 needs-validation' noValidate>
        <h2>Välj Bas</h2>
        <div>
        <select className="form-select form-control" id="validationCustom01" name='foundation' value={foundation} onChange={e => setFoundation(e.target.value)} required>
          <option value='' disabled>Lägg till bas</option>
        {foundations.map(name => buildOptions(name))}
        </select>
        <div class="invalid-feedback">Please choose a foundation</div>
        </div>
        <h2>Välj Protein</h2>
        <div>
        <select className="form-select form-control" id="validationCustom02" name='protein' value={protein} onChange={e => setProtein(e.target.value)} required>
          <option value='' disabled>Lägg till protein</option>
        {proteins.map(name => buildOptions(name))}
        </select>
        <div class="invalid-feedback">Please choose a protein</div>
        </div>
        <h2>Välj Dressing</h2>
        <div>
        <select className="form-select form-control" id="validationCustom03" name='dressing' value={dressing} onChange={e => setDressing(e.target.value)} required>
          <option value='' disabled>Lägg till dressing</option>
        {dressings.map(name => buildOptions(name))}
        </select>
        <div class="invalid-feedback">Please choose a dressing</div>
        </div>
        <h2>Välj Extra</h2>       
        {extras.map(name => buildList(name))}
        <br></br>
        <button type='submit' className="btn btn-success">Lägg till i korgen</button>
        </form>
      </div>
    </div>
    </div>
  );
}


export default ComposeSalad;