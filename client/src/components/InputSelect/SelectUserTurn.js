import React, { useState } from 'react';

export function SelectUserTurn() {
  const [userTurn, setUserTurn] = useState("1");

  console.log('User ', userTurn);
  return (
    <select className="form-select" onChange={(e) => setUserTurn(e.target.value)}>
      <option value="1">1</option>
      <option value="2">2</option>
      <option value="3">3</option>
    </select>
  );
}

export default SelectUserTurn;