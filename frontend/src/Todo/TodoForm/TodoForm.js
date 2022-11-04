import React from 'react';


import styles from 'Todo/TodoForm/TodoForm.module.css';


class TodoForm extends React.Component{
  
    
   

    constructor(props) {
        super(props);
        

        this.state = {
            typeText : '',           

        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.todoSubmit        = this.todoSubmit.bind(this);

    }


    handleInputChange(event){
        const value = event.target.value;
        //alert(event.target.value);
        //this.state.typeText = event.target.value;

        this.setState({ typeText:value });
        //this.setValue({ typeText: value });
    }


    todoSubmit(event){
        
        const newTodoText = this.state.typeText;
        const newTodoStat = false;

        const newTodoObj = {
            topic  : newTodoText,
            status : newTodoStat
        }

        event.preventDefault();
        let isInserted = this.props.todoListAction(newTodoObj);


        // let isInserted = (async function() {
        //   await this.props.todoListAction(newTodoObj)();
        // })();

        isInserted.then(response => {

            console.log(response);
            //if not duplicate then clear form
            if(response){
                this.setState({ typeText:'' });
            }
        })
        .catch(err => {            
            console.log(err, err.response);
        });
    }
    
  
    render(){    
        return (
            <React.Fragment>
                <p className={styles.text}>TodoForm</p>
                <form onSubmit={this.todoSubmit}>
                    <input type="text" className="input" value={this.state.typeText} onChange={this.handleInputChange}/>
                </form>
            </React.Fragment>
        )
    }


}

export default TodoForm;



