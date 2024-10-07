"use client";

import { H3 } from "components/Typography";
import { H5 } from "components/Typography";
export default function ProductDescription(props) {
  return <div>
      <H3 mb={2}>DESCRIPTION:</H3>
      <div style={{opacity:"0.9"}}>
        <H5 >{props.data&&<p>{props.data}</p>}</H5>
      </div>
     
      
    </div>;
}