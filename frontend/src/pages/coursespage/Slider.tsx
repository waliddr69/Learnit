import * as React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import { useEffect } from 'react';

function valuetext(value: number) {
  return `${value}DA`;
}

const minDistance = 0;
type params={
    min:number,
    max:number,
    onChange:(value:number[]|undefined)=>void
}

export default function MinimumDistanceSlider({min,max,onChange}:params) {
  
   

  const [value2, setValue2] = React.useState<number[]>([min, max]);
  
  useEffect(() => {
    setValue2([min, max]);
    }, [min, max]);

    

  const handleChange2 = (_event: Event, newValue: number[], activeThumb: number) => {
   
    if (newValue[1] - newValue[0] < minDistance) {
      if (activeThumb === 0) {
        const clamped = Math.min(newValue[0], max - minDistance);
        setValue2([clamped, clamped + minDistance]);

      } else {
        const clamped = Math.max(newValue[1], minDistance);
        setValue2([clamped - minDistance, clamped]);
      }
    } else {
      setValue2(newValue);
    }
    onChange(newValue)
  };

  return (
    <Box sx={{ width: 300 }}>
      
      <Slider
      min={min}
      max={max}
        getAriaLabel={() => 'Minimum distance shift'}
        value={value2}
        onChange={handleChange2}
        valueLabelDisplay="auto"
        getAriaValueText={valuetext}
        disableSwap
      />
    </Box>
  );
}

