import Menu from './MenuComponent';
import DishDetail from './DishdetailComponent';
import Contact from './ContactComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Home from './HomeComponent';
import About from './AboutComponent';
import { Component } from 'react';
import {Routes,  Route, Navigate, useParams, useLocation} from 'react-router-dom';
import { withRouter } from '../withRouter';
import {connect} from 'react-redux';
import {postComment, fetchDishes, fetchPromos, fetchComments} from '../redux/ActionCreators';
import { actions } from 'react-redux-form';
import {TransitionGroup, CSSTransition} from 'react-transition-group';


const mapStateToProps=state=>{
  return{
    dishes: state.dishes,
    comments: state.comments,
    leaders: state.leaders,
    promotions: state.promotions
  }
};

const mapDispatchToProps=(dispatch)=>({
  fetchDishes: ()=>{dispatch(fetchDishes())},
  resetFeedbackForm: () => { dispatch(actions.reset('feedback'))},
  fetchComments: ()=>{dispatch(fetchComments())},
  fetchPromos: ()=>{dispatch(fetchPromos())},
  postComment: (dishId, rating, author, comment) => dispatch(postComment(dishId, rating, author, comment))
  });

const GetLocation=()=>
{
  return useLocation().key;
}
class Main extends Component {
  
  constructor(props){
    super(props);
  }

  componentDidMount(){
    this.props.fetchDishes();
    this.props.fetchComments();
    this.props.fetchPromos();
    console.log(this.props.location)
  }

  render(){
    const DishWithId = ({match}) => {
      let id=parseInt(useParams().dishId,10);
      return (
        <DishDetail dish={this.props.dishes.dishes.filter((dish) => dish.id === id)[0]}
          isLoading={this.props.dishes.isLoading}
          errMess={this.props.dishes.errMess}
          comments={this.props.comments.comments.filter((comment) => comment.dishId === id)}
          commentsErrMess={this.props.comments.errMess}
          postComment={this.props.postComment} />
      );
    };
    
  return (
    <div >
      <Header />
      <TransitionGroup>
        <CSSTransition key={()=>GetLocation} classNames="page" timeout={300}>
          <Routes>
            <Route path="/" element={<Navigate replace to="/home" />} />
            <Route path='/home' element={
              <Home dish={this.props.dishes.dishes.filter((dish) => dish.featured)[0]}
                dishesLoading={this.props.dishes.isLoading}
                dishesErrMess={this.props.dishes.errMess}
                promosLoading={this.props.promotions.isLoading}
                promosErrMess={this.props.promotions.errMess}
                promotion={this.props.promotions.promotions.filter((promotion) => promotion.featured)[0]}
                leader={this.props.leaders.filter((leader) => leader.featured)[0]} />} />
            <Route exact path='/menu' element={<Menu dishes={this.props.dishes} />} />
            <Route path='/menu/:dishId' element={<DishWithId />} />
            <Route exact path='/contactus' element={<Contact resetFeedbackForm={this.props.resetFeedbackForm} />} />
            <Route exact path='/aboutus' element={<About leaders={this.props.leaders} />} />
          </Routes>
        </CSSTransition>
      </TransitionGroup>
      <Footer />
    </div>
  );
}
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
