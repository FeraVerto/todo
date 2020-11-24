import React, {useState} from 'react';
import './App.css';
import TodoList from "./TodoList";
import {AlternativeTODO} from "./AlternativeTODO/AlternativeTODO";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

//Вводим понятие тодо листа
type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type FilterValuesType = 'all' | 'active' | 'completed'

type TaskStateType = {
    [key: string]: Array<TaskType>
}

function App() {

    const todoListID1 = v1()
    const todoListID2 = v1()

    let [todoLists, setTodoLists] = useState<Array<TodoListType>>([
        {id: todoListID1, title: "What to Learn", filter: "all"},
        {id: todoListID2, title: "What to Buy", filter: "all"}
    ])

    let [tasks, setTasks] = useState<TaskStateType>({
        [todoListID1]: [
            {id: v1(), title: "React", isDone: false},
            {id: v1(), title: "HTML", isDone: false},
            {id: v1(), title: "CSS", isDone: false},
            {id: v1(), title: "JS", isDone: true}
        ],

        [todoListID2]: [
            {id: v1(), title: "Dog", isDone: false},
            {id: v1(), title: "Cat", isDone: true},
            {id: v1(), title: "Horse", isDone: true},
            {id: v1(), title: "Rabbit", isDone: true}
        ]
    })

    function changeTaskTitle(title: string, todoListID: string, taskID: string) {
        let todoListTasks = tasks[todoListID];
        let task = todoListTasks.find(t => t.id === taskID)
        if (task) {
            task.title = title
            setTasks({...tasks});
        }
    }

    function changeTodoListTitle(id: string, title: string) {
        let todoList = todoLists.find(tl => tl.id === id)
        if (todoList) {
            todoList.title = title
            setTodoLists([...todoLists])
        }
    }

    function removeTask(taskID: string, todoListID: string) {
        const todoListTasks = tasks[todoListID]
        tasks[todoListID] = todoListTasks.filter(task => task.id !== taskID)
        setTasks({...tasks})
    }

    /*Добавляем новую таску*/
    function addTask(title: string, todoListID: string) {
        const newTask: TaskType = {id: v1(), title: title, isDone: false};
        /*const todoList = tasks[todoListID]*/
        tasks[todoListID] = [newTask, ...tasks[todoListID]]
        setTasks({...tasks});
    }

    function changeFilter(newFilterValue: FilterValuesType, todoListID: string) {
        const todoList = todoLists.find(tl => tl.id === todoListID)
        if (todoList) {
            todoList.filter = newFilterValue
            setTodoLists([...todoLists])
        }
    }

    function changeTaskStatus(taskID: string, isDone: boolean, todoListID: string) {
        const todoListTasks = tasks[todoListID]

        //find возвращает ссылку на обьект и изменения делают прямо в стейте
        const task: TaskType | undefined = todoListTasks.find(t => t.id === taskID)
        if (task) {
            task.isDone = isDone
            setTasks({...tasks});
        }
    }

    function removeTodoList(todoListID: string) {
        setTodoLists(todoLists.filter(tl => tl.id !== todoListID))
        delete tasks[todoListID]
        setTasks({...tasks})
    }

    /*--------------------------------------------------------------------------------*/
    //пробую добавить лист для тасок
    let addTodoList = (title: string) => {
        let todoListItem: TodoListType = {id: v1(), title: title, filter: 'all'}
        setTodoLists([todoListItem, ...todoLists]);
        tasks[todoListItem.id] = [];
        setTasks({...tasks});
    }
    /*--------------------------------------------------------------------------------*/

    console.log(tasks)
    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed={true}>
                <Grid container style={{padding: "20px 0"}}>
                    <AddItemForm addItem={addTodoList}/>
                </Grid>
                <Grid container spacing={3}>
                    {
                        todoLists.map(tl => {
                            let tasksForTodoList = tasks[tl.id]
                            if (tl.filter === 'active') {
                                tasksForTodoList = tasks[tl.id].filter(task => task.isDone === false);
                            }
                            if (tl.filter === 'completed') {
                                tasksForTodoList = tasks[tl.id].filter(task => task.isDone === true);
                            }
                            return <Grid item>
                                <Paper elevation={15} style={{padding:"20px"}}>
                                    <TodoList key={tl.id}
                                              id={tl.id}
                                              title={tl.title}
                                              tasks={tasksForTodoList}
                                              removeTask={removeTask}
                                              changeFilter={changeFilter}
                                              addTask={addTask}
                                              changeTaskStatus={changeTaskStatus}
                                              filter={tl.filter}
                                              removeTodoList={removeTodoList}
                                              changeTaskTitle={changeTaskTitle}
                                              changeTodoListTitle={changeTodoListTitle}
                                    />
                                </Paper>
                            </Grid>
                        })
                    }
                </Grid>
            </Container>
        </div>
    );
}

export default App;

/*data binding привязка интерфейса к слою данных*/
/*CRUD
* -create
* -update
* -read
* -delete*/

/*function TaskFilter() {
let tasksForTodoList = tasks
if (filter === 'active') {
tasksForTodoList = tasks.filter(task => task.isDone === false);
}
if (filter === 'completed') {
tasksForTodoList = tasks.filter(task => task.isDone === true);
}
}*/

/*    const [tasks, setTasks] = useState<Array<TaskType>>([
{id: v1(), title: "React", isDone: false},
{id: v1(), title: "HTML", isDone: false},
{id: v1(), title: "CSS", isDone: true},
{id: v1(), title: "JS", isDone: true},
{id: v1(), title: "SASS", isDone: true}
]
)

const [filter, setFilter] = useState<FilterValuesType>('all');*/



