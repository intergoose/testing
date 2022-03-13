import {BrowserRouter as Router, Route, Routes} from "react-router-dom"

/*
 * small react projects
 * github: intergoose
*/

const Footer = () => {
    return (
        <div
            style={{
                fontFamily: 'Dongle, sans-serif',
                fontSize:'20px', textAlign:'center',
                color:'#2c4c6b',borderTop: '2px solid lightgrey',
                backgroundColor: '#f7f7f7',
                marginTop:'24px'
            }}>
            <p>Expense Tracker | Copyright &copy; 2022</p>
            <a href="/about" style={{color:'#7a7d85',textDecoration:'none'}}>About</a>
        </div>
    )
}

export default Footer
