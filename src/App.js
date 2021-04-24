import './App.css';
import Links from "./components/Links";
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {  
    return (
      <>
        <div className="container p-4">
          <h2 className="text-white m-2">Add your favourite website</h2>
          <Links/>
        </div>
          <ToastContainer/>
      </>
    );
};

export default App;
