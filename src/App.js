import './App.css';
import Routing from '../src/Routing/Routing'
import {Provider} from "react-redux"
import store from '../src/store/store'

function App() {
   
  return (
    <><Provider store={store}>
     <Routing/>
     
     </Provider>
    {/* <Routing/> */}
    </>
  );
}

export default App;

