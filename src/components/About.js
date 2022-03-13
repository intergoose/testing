import React from 'react';


/*
 * small react projects
 * github: intergoose
*/

const About = () => {
  return <div style={{fontFamily: 'Dongle, sans-serif', fontSize:'20px', margin:'15px'}}>
      <h4>Version 1.0.0</h4>
      <p style={{fontSize:'18px'}}>Expense tracker is a react web application that tracks expenses and categorise them, is gives the users an overview of expenses, and during the whole month and they can also view the amount of expenses they put on each category for the whole month, the users can browse the history of their expenses, update them and delete them and of course add new expenses. </p>
      <a href='/' style={{color:'#7a7d85',textDecoration:'none'}}>Go back</a>
  </div>;
};

export default About;
