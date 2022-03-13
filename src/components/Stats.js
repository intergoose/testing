import {useState, useEffect} from 'react'
import moment from 'moment'
import {makeVisFlexible, Hint, XYPlot, Crosshair, MarkSeries, LineSeries, LineMarkSeries, VerticalBarSeries, VerticalGridLines, HorizontalGridLines, XAxis, YAxis} from 'react-vis';
import Paper from '@mui/material/Paper';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import {styled} from '@mui/material/styles';
import LinePlot from './LinePlot';
import History from './History'
import {Sunburst} from 'react-vis';
import CanvasJSReact from '../canvasjs.react'



/*
 * small react projects
 * github: intergoose
*/

const Stats = ({getUniqueDate, getUniqueMonth, expenses, updateExpense, deleteExpense}) => {

  var CanvasJSChart = CanvasJSReact.CanvasJSChart

  const [tab, setTab] = useState(0)

  const handleTab = (event, newValue) => {
    setTab(newValue);
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

  

  const getDataPoints = (m) => {
    let [mm, yy] = m.split('/')
    let porcents = {}
    let total = 0
    expenses.map(e => {
      e.time = e.time.split(' ')[0]
      if(e.time.search(`/${m}`) != -1) {
        if(e.expenseCategory in porcents) {
          porcents[e.expenseCategory] = parseFloat(porcents[e.expenseCategory])+ parseFloat(e.expenseAmount)
          total = total + parseFloat(e.expenseAmount)
          return
        }
        porcents[e.expenseCategory] = e.expenseAmount
        total = total + parseFloat(e.expenseAmount)
        return
      }
    })
    let dp = []
    for (const [key, value] of Object.entries(porcents)) {
      let point = { name: key, y: parseInt((parseFloat(value)*100)/total) }
      dp.push(point)
    }

    return {
      animationEnabled: true,
      subtitles: [{
        verticalAlign: "center",
        fontSize: 10,
        fontFamily: 'Dongle, sans-serif',
        dockInsidePlotArea: true
      }],
      legend: {
        fontFamily: 'Dongle, sans-serif',
        fontSize: 18
      },
      height:260,
      data: [{
        type: "doughnut",
        showInLegend: true,
        indexLabel: "{name}: {y}",
        yValueFormatString: "#,###'%'",
        fontFamily: 'Dongle, sans-serif',
        fontSize:10,
        indexLabelFontSize: 20,
        indexLabelFontFamily: 'Dongle, sans-serif',
        dataPoints: dp
      }]
    }
  }
  return <div style={{marginTop:'20px'}}>
      <div>
        <Tabs
          value={tab}
          onChange={handleTab}
          variant="scrollable"
          scrollButtons
          allowScrollButtonsMobile
          aria-label="scrollable force tabs example"
          style={{maxWidth:'450px', margin:'0 auto', fontFamily: 'Dongle, sans-serif',fontSize:'15px'}}
        >
        {getUniqueMonth().map(m => {
          let [mm, yy] = m.split('/')
          if(moment().format('YYYY') == yy) {
            return <Tab style={{fontFamily: 'Dongle, sans-serif',fontSize:'20px'}} label={moment(`${mm}/01/${yy}`).format('MMMM')} />
          }
          return <Tab style={{fontFamily: 'Dongle, sans-serif',fontSize:'20px'}} label={m} />
        })}
        </Tabs>
      </div>
      {getUniqueMonth().map((m,index) => {
        let [mm, yy] = m.split('/')
        if (tab == index) {
          return <>
            {/* <h2 style={{ marginBottom:'0px', fontFamily: 'Dongle, sans-serif', fontSize:'35px', color:'#5a595c'}}>{moment(`${mm}/01/${yy}`).format('MMM YYYY')}</h2> */}
            {/* <hr style={{border:'2px solid', color:'#5a595c'}}/> */}
            
            <LinePlot values={() => newGetChartData(expenses, m)} />
            <CanvasJSChart style={{fontFamily:'Dongle, sans-serif', fontSize:'15px'}} options={getDataPoints(m)}/>
            <History specificMonth={m} expenses={expenses} deleteExpense={deleteExpense} updateExpense={updateExpense} getUniqueDate={getUniqueDate} />
          </>
        }
      })}
      
  </div>;
};

export default Stats;
