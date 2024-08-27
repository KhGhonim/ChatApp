import { Toaster } from "react-hot-toast";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <div >
      <Outlet />
      <Toaster/>
    </div>
  );
}

export default App;
