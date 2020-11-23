import React from 'react';
import Header from './componnents/header';
import Main from './componnents/main';



class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      category: []
    };
    this.addCategory = this.addCategory.bind(this);
  }

  addCategory(evt) {
    evt.preventDefault()
    let category = this.state.category
    if (evt.target.category.value !== "") {
      category.push(evt.target.category.value)
      this.setState({
        category: category
      });
    }
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
