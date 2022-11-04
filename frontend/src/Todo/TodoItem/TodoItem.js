import React from 'react';

import styles from 'Todo/TodoItem/TodoItem.module.css';


class TodoItem extends React.Component{
  
    constructor(props) {
        super(props);
         
        this.state = {
               
        }

        // console.log(props);
        this.delete        = this.delete.bind(this);
        this.changeStatus  = this.changeStatus.bind(this);
    }


    delete(){
        //get by key

        //deleteItem = 
        let item_index = this.props.item_index;
        //console.log(this.props.item_index);
        this.props.todoListItemDelete(item_index);

    }

    changeStatus(){
        let item_index = this.props.item_index;
        //alert(item_index);
        this.props.todoListItemStatChange(item_index)
    }





    render(){ 

        //console.log(this.props.todoItem.topic);
        //console.log(this.props.todoItem.topic);
        // {this.props.todoItem.topic}

        var statClass = this.props.todoItem.status?'line-through':'';
        var btnText   = (this.props.todoItem.status)?'Pending':'Complete';
        //console.log(statClass); 

        // style={{ textDecoration: todo.isCompleted ? "line-through" : "" }}
        
        return (        
            <React.Fragment>
                <div className="todo" style={{textDecoration:statClass}}>{this.props.todoItem.topic}
                    <div>
                    <button className={styles.statBtn} onClick={this.changeStatus}>{btnText}</button><button onClick={this.delete}>x</button>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default TodoItem;
