import '../../css/dashboard/subInfo.css'
import * as d3 from 'd3'
import { useEffect } from 'react';

const SubInfo =(props)=>{

   
    return  <div className="sub-info">
    <div className="left">
      <h1>{props.type}</h1>
      <p>{props.todayTxt}</p>
      <h3>
        {typeof props.futureData.data === "undefined"
          ? ""
          : props.futureData.data.current_condition[0].windspeedKmph}
          {props.unit}
      </h3>
    </div>
    <div className="right" id={props.type}></div>
  </div>
}

export default SubInfo