import React from "react";
import menudata from "../menudata.json";
import { useState, useEffect } from "react";
import { FaPlusCircle, FaMinusCircle } from "react-icons/fa";
import { withRouter } from 'react-router-dom'
import {getFormatCurrency} from '../utils/transformcurrency'

const Menu = ({ history, setOrders, tableRegister }) => {
  // CONTADOR

  //   console.log('table in menu',tableRegister)

  const [menu, setMenu] = useState(menudata);




  //usamos el useEffet para indicar que tiene que hacer algo el componente luego del render
  // en este caso usamos local store.SetItem para guardar la data
  useEffect(() => {
    localStorage.setItem("menu", JSON.stringify(menu));
  }, [menu]);


  //Creamos la funcion de nuestro onclick pasandole parametros y traaemos la data del locas store
  //luego validamos si nuestro ID del menu.json y el ID de la comida del boton click coinciden
  const updateMenuSelected = (foodId, updateCount) => {
    // console.log("clickeando");
    const menuFood = JSON.parse(localStorage.getItem("menu"));
    // console.log("Menu after LocalStorage", menuFood);
    if (menuFood) {
      const arrayPosition = menuFood.findIndex((food) => {
        return food.id === foodId;
      });

      // aqui es para sumar y restar el count con un ternario
      menuFood[arrayPosition].count = updateCount
        ? menuFood[arrayPosition].count + 1
        : menuFood[arrayPosition].count - 1;
      //para que no sea negativo el count
      if (menuFood[arrayPosition].count < 0) {
        menuFood[arrayPosition].count = 0;
      }
      setMenu(menuFood);
    }
  };


  const finishOrder = () => {
    const tableOrder = menu.filter((food) => {
      return food.count > 0
    })
    setOrders(tableOrder)
    // console.log('pedido',tableOrder)
    history.push('/orders')
  }

  const drinks = menu.filter((food) => {
    return food.type === "drink";
  });
  const breakfasts = menu.filter((food) => {
    return food.type === "breakfast";
  });
  const lunchs = menu.filter((food) => {
    return food.type === "lunch";
  });

  /*
    -escuchar el clic y saber a que elemento cliqueamos y rescatarlo
    -encontrar con quien asociarlo
    -realizar una funcion donde vamos a buscar en el listado ese id
    -al encontrarlo ese llevara el count que le suma mas 1
    */

  return (
    <main className="AllContainerMenu">
      <div className="textMenuMenu">MENU</div>
      <div className="textTablesMenu">Mesa #{tableRegister}</div>
      <div className="containerMenu">
        <li className="textTypesMenu">Bebidas</li>
        <div className="containerOptionsMenu">
          {drinks.map((food) => {
            return (
              <div className="containerPriceFoodCountMenu" key={food.id}>
                <div className="textFoodNameMenu">{food.name}</div>
                <div className="textFoodNameMenu">{getFormatCurrency(food.price)}$</div>
                <button
                  className="buttonCountMenu"
                  onClick={() => updateMenuSelected(food.id, false)}
                >
                  <FaMinusCircle />
                </button>
                <div className="textFoodNameMenu">{food.count}</div>
                <button
                  className="buttonCountMenu w-1"
                  onClick={() => updateMenuSelected(food.id, true)}
                >
                  {" "}
                  <FaPlusCircle />{" "}
                </button>
              </div>
            );
          })}
        </div>
        <li className="textTypesMenu">Desayunos</li>
        <div className="containerOptionsMenu">
          {breakfasts.map((food) => {
            return (
              <div className="containerPriceFoodCountMenu" key={food.id}>
                <div className="textFoodNameMenu">{food.name}</div>
                <div className="textFoodNameMenu">{getFormatCurrency(food.price)}$</div>
                <button
                  className="buttonCountMenu"
                  onClick={() => updateMenuSelected(food.id, false)}
                >
                  <FaMinusCircle />
                </button>
                <div className="textFoodNameMenu">{food.count}</div>
                <button
                  className="buttonCountMenu w-1"
                  onClick={() => updateMenuSelected(food.id, true)}
                >
                  {" "}
                  <FaPlusCircle />{" "}
                </button>
              </div>
            );
          })}
        </div>
        <li className="textTypesMenu">Otros Platos</li>
        <div className="containerOptionsMenu">
          {lunchs.map((food) => {
            return (
              <div className="containerPriceFoodCountMenu" key={food.id}>
                <div className="textFoodNameMenu">{food.name}</div>
                <div className="textFoodNameMenu">{getFormatCurrency(food.price)}$</div>
                <button
                  className="buttonCountMenu"
                  onClick={() => updateMenuSelected(food.id, false)}
                >
                  <FaMinusCircle />
                </button>
                <div className="textFoodNameMenu">{food.count}</div>
                <button
                  className="buttonCountMenu w-1"
                  onClick={() => updateMenuSelected(food.id, true)}
                >
                  {" "}
                  <FaPlusCircle />{" "}
                </button>
              </div>
            );
          })}
        </div>
      </div>
      <div className="buttonNextMenu">
        <button className="btn btn-secondary rounded-pill" onClick={() => finishOrder()} >SIGUIENTE</button>
      </div>
    </main>
  );
};

export default withRouter(Menu)
