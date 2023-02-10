import {Route, Routes} from "react-router-dom";
import Page from "../Page/Page";
import Basket from "../Basket/Basket";

const App = () => {
  return (
      <Routes>
          <Route path="/" element={<Page/>}>
              <Route path="basket" element={<Basket />}/>
          </Route>
      </Routes>
  );
}

export default App;
