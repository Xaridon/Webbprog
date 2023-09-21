import { v4 as uuidv4 } from 'uuid';
import inventory from './inventory.mjs';



class Salad {
    static #instanceCounter = 0;
    constructor(salad) {
      this.id = 'salad_' + Salad.#instanceCounter++;
      this.uuid = uuidv4();
      this.ingredients = {};
      if (arguments.length > 0) {
        this.ingredients = {...salad.ingredients}; //...tar bort [], lägger till ingridieserna
      }
    }
    add(name, properties) { 
      this.ingredients[name] = properties;
      return this;
    }
    remove(name) { 
      delete this.ingredients[name];
      return this;
    }
    count(prop) {
      return Object.values(this.ingredients)
        .filter((value) => value[prop])
        .reduce((sum, x) => sum += 1, 0);
    }
    
    getPrice = function(){
      return Object.values(this.ingredients).reduce((sum, x) => sum += x.price, 0);
    }
  
    static parse(json) {
      if (typeof json === 'string') {
        try {
          const parsedSalad = JSON.parse(json);
  
          if (Array.isArray(parsedSalad)) {
            // If parsedSalad is an array, return an array of Salad objects
            return parsedSalad.map(saladData => new Salad(saladData));
          } else if (typeof parsedSalad === 'object') {
            // If parsedSalad is an object, return a single Salad object
            return new Salad(parsedSalad);
          } else {
            throw new Error('Invalid JSON data');
          }
        } catch (error) {
          throw new Error('Error parsing JSON: ' + error.message);
        }
      } else {
        throw new Error('Input is not a string');
      }
    }
  }

  export default Salad;