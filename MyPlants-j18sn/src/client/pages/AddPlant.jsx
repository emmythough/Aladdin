import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAction } from '@wasp/actions';
import { useQuery } from '@wasp/queries';
import createPlant from '@wasp/actions/createPlant';
import getUserPlants from '@wasp/queries/getUserPlants';

export function AddPlantPage() {
  const createPlantFn = useAction(createPlant);
  const { data: plants } = useQuery(getUserPlants);
  const [plantName, setPlantName] = useState('');
  const [wateringDays, setWateringDays] = useState(0);

  const handleCreatePlant = () => {
    createPlantFn({ name: plantName, daysTillWatering: wateringDays });
    setPlantName('');
    setWateringDays(0);
  };

  return (
    <div className='p-4'>
      <h1 className='text-2xl font-bold mb-4'>Create a New Plant</h1>
      <div className='mb-4'>
        <label htmlFor='plantName' className='block text-lg font-bold mb-2'>Plant Name:</label>
        <input
          id='plantName'
          type='text'
          placeholder='Enter plant name'
          className='px-3 py-2 border rounded'
          value={plantName}
          onChange={(e) => setPlantName(e.target.value)}
        />
      </div>
      <div className='mb-4'>
        <label htmlFor='wateringDays' className='block text-lg font-bold mb-2'>Watering Days:</label>
        <input
          id='wateringDays'
          type='number'
          placeholder='Enter number of days'
          className='px-3 py-2 border rounded'
          value={wateringDays}
          onChange={(e) => setWateringDays(Number(e.target.value))}
        />
      </div>
      <button
        onClick={handleCreatePlant}
        className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded'
      >
        Create Plant
      </button>
      <div className='mt-4'>
        <Link to='/' className='text-blue-500'>Go back</Link>
      </div>
    </div>
  );
}