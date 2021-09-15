import React,{Component} from 'react';

class Task extends Component{
	state = {};
	markCompleted = () => {
		this.props.markCompleted(this.props.title)
	}
	render(){
		return(
			<div>
				<p style={{padding: '5px 10px', border: '1px solid grey', margin: '10px 5px', textDecoration: this.props.completed ? 'line-through': 'none'}}> {this.props.title}

			{ (!this.props.completed)? <button style={{ marginLeft: '10px'  }}  onClick={this.markCompleted} > Mark Complete </button>: '' }
				</p>
			</div>
		)
	}
}


/*
function Task(props){
	return(
		<p>{props.title} </p>
	)
}
*/

class TaskList extends Component{
	markCompleted = (title) => {
		this.props.markCompleted(title)
	}

	getCompletedTasks = () => this.props.tasks.filter(i => i.completed);
	getInCompletedTasks = () => this.props.tasks.filter(i => !i.completed);
		
	render(){
		return (
			<div>
			<>
			    	{
					this.getInCompletedTasks().length > 0 ?
						<div id="non_completed">
							{ this.getInCompletedTasks().map(taskObject => <Task title={taskObject.task} markCompleted={this.markCompleted} completed={false}  />) }</div>: ''
				}
			</>
			<>
				{
					this.getCompletedTasks().length > 0 ?
					<div id="completed">				
						<div style={{ fontSize: '15px', color: '#344' }} > Completed Tasks </div>
						{ this.getCompletedTasks().map(taskObject => <Task title={taskObject.task} markCompleted={this.markCompleted} completed={true} />) }</div> : ''
				}
			</>
			</div>
			)
	}
}


/*
function TaskList(props){
	return (
		<div>
		{
			props.tasks.map(task => <Task title={task} />)
		}
		</div>
	)
}

*/

class Form extends Component{
	state = { title: ''};

	handleSubmit = (event) => {
		event.preventDefault();
//		alert(this.state.title);
		this.setState({
			title: ''
		})
		this.props.addTask(this.state.title);
	}

	render(){
		return(
			<div align="center">
				<form onSubmit={this.handleSubmit}>
					<input type="text" onChange={event => this.setState({title : event.target.value}) }  value={this.state.title} />
				<button >Add Task </button>
				</form>
			</div>
		);
	}
}

class App extends Component {

  state= {
	tasks: []
  };

  addTask = (task) =>  {
	  
	  this.setState(prevState => ({
		  tasks :  [...prevState.tasks,{ task, completed: false }]
	  }));
	  
/*
	  this.setState({
		  tasks: [{title: 'werwerewr'}]
	  })
	  */

  }

  markCompleted = (title) => {
	this.setState({
		tasks : [...this.state.tasks.map(i => {
			if(i.task === title){
				i.completed = true;
			}
			return i;

		})]
	})
  }

  render()
	{
	  return (
	    <div>
		<header style={{color: '#222', fontSize: '20px', fontWeight: 'bolder', textAlign: 'left', padding: '4px', fontFamily: 'Ariel',textAlign: 'center'}}>
		  <img src="/todo_icon.png" width="17" style={{display: 'inline-block', marginTop: '3px'}} />
		  ToDo List 
		  <hr />
		</header>
		<Form addTask={this.addTask} />
		<TaskList tasks={this.state.tasks} markCompleted={this.markCompleted} />
	    </div>
	  )
	}
 }

export default App;
