import Menu from './MenuComponent';
import DishDetail from './DishdetailComponent';
import Contact from './ContactComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Home from './HomeComponent';
import {DISHES} from '../shared/dishes';
import {COMMENTS, Comments} from '../shared/comments';
import {PROMOTIONS} from '../shared/promotions';
import {LEADERS} from '../shared/leaders';
import { Component } from 'react';
import {Routes,  Route, Navigate} from 'react-router-dom';

class Main extends Component {
  
  constructor(props){
    super(props);
    this.state={
      dishes: DISHES,
      comments: COMMENTS,
      leaders: LEADERS,
      promotions: PROMOTIONS
    };
  }


  render(){

  return (
    <div >
      <Header />
      <Routes> 
         <Route path='/home' element={ <Home dish={this.state.dishes.filter((dish)=>dish.featured)[0]}
            promotion={this.state.promotions.filter((promotion)=>promotion.featured)[0]}  
            leader={this.state.leaders.filter((leader)=>leader.featured)[0]}/> }/>
         <Route path="/" element={<Navigate replace to="/home" />} />
         <Route exact path='/menu' element={<Menu dishes={this.state.dishes}/>}/>
         <Route exact path='/contactus' element={<Contact />}/>
      </Routes>
      <Footer/>
    </div>
  );
}
}

export default Main;
