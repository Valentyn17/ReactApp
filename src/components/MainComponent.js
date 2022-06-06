import Menu from './MenuComponent';
import DishDetail from './DishdetailComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Home from './HomeComponent';
import {DISHES} from '../shared/dishes'
import { Component } from 'react';
import {Routes,  Route, Navigate} from 'react-router-dom';

class Main extends Component {
  
  constructor(props){
    super(props);
    this.state={
      dishes: DISHES
    };
  }


  render(){

  return (
    <div >
      <Header />
      <Routes>
       
        <Route exact path='/menu' element={<Menu dishes={this.state.dishes}/>}/>
         <Route path='/home' element={<Home/>}/>
         <Route path="/" element={<Navigate replace to="/home" />} />
      </Routes>
      <Footer/>
    </div>
  );
}
}

export default Main;
