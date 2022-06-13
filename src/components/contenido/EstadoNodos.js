
import React, {useEffect, useState} from "react";
import { GraficoNodoHumedadAmbiente } from "../estadoNodos/GraficoNodoHumedadAmbiente";
import { GraficoNodoHumedadSuelo } from "../estadoNodos/GraficoNodoHumedadSuelo";
import { GraficoNodoTemperatura } from "../estadoNodos/GraficoNodoTemperatura";

import { Select } from "antd";
const {Option} = Select;

export const EstadoNodos = () => { 

  const [seleccionado, setSeleccion] = useState(["Temperatura Ambiente", "Humedad de Suelo", "Humedad Ambiente"]);
  const [seleccion, setSelec] = useState('Temperatura Ambiente');

  //const opciones = seleccionado.map(Add => Add)
/*
  const handleSeleccionChange = (e) => {
    //hacer lo que haya que hacer
    console.clear();
    //console.log((seleccionado[e.target.value]));
    setSelec(seleccionado[e.target.value])
  }
  {
    opciones.map((seleccion, key) => <option key={key} value={key}>{seleccion}</option>)
  }
  */
  const handleChange = (value) => {
    
    setSelec(value)
  };

  return(
    <div>
      <label>

        < Select
          style={{ width: 170 }}
          onChange={handleChange}
          defaultValue="Temperatura Ambiente"
          className="browser-default custom-select" >
          <Option value="Temperatura Ambiente">Temperatura Ambiente</Option>
          <Option value="Humedad de Suelo">Humedad de Suelo</Option>
          <Option value="Humedad Ambiente">Humedad Ambiente</Option>
          
        </Select >
        
      </label>

      <div>
        {seleccion === "Temperatura Ambiente"?<GraficoNodoTemperatura></GraficoNodoTemperatura>:""}
        {seleccion === "Humedad Ambiente"?<GraficoNodoHumedadAmbiente></GraficoNodoHumedadAmbiente>:""}
        {seleccion === "Humedad de Suelo"?<GraficoNodoHumedadSuelo></GraficoNodoHumedadSuelo>:""}
      </div>
    </div>
  );
}