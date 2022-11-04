import React from 'react';

import styles from 'Todo/Todo.module.css';

import TodoForm from 'Todo/TodoForm/TodoForm.js';
import TodoItem from 'Todo/TodoItem/TodoItem.js';

import axios from 'axios';

class Todo extends React.Component{
  
    state = {
        
    }


    constructor(props) {
        super(props);
        
        this.state = {
            todolist : [
                // {id: "1", topic: "11 Meet friend for lunc", status: "1"},
                // {id: "2", topic: "Build really cool to", status: "0"},
                // {id: "3", topic: "friend for lunch", status: "0"},
                // {id: "4", topic: "cool todo app", status: "1"},
                // {id: "13", topic: "aa", status: "1"}
            ]           
        }

        this.insertItem     = this.insertItem.bind(this);
        this.deleteItem         = this.deleteItem.bind(this);
        this.itemStatChange     = this.itemStatChange.bind(this);
    }


    componentDidMount(){
        //let url = 'https://backend.todolist.susnathaonline.com/index.php';
        let url = 'http://local.todolist.com/index.php';
        
        axios.get(url)        
        .then(res => {
            console.log(res.data);
            this.setState({
                todolist: res.data
            })
        });

        //console.log()
    }

    itemStatChange(itemKey){
        

        //alert(itemKey);
        
        let tempTodolist = this.state.todolist;

        let indexKey =  tempTodolist.findIndex(({id}) => id == itemKey); 
        //alert(indexKey);

        let oldStat = tempTodolist[indexKey].status;
        let newStat = (oldStat)?false:true;





        let url = 'http://local.todolist.com/index.php';
        //let url = 'https://backend.todolist.susnathaonline.com/index.php';           
                    

        const axiosReturnVal = axios({
            
            method: 'put',
            url: url,
            data: {
                "id"        : itemKey,
                "task"      : "update",
                status      : newStat
            },
            config: { headers: {'Content-Type': 'application/json' }}
        })
        .then(response => {

            console.log(response);
            console.log(response.data);
            console.log(response.data.status);


            if(response.data.status == true){

                tempTodolist[indexKey].status = newStat;

                this.setState({
                    todolist: tempTodolist
                });

            }else{
                alert('DB Error');
            }
            
        })
        .catch(err => {
            // return false;
            console.log(err, err.response);
        });







        //~~~~~~~~~~~~~




        

    }

    deleteItem(DeleteTodoObjKey){

        //alert(DeleteTodoObjKey);

        
        let url = 'http://local.todolist.com/index.php';
        //let url = 'https://backend.todolist.susnathaonline.com/index.php';           
                    

        const axiosReturnVal = axios({
            
            method: 'delete',
            url: url,
            data: {
                "id"        : DeleteTodoObjKey,
                "task"      : "delete"
            },
            config: { headers: {'Content-Type': 'application/json' }}
        })
        .then(response => {

            // console.log(response);
            // console.log(response.data);
            // console.log(response.data.status);


            if(response.data.status == true){

                let tempTodolist = this.state.todolist;
                //console.log(tempTodolist);

                tempTodolist.splice(tempTodolist.findIndex(({id}) => id == DeleteTodoObjKey), 1);    
               
                //console.log(tempTodolist);
                
                this.setState({
                    todolist: tempTodolist
                });

            }else{
                alert('DB Error');
            }
            
        })
        .catch(err => {
            // return false;
            console.log(err, err.response);
        });

    }

    async insertItem(newTodoObj){

        console.log(newTodoObj); 
        var newTodoTopic   = newTodoObj.topic;
        const isTodoExsist = this.state.todolist.some(obj => obj.topic === newTodoTopic);
        

        if(isTodoExsist){

            alert('Item already exsist in the list');
            return false;
                   
        }else{       
            

            
            let url = 'http://local.todolist.com/index.php';
            //let url = 'https://backend.todolist.susnathaonline.com/index.php';           
            

            const axiosReturnVal = axios({
                
                method: 'post',
                url: url,
                data: {
                    "topic"     : newTodoObj.topic,
                    "status"    : newTodoObj.status,
                    "task"      : "insert"
                },
                config: { headers: {'Content-Type': 'application/json' }}
            })
            .then(response => {

                console.log(response);
                console.log(response.data);
                console.log(response.data.status);


                if(response.data.status == true){

                    let todoObj = {
                        topic     : newTodoObj.topic,
                        status    : newTodoObj.status,
                        id        : response.data.id
                    }

                    var newTodolist = [...this.state.todolist,todoObj]
            
                    this.setState({
                        todolist: newTodolist
                    });

                    console.log(this.state.todolist);
                    //add newTodoobj status.todolist 

                }

                return response.data.status;
            })
            .catch(err => {
                return false;
                console.log(err, err.response);
 
            });

            console.log(axiosReturnVal);
          
            //todo clear form 
            return axiosReturnVal;           
        }







    }




    render(){    
        return (
        
        <React.Fragment>
            
                <div className="todo-list">
                    
                    {this.state.todolist.map((list,index) => {
                        
                        return (<TodoItem  item_index={list.id} key={index} 
                                    todoItem={list} todoListItemDelete={this.deleteItem} 
                                    todoListItemStatChange={this.itemStatChange}
                                    />)       
                    })}

                    <p  className={styles.text}>Todo</p>                  
                    
                                       

                    <TodoForm todoListAction={this.insertItem} />
                             
                </div>
            
        </React.Fragment>



        )
    }
}

export default Todo;
