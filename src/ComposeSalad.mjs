import { useState } from 'react';
import Salad from './Salad.mjs';
import { useNavigate ,useOutletContext, useLoaderData } from "react-router-dom";


function ComposeSalad() {
  const props = useOutletContext();
  const navigate = useNavigate();
  const inventory = useLoaderData();
  const extras = Object.keys(inventory.extras);
  const foundations = Object.keys(inventory.foundations);
  const proteins = Object.keys(inventory.proteins);
  const dressings = Object.keys(inventory.dressings);
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
      .add(foundation, inventory["foundations"][foundation])
      .add(protein, inventory["proteins"][protein])
      .add(dressing, inventory["dressings"][dressing])
      
      Object.keys(extra).forEach(key => newSalad.add(key, inventory["extras"][key]))

    let newSaladArray = [...props.shoppingCart, newSalad]
    props.setSalads(newSaladArray);



    localStorage.setItem("shoppingCart", JSON.stringify(newSaladArray));

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
  

  function buildList(name, type) {
    return(
      <div class="form-check form-check-inline">
        <label>
          <input type='checkbox' name={name} checked={extra[name]} onChange={e => (extraEventHandler(e, name))}></input>
          {name} {inventory[type][name].price}kr
        </label>
      </div>
      )
      
  }

  function buildOptions(name, type) {
    return(
      <option value={name}>{name} - {inventory[type][name].price}kr</option>
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
        {foundations.map(name => buildOptions(name, "foundations"))}
        </select>
        <div class="invalid-feedback">Please choose a foundation</div>
        </div>
        <h2>Välj Protein</h2>
        <div>
        <select className="form-select form-control" id="validationCustom02" name='protein' value={protein} onChange={e => setProtein(e.target.value)} required>
          <option value='' disabled>Lägg till protein</option>
        {proteins.map(name => buildOptions(name, "proteins"))}
        </select>
        <div class="invalid-feedback">Please choose a protein</div>
        </div>
        <h2>Välj Dressing</h2>
        <div>
        <select className="form-select form-control" id="validationCustom03" name='dressing' value={dressing} onChange={e => setDressing(e.target.value)} required>
          <option value='' disabled>Lägg till dressing</option>
        {dressings.map(name => buildOptions(name, "dressings"))}
        </select>
        <div class="invalid-feedback">Please choose a dressing</div>
        </div>
        <h2>Välj Extra</h2>       
        {extras.map(name => buildList(name, "extras"))}
        <br></br>
        <button type='submit' className="mt-3 btn btn-success">Lägg till i korgen</button>
        </form>
      </div>
    </div>
    </div>
  );
}




export default ComposeSalad;