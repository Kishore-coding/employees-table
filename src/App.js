import React, { Component } from "react";
import Table from "./components/Table";

class App extends Component {
  render() {
    return (
      <div>
        <h2 style={{ textAlign: "center", color: "grey" }}>CRUD Table</h2>
        <Table />;
      </div>
    );
  }
}

export default App;
