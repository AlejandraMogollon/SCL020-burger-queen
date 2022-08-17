import { useState, useEffect } from "react";
import {
  auth,
  onAuthStateChanged,
  db,
  collection,
  onSnapshot,
} from "./firebase/init";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import WelcomeChef from "./pages/WelcomeChef";
import MakeOrder from "./pages/MakeOrder";
import WelcomeWaiter from "./pages/WelcomeWaiter";
import KitchenOrders from "./pages/KitchenOrders";
import MenuView from "./pages/MenuView";
import PrivateRoutes from "./components/PrivateRoutes";
import Orders from "./components/Orders";
import SeeOrdersChef from "./pages/SeeOrdersChef";
import SeeOrdersWaiter from "./pages/SeeOrdersWaiter";

function App() {
  const [ordersDb, setOrdersDb] = useState([]);
  const [firebaseUser, setFirebaseUser] = useState(false);
  const [orders, setOrders] = useState([]);
  const [tableRegister, setTableRegister] = useState([]);
  const [orderWithId, setOrderWithId] = useState([]);

  //--Para validar que el usuario este registrado cuando se carga la pagina
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      // console.log(user)
      if (user) {
        setFirebaseUser(user);
      } else {
        setFirebaseUser(null);
      }
    });
  }, []);

  //---- getorders
  //-- En este useEffec estamos tomando toda la data de orders en firebase (incluido el Id)
  useEffect(() => {
    onSnapshot(collection(db, "orders"), (snapshot) => {
      setOrdersDb(
        snapshot.docs.map((doc) => {
          // console.log('doc en app', doc.data())
          return doc;
        })
      );
    });
  }, []);

  //-- Desde aqui sacamos solo el array de ordenes para poder mostrarla en orderchef
  //y tambien incluimos un campo orderid para darle un id a cada orden y poder utilizarlo luego
  useEffect(() => {
    setOrderWithId(
      ordersDb.map((docOrders) => {
        const arrOrders = docOrders.data();
        arrOrders.orderid = docOrders.id;
        return arrOrders;
      })
    );
  }, [ordersDb]);

  

  //---Se valida si el usuario es el curren user, muestra las rutas, de lo contrario muestra que esta cargando la pag
  return firebaseUser !== false ? (
    <Router>
      <div className="container">
        <Navbar firebaseUser={firebaseUser} />
        <Switch>
          <Route path="/" exact>
            <Login />
          </Route>

          <PrivateRoutes>
            <Route path="/welcomechef">
              <WelcomeChef orderWithId={orderWithId} />
            </Route>
            <Route path="/makeorder">
              <MakeOrder setTableRegister={setTableRegister} />
            </Route>
            <Route path="/welcomewaiter">
              <WelcomeWaiter />
            </Route>
            <Route path="/inkitchen">
              <KitchenOrders orderWithId={orderWithId} />
            </Route>
            <Route path="/menu">
              <MenuView setOrders={setOrders} tableRegister={tableRegister} />
            </Route>
            <Route path="/orders">
              <Orders orders={orders} tableRegister={tableRegister} />
            </Route>
            <Route path="/orderschef">
              <SeeOrdersChef orderWithId={orderWithId} setOrdersDb={setOrdersDb} />
            </Route>
            <Route path="/orderswaiter">
              <SeeOrdersWaiter orderWithId={orderWithId} setOrdersDb={setOrdersDb} />
            </Route>
          </PrivateRoutes>
        </Switch>
      </div>
    </Router>
  ) : (
    <p>Cargando...</p>
  );
}

export default App;
