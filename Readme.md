A Pattern

A Library

Independent of frameworks

State management in JS

when to use Redux?
Big Applications
High frequency of State Changes

dispatch,state and reducer are in store

action : we manually do

Middlewares
if async calls are present middlewares are used

Q)
import {createStore} from 'redux'
const store=createStore(reducer)

function reducer(state={amount:1},action){
    return state;
}

console.log(store.getState()) //{ amount: 1 }

store.dispatch({type:'increment'})

console.log(store.getState()) //{ amount: 1 }


>>>>>Don't update state in this way <<<<
/*
const store=createStore(reducer)


function reducer(state={amount:1},action){
  if(action.type==='increment'){
      state.amount=state.amount+1

  }

    return state;
}

const history=[]
store.subscribe(()=>{
    history.push(store.getState())
console.log(history)
}) //whenever state changes this function will be called gives the updated value

setInterval(() => {
    store.dispatch({type:'increment'})  
}, 2000);
*/

o/p:
[ { amount: 2 } ]
[ { amount: 3 }, { amount: 3 } ]
[ { amount: 4 }, { amount: 4 }, { amount: 4 } ]
[ { amount: 5 }, { amount: 5 }, { amount: 5 }, { amount: 5 } ]

since object reference is not changing


>>>> correct approach <<<<<<

>>>>>Don't update state in this way <<<<
/*
const store=createStore(reducer)


function reducer(state={amount:1},action){
  if(action.type==='increment'){
   return {amount:state.amount+1} //new object reference

  }

    return state;
}

const history=[]
store.subscribe(()=>{
    history.push(store.getState())
console.log(history)
}) //whenever state changes this function will be called gives the updated value

setInterval(() => {
    store.dispatch({type:'increment'})  
}, 2000);
*/

O/P :=

[ { amount: 2 } ]
[ { amount: 2 }, { amount: 3 } ]
[ { amount: 2 }, { amount: 3 }, { amount: 4 } ]
[ { amount: 2 }, { amount: 3 }, { amount: 4 }, { amount: 5 } ] 

//To host a server using .json file
install a package npm i -g json-server

In terminal:
json-server db.json


//If you use async functions in reducer without using a middleware, it gives error