import {useState, useEffect} from 'react'
import LinePlot from './LinePlot'
import moment from 'moment'
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import Chip from '@mui/material/Chip';
import TagFacesIcon from '@mui/icons-material/TagFaces';
import Tooltip from '@mui/material/Tooltip';
import Button from '@mui/material/Button';
import {Hint, XYPlot, Crosshair, MarkSeries, LineSeries, LineMarkSeries, VerticalBarSeries, VerticalGridLines, HorizontalGridLines, XAxis, YAxis} from 'react-vis';


/*
 * small react projects
 * github: intergoose
*/
  
const Balance = ({expenses, getUniqueDate, getUniqueMonth}) => {
  useEffect(() => {
  }, [])
  

    const [selectedChip, setSelectedShip] = useState(0)
    const ListItem = styled('li')(({ theme }) => ({
        margin: theme.spacing(0.5),
    }));
      
    const [chipData, setChipData] = useState([
        { key: 0, label: 'Overview' },
        { key: 1, label: 'Stats' },
    ]);
    
    const Item = styled(Paper)(({ theme }) => ({
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    }));
    const styleSelected = {backgroundColor: '#212445', color: 'white', borderRadius: '16px', fontFamily: 'Dongle, sans-serif', fontSize:'x-large'}
    const nonStyleSelected= {border:'none', color: 'hsl(209deg 18% 61%)', fontFamily: 'Dongle, sans-serif', fontSize:'x-large'}

    const onChipClick = (id) => {
      setSelectedShip(id)
    }

    


    const getUniqueDateAmount = (eps, type=false) => {
      let uniqueDates = getUniqueDate()
      let res = []
      let tempres = 0
      uniqueDates.map((ud) => {
        eps.map((e) => {
          if(e.time.search(ud) !== -1) {
            if (e.expenseType === type)
              tempres = tempres + parseFloat(e.expenseAmount)
          }
        })
        res.push({date: ud, amount: tempres})
        tempres = 0
      })
      
      return res
    }
  
    const range = (start, end) => {
        const length = end - start;
        return Array.from({ length }, (_, i) => start + i);
    }

    const newGetChartData = (eps, month=false) => {
      if (eps == false) {
        return []
      }
      if (month==false) {
        month = moment().format('M/YYYY')
      }
      let uda = getUniqueDateAmount(eps)
      let [m, y] = month.split('/')
      let monthEnd = moment(`${m}/01/${y}`).daysInMonth()
      let dateChunk = range(1, monthEnd+1)
      
      dateChunk = dateChunk.map((elm) => {
        let found = false
        uda.map((e) => {
          let [ud, um, uy] = e.date.split('/')
          if (moment(`${um}/${ud}/${uy}`).isSame(`${m}/${elm}/${y}`)) {
            found = {x: elm, y: e.amount}
          }
        })
        return found? found: {x: elm, y: 0}
      })

      return dateChunk

    }
    
    const getChartData = (eps, duration = 7, type=false) => {
      if (eps == false) {
        return []
      }
      let uda = getUniqueDateAmount(eps, type)
      let [d, m, y] = uda[0].date.split('/')
      // [d, m, y] = [parseInt(d), parseInt(m), parseInt(y)]
      d = parseInt(d)
      let firstDateChunk = range(1, d+1)
      let secondDateChunk = []
      let thirdDateChunk = []
      if (duration === 7 && d<7) {
        secondDateChunk = range(1, moment().subtract(1,'months').daysInMonth()+1)
      }
      if(duration === 'pm') {
        firstDateChunk = []
        secondDateChunk = range(1, moment().subtract(1,'months').daysInMonth()+1)
      }
      if(duration === 'bpm') {
        firstDateChunk = []
        secondDateChunk = []
        thirdDateChunk = range(1, moment().subtract(2,'months').daysInMonth()+1)
      }
  
      firstDateChunk = firstDateChunk.map((elm) => {
        let m = moment().format('MM')
        let found = false
        uda.map((e) => {
          let [ud, um, uy] = e.date.split('/')
          if (moment(`${um}/${ud}/${uy}`).isSame(`${m}/${elm}/${moment().format('YYYY')}`)) {
            found = {x: elm, y: e.amount}
          }
        })
        return found? found: {x: elm, y: 0}
      }).reverse()
  
      secondDateChunk = secondDateChunk.map((elm) => {
        let m = moment().subtract(1,'months').subtract(1,'months').format('MM')
        let found = false
        uda.map((e) => {
          let [ud, um, uy] = e.date.split('/')
          if (moment(`${um}/${ud}/${uy}`).isSame(`${m}/${elm}/${moment().subtract(1,'months').format('YYYY')}`)) {
            found = {x: elm, y: e.amount}
          }
        })
        return found? found: {x: elm, y: 0}
      }).reverse()
  
      thirdDateChunk = thirdDateChunk.map((elm) => {
        let m = moment().subtract(2,'months').format('MM')
        let found = false
        uda.map((e) => {
          let [ud, um, uy] = e.date.split('/')
          if (moment(`${um}/${ud}/${uy}`).isSame(`${m}/${elm}/${moment().subtract(2,'months').format('YYYY')}`)) {
            found = {x: elm, y: e.amount}
          }
        })
        return found? found: {x: elm, y: 0}
      }).reverse()
      
      let wholeChunk = [...firstDateChunk, ...secondDateChunk, ...thirdDateChunk]
   
      if(duration === 7) {
        let res = wholeChunk.splice(0, 8)
        return res.reverse()
      }
      return wholeChunk.reverse()
    }
    
    const oldGetChartData = (duration = 7) => {
      let uda = getUniqueDateAmount()
      let [d, m, y] = uda[0].date.split('/')
      // [d, m, y] = [parseInt(d), parseInt(m), parseInt(y)]
      d = parseInt(d)
      let firstDateChunk = range(1, d+1)
      let secondDateChunk = []
      let thirdDateChunk = []
      if (duration === 7 && d<7) {
        secondDateChunk = range(1, moment().subtract(1,'months').daysInMonth()+1)
      }
      if(duration === 'pm') {
        firstDateChunk = []
        secondDateChunk = range(1, moment().subtract(1,'months').daysInMonth()+1)
      }
      if(duration === 'bpm') {
        firstDateChunk = []
        secondDateChunk = []
        thirdDateChunk = range(1, moment().subtract(2,'months').daysInMonth()+1)
      }
  
      firstDateChunk = firstDateChunk.map((elm) => {
        if (m.length===1)
          return `${elm}/0${m}`
        return `${elm}/${m}`
      }).reverse()
      secondDateChunk = secondDateChunk.map((elm) => {
        let mm = moment().subtract(1,'months').format('MM')
        return `${elm}/${mm}`
      }).reverse()
      thirdDateChunk = thirdDateChunk.map((elm) => {
        let mm = moment().subtract(2,'months').format('MM')
        if (mm.length===1)
          return `${elm}/0${mm}`
        return `${elm}/${mm}`
      }).reverse()
      
      let wholeChunk = [...firstDateChunk, ...secondDateChunk, ...thirdDateChunk]
      wholeChunk = wholeChunk.map((elm) => {
        let finalElm = ""
        let [d, m] = elm.split('/')
        let found = false
        uda.map((e) => {
          let [ud, um, uy] = e.date.split('/')
          if (moment(`${um}/${ud}/${uy}`).isSame(`${m}/${d}/${moment().format('YYYY')}`)) {
            found = {x: elm, y: e.amount}
          }
        })
        return found? found: {x: 0, y: 0}
      })
  
      if(duration === 7) {
        let res = wholeChunk.splice(0, 8)
        console.log(res)
        return res
      }
      
      return wholeChunk
    }
    
    
    return (
      <>
        
        <LinePlot values={() => newGetChartData(expenses)} />
      </>
        
    )
    
    return (
        <Paper
          sx={{
            border: '2px solid green',
            display: 'flex',
            justifyContent: 'center',
            flexWrap: 'wrap',
            listStyle: 'none',
            p: 0,
            m: 0,
            width: '200px'
          }}
          component="ul"
        >
          {chipData.map((data) => {
            let icon;
    
            if (data.label === 'React') {
              icon = <TagFacesIcon />;
            }
    
            return (
              <ListItem key={data.key} style={{margin:'0px'}}>
                <Chip
                  icon={icon}
                  label={data.label}
                  variant='outlined'
                  size="small" 
                //   onDelete={data.label === 'React' ? undefined : handleDelete(data)}
                />
              </ListItem>
            );
          })}
        </Paper>
      );
    
      
    return (
        <Grid container spacing={2}>
        <Grid item xs={6}>
            <Item>xs=8</Item>
        </Grid>
        <Grid item xs={6}>
            <Item>xs=4</Item>
        </Grid>
        </Grid>
    )
}

export default Balance
