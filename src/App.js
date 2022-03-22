import logo from './logo.svg';
import './App.css';
import * as d3 from 'd3';
import scatterplot from './d3/scatterplot';
import React, { useState, useEffect } from 'react';

function App() {
  useEffect(() => {
    scatterplot("scatter", d3.select("#scatter"));
  })
  return (
    <div id="scatter">
    </div>
  );
}

export default App;
