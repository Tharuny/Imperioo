"use client";
import { H3, H4 } from "components/Typography";
import { Exo_2 } from "next/font/google";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from "react";
import { capital } from "app/store/capitalize/capitalizeText";

export default function ProductSpecifications(props) {
  const specifications=props.names;
  const [capitalizedSpecs, setCapitalizedSpecs] = useState([]);

  useEffect(() => {
    const capitalizeSpecs = async () => {
      const capitalizedNames = await Promise.all(
        specifications.map(async (name) => {
          const capitalize = capital(name);
          return await capitalize();
        })
      );
      setCapitalizedSpecs(capitalizedNames);
    };

    capitalizeSpecs();
  }, [specifications])

  
  return (
    <div>
      <H3 mb={2}>SPECIFICATIONS</H3>
      <div className="container-fluid mt-2">
        { capitalizedSpecs.map((name, index) => (
          <div className="row" key={index}>
            <div className="col-md-6">
                  <h6>{name}</h6>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
