import Menu from './MenuComponent';
import DishDetail from './DishdetailComponent';
import Contact from './ContactComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Home from './HomeComponent';
import About from './AboutComponent';
import { Component } from 'react';
import {Routes,  Route, Navigate, useParams} from 'react-router-dom';
import { withRouter } from '../withRouter';
import {connect} from 'react-redux';

const mapStateToProps=state=>{
  return{
    dishes: state.dishes,
    comments: state.comments,
    leaders: state.leaders,
    promotions: state.promotions
  }
};


class Main extends Component {
  
  constructor(props){
    super(props);
  }

  

  render(){
    const DishWithId = () => {
      let id=parseInt(useParams().dishId,10);
      return(
          <DishDetail dish={this.props.dishes.filter((dish) => dish.id === id)[0]} 
            comments={this.props.comments.filter((comment) => comment.dishId === id)} />
      );
    };
  return (
    <div >
      <Header />
      <Routes> 
         <Route path="/" element={<Navigate replace to="/home" />} />
         <Route path='/home' element={ <Home dish={this.props.dishes.filter((dish)=>dish.featured)[0]}
            promotion={this.props.promotions.filter((promotion)=>promotion.featured)[0]}  
            leader={this.props.leaders.filter((leader)=>leader.featured)[0]}/>}  />
         <Route exact path='/menu' element={<Menu dishes={this.props.dishes}/>}  />
         <Route path='/menu/:dishId' element={<DishWithId/>}  />
         <Route exact path='/contactus' element={<Contact />}/>
         <Route exact path='/aboutus' element={<About leaders={this.props.leaders}/>}/>
      </Routes>
      <Footer/>
    </div>
  );
}
}

export default withRouter(connect(mapStateToProps)(Main));
