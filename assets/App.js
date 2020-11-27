import React from 'react';
import Header from './componnents/header';
import Main from './componnents/main';
import axios from 'axios';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      category: [],
      userId: ""
    };
    this.addCategory = this.addCategory.bind(this);
    this.loadCategory = this.loadCategory.bind(this);
  }

  addCategory(evt) {
    evt.preventDefault()
    let category = this.state.category
    if (evt.target.category.value !== "") {
      category.push(evt.target.category.value)
      this.setState({
        category: category
      }, () => this.sendCategory(evt.target.category.value));
    }
  }

  sendCategory(category) {
    axios.post('https://localhost:8000/api/'+this.state.userId+'/add', {
        name: category
    })
    .then((res) => {
        console.log(res.data)
    })
    .catch((err) => {
        console.log(err)
    })
  }

  async loadCategory(userData) {

    axios.get('https://localhost:8000/api/category/'+userData)
    .then((res) => {
        console.log(res.data)
        for (let i = 0; i < res.data.length; i++) {
            this.setState(prevState => ({
                category: [...prevState.category, res.data[i]]
            }))
        }
    })
    .catch((err) => {
        console.log(err)
    })
  }

  componentDidMount() {
    //go fetch info on the template
    
    var userDataDiv = document.querySelector('.js-user-info');
    var userData = [userDataDiv.dataset.id, userDataDiv.dataset.email];
    this.loadCategory(userData[0])
    this.setState({
        userId: userData[0]
    })
    
}

  render() {
    return (
      <div className="container"> 
        <Header category = {this.state.category} />
        <Main category = {this.state.category} />
        <div className="addCategory">
          <form onSubmit={this.addCategory} name="addCategory">
            <input type="text" className="input" name="category" placeholder="Catégorie"/>
            <button className="task__content__button__add button is-info"><i className="fa fa-plus"></i>Ajouter</button>
          </form>
        </div>
      </div>
    );
  }
}

export default App;
