import React from 'react';
import Name from './task_components/task_name';
import Category from './task_components/task_category';
import Button from './task_components/task_button';
import ProgressBar from './task_components/progress_bar';
import axios from 'axios';


class task extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id : this.props.id,
            name : this.props.name,
            category : this.props.category,
            status : this.props.status,
            completion: this.props.completion,
            userId: this.props.userId
        };
        this.handler = this.handler.bind(this);
        this.changeCompletion = this.changeCompletion.bind(this);
        this.updateTodo = this.updateTodo.bind(this);
    }

    handler(state) {       
        console.log(state)
        this.setState({status: state}, () => this.progress()) 
    }

    progress() {
        //console.log(this.state)
        if(this.state.status === "complete") {
            this.setState({ completion: "100"}, () => this.updateTodo())
        } else if( this.state.status === "delete") {
            console.log('delete progress')
            this.delete();
        } 
        else {
           this.setState({ completion: this.state.completion }, () => this.updateTodo())
        }
        
    }

    delete() {
        console.log('delte')
    }

    changeCompletion(evt) {
        var sizeTodo = document.querySelector(".progress-bar").clientWidth
        var sizeBrowzer = document.querySelector("#root").clientWidth
        var clickSizeBrowzer = evt.clientX
        //var ratio = sizeTodo/sizeBrowzer 
        //var clickSizeTodo = ((clickSizeBrowzer*sizeTodo)/sizeBrowzer)
        //var percent = (clickSizeTodo/sizeTodo)*100
        //console.log(percent)

        var borderLeft = (sizeBrowzer - sizeTodo) / 2
        var zeroTodo = clickSizeBrowzer - borderLeft
        var percent = ((zeroTodo/sizeTodo)*100)
        this.setState({ completion: Math.round(percent).toString() }, () => this.updateTodo());
        
    }

    updateTodo() {
        //console.log('update')
        axios.post('https://localhost:8000/api/'+this.state.userId+'/update', {
            id: this.state.id,
            name: this.state.name,
            category: this.state.category,
            status: this.state.status,
            completion: this.state.completion
        })
        .then((res) => {
            console.log(res)
        })
        .catch((err) => {
            console.log(err)
        })
    }

    componentDidUpdate() {
        //console.log('update task');
    }
    
    componentDidMount() {
        
    }
    render() {
        var handler = this.handler;
        var classTodo = this.state.status + ' task'
        return(
            <div className={classTodo} data-category="">
                <div className="task__content">
                    <Name value={this.state.name} />
                    <Category value={this.state.category} />
                    <Button handler={handler.bind(this)} id={this.state.id} userId={this.state.userId} status={this.state.status}/>
                </div>
                <div /*onMouseMoveCapture={this.changeCompletion}*/ onClick={this.changeCompletion} className="progress-bar">
                    <ProgressBar completion={this.state.completion}/>
                    <span className="completion">{this.state.completion} %</span>
                </div>
            </div>
        );
    }
}

export default task;