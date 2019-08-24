import React, { Component } from 'react';
import './App.css';
import Canvas from './Components/canvas.jsx'
class App extends Component {
  state = {  }
  
  render() { 
    return ( 
      <div className="App fullscreen ">
        <h1>
         Hiragana Search<br/>
         平仮名検索    
        </h1>
        <Canvas className="flxc">

        </Canvas>

      </div>
     );
  }
}
 
export default App;