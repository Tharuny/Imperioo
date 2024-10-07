"use client";

import { H3 } from "components/Typography";

export default function ProductDescription1(props) {
  return <div>
      {/* <H3 mb={2}>DESCRIPTION:</H3> */}
      <div style={{opacity:"0.9"}}>
        <p>{props.data&&<p>{props.data}</p>}</p>
      </div>
     
      
    </div>;
}