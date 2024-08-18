// import styles from "./Unit.css";

// function Unit(name: String) {
//   return (
//     <>
//       <div
//         style={{
//           display: "flex",
//           alignItems: "center",
//           columnGap: "20px",
//           fontSize: "20px",
//           width: "600px",
//         }}
//       >
//         <h2 style={{ justifyContent: "left" }}>{name}</h2>
//         <textarea
//           style={{
//             justifyContent: "right",
//             resize: "none",
//             borderRadius: "8px",
//             borderWidth: "2px",
//             borderColor: "#213547",
//           }}
//         />
//       </div>
//     </>
//   );
// }

// export default Unit;

import React, { useState, useEffect } from "react";

interface Unit {
  name: string;
  value: number;
  factor: number;
}

const units: Unit[] = [
  { name: "MPGe", value: 33.71, factor: 33.71 },
  { name: "Wh/mi", value: 1000, factor: 1000 },
  { name: "kWh/mi", value: 1, factor: 1 },
  { name: "kWh/100mi", value: 100, factor: 100 },
  { name: "mi/kWh", value: 1, factor: 1 },
  { name: "Wh/km", value: 1000 / 1.609344, factor: 1000 / 1.609344 },
  { name: "kWh/km", value: 1 / 1.609344, factor: 1 / 1.609344 },
  { name: "kWh/100km", value: 100 / 1.609344, factor: 100 / 1.609344 },
  { name: "km/kWh", value: 1 / 1.609344, factor: 1 / 1.609344 },
];

// Convert the current selection to mi/kWh then call ToAllElse() to handle the rest of the table
function ToMikWh(event: React.ChangeEvent<HTMLInputElement>) {
  // Find the factor for whatever unit it is we have
  const foundUnit = units.find((unit) => unit.name === event.target.name);
  if (foundUnit) {
    // Then convert it to mi/kWh and use that to convert the rest
    const mikWh = Number(event.target.value) / foundUnit.factor;
    ToAllElse(mikWh);
  }
  ToAllElse(0); // something went terribly wrong
}

// Covert all other values using factors from base mi/kWh and its current value
function ToAllElse(mikWhValue: number) {
  units.find((unit) => {
    switch (unit.name) {
      case "MPGe":
    }
    unit.value = mikWhValue * unit.factor;
  });
  return;
}

function UnitConverter() {
  const [selectedUnit, setSelectedUnit] = useState(units[0]);
  const [inputValue, setInputValue] = useState(selectedUnit.value.toString());

  useEffect(() => {
    const newValue = parseFloat(inputValue) / selectedUnit.value;
    units.forEach((unit) => {
      unit.value = newValue * unit.value;
    });
  }, [inputValue, selectedUnit]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.name === "mi/kWh") {
      ToAllElse(Number(event.target.value));
    } else {
      ToMikWh(event);
    }
    setInputValue(event.target.value);
    setSelectedUnit(units.find((unit) => unit.name === event.target.name)!);
  };

  return (
    <div>
      {units.map((unit) => (
        <div key={unit.name} style={{ display: "flex" }}>
          <span>{unit.name}:</span>
          <input
            type="number"
            name={unit.name}
            value={unit.value.toFixed(2)}
            onChange={handleInputChange}
          />
        </div>
      ))}
    </div>
  );
}

export default UnitConverter;
