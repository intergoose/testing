import {useState, useEffect} from 'react'
import {makeVisFlexible, Hint, XYPlot, Crosshair, MarkSeries, LineSeries, LineMarkSeries, VerticalBarSeries, VerticalGridLines, HorizontalGridLines, XAxis, YAxis} from 'react-vis';
import Paper from '@mui/material/Paper';

/*
 * small react projects
 * github: intergoose
*/

const LinePlot = ({values}) => {
    const [index, setIndex] = useState(null)    
    const FlexXYPlot=makeVisFlexible(XYPlot)

  return <>
    <div style={index ? {marginTop:'25px'}:{marginTop:'25px', marginBottom:'26px'}}>
        <div style={{margin:'0 auto'}}>
        <FlexXYPlot
            onMouseLeave={() => setIndex(null)}
             height={300} style={{ fill: 'none', margin:'0 auto' }} xType='ordinal' >
            <XAxis  style={{fill: "#6b6b75", fontFamily: 'Dongle, sans-serif', fontSize: '18px', border:'1px solid black'}} hideLine />
            <LineSeries 
            curve={'curveMonotoneX'}
            color="#389499"
            style={{strokeLinejoin: "round"}}
            onNearestX={(value) => {
                setIndex(value)
            }}
            data={values()} />
            
            {index === null ? null : <LineMarkSeries
            data={[{x: index.x, y: index.y}, {x: index.x, y: 0}]}
            opacity={0.5}
            style={{color:'#dff3fb'}}
            markStyle={{opacity: '0'}}
            />
            }
            {index === null ? null :<LineMarkSeries
            data={[{x: index.x, y: index.y}]}
            style={{color:'#9C27B0', stroke:'#dff3fb', fill:'#b882c1'}}
            />
            }
        </FlexXYPlot>
        </div>
    </div>
    <div>
        <Paper elevation={2} style={{backgroundColor:'#404244', margin:'0 auto', maxWidth:'150px', opacity:'70%'}}><p style={{textAlign:'center', margin:"0", color:'white', fontFamily: 'Dongle, sans-serif', fontSize: '18px'}}>{index?`Amount: ${index.y}`:""}</p></Paper>
    </div>
  </>
};

export default LinePlot;
