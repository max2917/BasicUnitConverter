import React, { useState, useEffect } from "react";

interface Unit {
  name: string;
  value: number;
}

const units: Unit[] = [
  { name: "MPGe", value: 33.71 },

  { name: "mi/kWh", value: 1 },
  { name: "Wh/mi", value: 47.6 },
  { name: "kWh/mi", value: 1 },
  { name: "kWh/100mi", value: 100 },

  { name: "km/kWh", value: 1 / 1.609344 },
  { name: "Wh/km", value: 1000 / 1.609344 },
  { name: "kWh/km", value: 1 / 1.609344 },
  { name: "kWh/100km", value: 100 / 1.609344 },
];
const KilometerInAMile = 1.60934;

// Convert the current input to mi/kWh to then convert to all other values
function ToMikWh(event: React.ChangeEvent<HTMLInputElement>) {
  if (!Number.isNaN(event.target.value)) {
    switch (event.target.name) {
      case units[0].name: // MPGe
        ToAllElse(Number(event.target.value) / 33.71);
        break;
      case units[1].name: // mi/kWh, really shouldn't come here but handle it gracefully
        ToAllElse(Number(event.target.value));
        break;
      case units[2].name: // Wh/mi
        ToAllElse(1000 / Number(event.target.value));
        break;
      case units[3].name: // kWh/mi
        ToAllElse(1 / Number(event.target.value));
        break;
      case units[4].name: // kWh/100mi
        ToAllElse(100 / Number(event.target.value));
        break;
      case units[5].name: // km/kWh
        ToAllElse(Number(event.target.value) / KilometerInAMile);
        break;
      case units[6].name: // Wh/km
        ToAllElse((1000 * KilometerInAMile) / Number(event.target.value));
        break;
      case units[7].name: // kWh/km
        ToAllElse(KilometerInAMile / Number(event.target.value));
        break;
      case units[8].name: // kWh/100km
        ToAllElse(100 / (KilometerInAMile * Number(event.target.value)));
        break;
      default:
        return;
    }
  }
}

// Covert all other values based on a known mi/kWh factor
function ToAllElse(mikWhValue: number) {
  units[1].value = mikWhValue;
  units.find((unit) => {
    switch (unit.name) {
      // TODO: if unit.name is selected, return
      case units[0].name: // MPGe
        unit.value = mikWhValue * 33.71;
        break;
      case units[2].name: // Wh/mi
        unit.value = (1 / mikWhValue) * 1000;
        break;
      case units[3].name: // kWh/mi
        unit.value = 1 / mikWhValue;
        break;
      case units[4].name: // kWh/100mi
        unit.value = (1 / mikWhValue) * 100;
        break;
      case units[5].name: // km/kWh
        unit.value = mikWhValue * KilometerInAMile;
        break;
      case units[6].name: // Wh/km
        unit.value = (1000 / mikWhValue) * KilometerInAMile;
        break;
      case units[7].name: // kWh/km
        unit.value = KilometerInAMile / mikWhValue;
        break;
      case units[8].name: // kWh/100km
        unit.value = 100 / KilometerInAMile / mikWhValue;
        break;
    }
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
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(200px,1fr))",
        gap: "10px", // vertical spacing
      }}
    >
      {units.map((unit) => (
        <div key={unit.name} style={{ display: "flex", alignItems: "center" }}>
          <span style={{ marginRight: "5px" }}>{unit.name}:</span>
          <input
            type="number"
            name={unit.name}
            value={unit.value}
            onChange={handleInputChange}
            style={{ width: "100%" }}
          />
        </div>
      ))}
    </div>
  );
}

export default UnitConverter;
