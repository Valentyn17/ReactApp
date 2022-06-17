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
import {addComment, fetchDishes} from '../redux/ActionCreators';
import { actions } from 'react-redux-form';



const mapStateToProps=state=>{
  return{
    dishes: state.dishes,
    comments: state.comments,
    leaders: state.leaders,
    promotions: state.promotions
  }
};

const mapDispatchToProps=(dispatch)=>({
  addComment: (dishId, rating, author, comment)=>dispatch(addComment(dishId, rating, author, comment)),
  fetchDishes: ()=>{dispatch(fetchDishes())},
  resetFeedbackForm: () => { dispatch(actions.reset('feedback'))}
  });


class Main extends Component {
  
  constructor(props){
    super(props);
  }

  componentDidMount(){
    this.props.fetchDishes();
  }

  render(){
    const DishWithId = ({match}) => {
      let id=parseInt(useParams().dishId,10);
      return (
        <DishDetail dish={this.props.dishes.dishes.filter((dish) => dish.id === id)[0]}
          isLoading={this.props.dishes.isLoading}
          errMess={this.props.dishes.errmess}
          comments={this.props.comments.filter((comment) => comment.dishId === id)}
          addComment={this.props.addComment} />
      );
    };


  return (
    <div >
      <Header />
      <Routes>
        <Route path="/" element={<Navigate replace to="/home" />} />
        <Route path='/home' element={
          <Home dish={this.props.dishes.dishes.filter((dish) => dish.featured)[0]}
            dishesLoading={this.props.dishes.isLoading}
            dishesErrMess={this.props.dishes.errmess}
            promotion={this.props.promotions.filter((promotion) => promotion.featured)[0]}
            leader={this.props.leaders.filter((leader) => leader.featured)[0]} />} />
        <Route exact path='/menu' element={<Menu dishes={this.props.dishes} />} />
        <Route path='/menu/:dishId' element={<DishWithId />} />
        <Route exact path='/contactus' element={<Contact resetFeedbackForm={this.props.resetFeedbackForm} />} />
        <Route exact path='/aboutus' element={<About leaders={this.props.leaders} />} />
      </Routes>
      <Footer />
    </div>
  );
}
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
