import React from 'react';
import Task from './task/task';
//import userData from '../index';




class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            allCategory: this.props.category,
            category: "",
            status: "",
            numberOfTask : 0
        };

        this.handleName = this.handleName.bind(this);
        this.handleCategory = this.handleCategory.bind(this);
        this.add = this.add.bind(this);
    }

    add(event) {
        event.preventDefault();
        this.setState({
            numberOfTask: this.state.numberOfTask + 1 
        });
        event.target.querySelector("input").value = ""
        
    }

    handleName(event) {
        this.setState({name: event.target.value});
    }

    handleCategory(event) {
        this.setState({category: event.target.value});
    }

    componentDidMount() {
        //go fetch info on the template
        var userDataDiv = document.querySelector('.js-user-info');
        var userData = [userDataDiv.dataset.id, userDataDiv.dataset.email];
        console.log(userData)
        //fetch data on the api side
        console.log('fetch');
        fetch('https://localhost:8000/api/'+userData[0])
        .then(function(response) {
            if (response.status !== 200) {
                console.log('erreur fetch todos');
                return;
            }
            response.json().then(function(data) {
                console.log(data);
            })
        })
        .catch(function(err) {
            console.log(err);
        })
    }

    
    render() {       
        const task = []
        for (let i = 0; i < this.state.numberOfTask; i++) {
            if(!this.state.numberOfTask !== 0) {
                task.push(<li> <Task 
                    name= {this.state.name}
                    category={this.state.category}
                    status= "incomplete"
                /> </li>)
            }
        }

        const category = []
        for (let i = 0; i < this.state.allCategory.length; i++) {
            category.push(
                <option value = {this.state.allCategory[i]}> {this.state.allCategory[i]} </option>
            )
        }
        

        return (
            <div>
                <ul>
                    {task}
                </ul>
                <div className="task task--add">
                    <form onSubmit={this.add}>
                        <div className="task__content">
                        <div className="task__content__name">
                            <input className="input" type="text" placeholder="Nom de la tâche" name="name" onChange={this.handleName} />
                        </div>
                        <div className="task__content__category">
                            <div className="select is-small">
                            <select onChange={this.handleCategory}>
                                <option>Choisir une catégorie</option>
                                {category}
                            </select>
                            </div>
                        </div>
                        <div className="task__content__buttons">
                            <button type="submit" className="task__content__button__add button is-info">
                            <span className="icon is-small">
                                <i className="fa fa-plus"></i>
                            </span>
                            <span>Ajouter</span>
                            </button>
                        </div>
                        </div>
                    </form>
                </div>
            </div>   
        );
    }
}

export default Main;