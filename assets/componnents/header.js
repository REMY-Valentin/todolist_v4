import React from 'react';
import categrory from './task/task_components/task_category';




class header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            category: this.props.category,
            filter: "Toutes"
        }
    }
    
    status(evt) {
        //console.log(evt.target.outerText)
        //console.log(evt.target.className)
        let allButton = document.querySelector(".filters-bar__element")
        let currentSelected = allButton.querySelector(".is-selected")
        //change the button
        currentSelected.className = "button"
        evt.target.className = "button is-info is-selected"
        //change the todos
        var button = evt.target.outerText
        //console.log(button)
        var todoIncomplete = document.querySelectorAll(".incomplete")
        var todoComplete = document.querySelectorAll(".complete")
        var todoAll = document.querySelectorAll('.task')
        //console.log(todoToHide)
        if(button === "Complètes") {
            for(let i = 0; i < todoIncomplete.length; i++) {
                todoIncomplete[i].style.display = "none"
            }
            for(let i = 0; i < todoComplete.length; i++) {
                todoComplete[i].style.display = "block"
            }
        } else if(button === "Incomplètes") {
            for(let i = 0; i < todoIncomplete.length; i++) {
                todoIncomplete[i].style.display = "block"
            }
            for(let i = 0; i < todoComplete.length; i++) {
                todoComplete[i].style.display = "none"
            }
        } else {
            for(let i = 0; i < todoAll.length-1; i++) {
                todoAll[i].style.display = "block"
            }
        }
        
    }

    changeCategory(evt) {
        //console.log(evt.target.value)
        var categorySelected = evt.target.value
        var todo = document.querySelectorAll('.task')
        for( let i = 0; i < todo.length-1; i++) { //-1 to remove the div add from the array cause we don't want to remove it
            var category = todo[i].querySelector('.task__content__category p').innerHTML 
            if (categorySelected === 'all') {
                todo[i].style.display = 'block'
            } else if (category !== categorySelected) {
                todo[i].style.display = "none"
            } else {
                todo[i].style.display = "block"
            }
        }
    }

    
    
    render() {
        const category = []
        for (let i = 0; i < this.state.category.length; i++) {
            category.push(
                <option value = {this.state.category[i]}> {this.state.category[i]} </option>
            )
        }

        return (
            <div className="header">
                <div className="logo">
                    <a href="./">
                        <h1 className="title is-1">TodoList</h1>
                    </a>
                </div>
                <div>
                    <a href="/logout" className="button">Logout</a>
                </div>
                <div className="filters-bar">
                    <div className="filters-bar__element buttons are-small has-addons">
                        <button onClick={this.status} className="button is-info is-selected">Toutes</button>
                        <button onClick={this.status} className="button">Complètes</button>
                        <button onClick={this.status} className="button">Incomplètes</button>
                    </div>
                    <div className="filters-bar__element task__content__category select is-small">
                        <select onChange={this.changeCategory} >
                            <option value='all'>Toutes les catégories</option>
                            {category}
                        </select>
                    </div>
                    
                </div>
            </div>
        );
    }
}



export default header;