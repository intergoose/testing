import { useState, useEffect } from 'react'
import Chip from '@mui/material/Chip'
import { styled } from '@mui/material/styles'
import { textAlign } from '@mui/system';

/*
 * small react projects
 * github: intergoose
*/

const Nav = ({selectedChip, setSelectedShip}) => {
    
    const ListItem = styled('li')(({ theme }) => ({
        margin: theme.spacing(0.5),
    }));
      
    const [chipData, setChipData] = useState([
        { key: 0, label: 'Overview' },
        { key: 1, label: 'Stats' },
    ]);
    
    const styleSelected = {backgroundColor: '#212445', color: 'white', borderRadius: '16px', fontFamily: 'Dongle, sans-serif', fontSize:'x-large'}
    const nonStyleSelected= {border:'none', color: 'hsl(209deg 18% 61%)', fontFamily: 'Dongle, sans-serif', fontSize:'x-large'}

    const onChipClick = (id) => {
      setSelectedShip(id)
    }
  return <div style={{padding: '10px', textAlign:'center'}}>
  <span style={{border: '1px solid hsl(210deg 14% 95%)', borderRadius: '16px', padding: '4px 0 7px 0'}} >
    {chipData.map((chip) => (
        <Chip
            // className="ChipSelected"
            label={chip.label}
            key={chip.key}
            variant="outlined"
            style={chip.key==selectedChip? styleSelected : nonStyleSelected}
            onClick={() => onChipClick(chip.key)}
            // variant='outlined'
        />
    ))}   
  </span>
</div>;
};

export default Nav;
