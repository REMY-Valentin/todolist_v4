import React from 'react';
import Header from './componnents/header';
import Main from './componnents/main';
import axios from 'axios';
//import { all } from 'core-js/fn/promise';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allCategory: [],
      userId: ""
    };
    this.addCategory = this.addCategory.bind(this);
    this.loadCategory = this.loadCategory.bind(this);
    this.deleteCategory = this.deleteCategory.bind(this);
  }

  addCategory(evt) {
    evt.preventDefault()
    var data = evt.target.category.value
    if (data !== "") {
      //console.log(evt.target.category.value)
      
      this.setState(prevState => ({
        allCategory: [...prevState.allCategory, data]
      }), () => this.sendCategory(data));
      
    }
    console.log(evt.querySelector('input'))
    
  }

  sendCategory(category) {
    axios.post('https://localhost:8000/api/category/'+this.state.userId+'/add', {
        name: category
    })
    .then((res) => {
        console.log(res.data)
    })
    .catch((err) => {
        console.log(err)
    })
  }

  loadCategory(userData) {

    axios.get('https://localhost:8000/api/category/'+userData)
    .then((res) => {
        //console.log(res.data)
        this.setState({allCategory: res.data})
        
    })
    .catch((err) => {
        console.log(err)
    })
  }

  deleteCategoryApi(id) {
    
    axios.post('https://localhost:8000/api/category/'+this.state.userId+'/update', {
      id: id
    })
    .then((res) => {
        //console.log(res)
    })
    .catch((err) => {
        console.log(err)
    })
  }

  dropdown() {
   let dropdown = document.querySelector('.dropdown')
   dropdown.classList.toggle('is-active')
   dropdown.querySelector('button').classList.toggle('is-info')
  }

  deleteCategory(evt) {
    let allCat = this.state.allCategory
    const index = evt.target.dataset.id
    allCat.splice(index, 1)
    //console.log(index)
    //this.deleteCategory(index)
    this.setState({
      allCategory: allCat
    }, () => this.deleteCategoryApi(index))
  }

  componentDidMount() {
    //go fetch info on the template
    
    var userDataDiv = document.querySelector('.js-user-info');
    var userData = [userDataDiv.dataset.id, userDataDiv.dataset.email];
    
    this.setState({
        userId: userData[0]
    },() => this.loadCategory(this.state.userId))
    
  }

  componentDidUpdate() {
    //console.log('update app');
  }

  render() {
    const category = []
    for(let i = 0; i < this.state.allCategory.length; i++) {
      category.push(
        <div key={i} className="dropdown-item">
          <p className="category-name">{ this.state.allCategory[i] } </p> <i data-id={i} onClick={this.deleteCategory} className="fa fa-trash" aria-hidden="true"></i>
        </div>
      )
    }
    return (
      <div className="container"> 
        <Header allCategory = {this.state.allCategory} />
        <Main allCategory = {this.state.allCategory} userId = {this.state.userId}/>
        <div className="addCategory">
          <form onSubmit={this.addCategory} name="addCategory">
            <input type="text" className="input" name="category" placeholder="Catégorie"/>
            <button className="task__content__button__add button is-info"><i className="fa fa-plus"></i>Ajouter</button>
          </form>
          
          <div className="dropdown" >
            <div className="dropdown-trigger">
              <button className="button" aria-haspopup="true" aria-controls="dropdown-menu2" onClick={this.dropdown}>
                <span>Categories</span>
                <span className="icon is-small">
                  <i className="fa fa-arrow-down" aria-hidden="true"></i>
                </span>
              </button>
            </div>
            <div className="dropdown-menu" id="dropdown-menu2" role="menu">
              { category }
            </div>
          </div>

        </div>
      </div>
    );
  }
}

export default App;
