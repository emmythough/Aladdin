import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAction } from '@wasp/actions';
import createPlant from '@wasp/actions/createPlant';

export function AddPlant() {
  const createPlantFn = useAction(createPlant);
  const [plantName, setPlantName] = useState('');
  const [wateringFrequency, setWateringFrequency] = useState(0);

  const handleAddPlant = () => {
    createPlantFn({ name: plantName, wateringFrequency });
    setPlantName('');
    setWateringFrequency(0);
  };

  return (
    <div className='p-4'>
      <input
        type='text'
        placeholder='Plant name'
        className='px-1 py-2 border rounded text-lg'
        value={plantName}
        onChange={(e) => setPlantName(e.target.value)}
      />
      <input
        type='number'
        placeholder='Watering frequency (in days)'
        className='px-1 py-2 border rounded text-lg'
        value={wateringFrequency}
        onChange={(e) => setWateringFrequency(parseInt(e.target.value))}
      />
      <button
        onClick={handleAddPlant}
        className='bg-green-500 hover:bg-green-700 px-2 py-2 text-white font-bold rounded'
      >
        Add Plant
      </button>
      <Link to='/' className='ml-4 text-blue-500'>Back to Home</Link>
    </div>
  );
}