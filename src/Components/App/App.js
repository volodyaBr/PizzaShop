import {Navigate, Route, Routes} from "react-router-dom";
import Main from "../Main/Main";

const App = () => {
  return (
      <Routes>
          <Route path="/" element={<Main/>}>
              <Route path="card" element={<Navigate to="/"/>}/>
          </Route>
      </Routes>
  );
}

export default App;
