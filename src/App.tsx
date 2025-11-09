import { useState } from "react";
import { invoke } from "@tauri-apps/api/core";
import "./App.css";

function App() {

  const [content, setContent] = useState<JSX.Element>(<p>default</p>);

  const control_panel = <div >Control Panel</div>;
  const graph_panel = <div>Graphs</div>;

  return (
    <main className="container">

      <div className="grid-container">
        <div className="navbar" >
          <button onClick={() => setContent(control_panel)}>Controls</button>
          <button onClick={() => setContent(graph_panel)}>Monitoring</button>
        </div>
        <div className="swap-container">
          {content}
        </div>
      </div>
      
    </main>
  );
}

export default App;
