import {applyMiddleware, combineReducers, createStore} from 'redux'
import logger from 'redux-logger'
import thunk from 'redux-thunk'
import axios from 'axios'
const init='account/init'
const inc ='account/increment'
const dec ='account/decrement'
const incByAmt ='account/incrementByAmount'
const decByAmt ='decrementByAmount'
const getAccUserPending='account/getUser/pending'
const getAccUserFulfilled='account/getUser/fulfilled'
const getAccUserRejected='account/getUser/rejected'

const incBonus='bonus/increment'

//store
const store=createStore(
    combineReducers({
        account:accountReducer,
        bonus:bonusReducer
    }),
    applyMiddleware(logger.default,thunk.default))


function accountReducer(state={amount:1},action){

    switch(action.type){
        case getAccUserFulfilled:
            return {amount:action.payload,pending:false}
        case getAccUserRejected:
            return {...state,error:action.error,pending:false}
        case getAccUserPending:
            return {...state,pending:true}
        case inc:
            return {amount:state.amount+1}
        case dec:
            return {amount:state.amount-1}
        case incByAmt:
            return {amount:state.amount+action.payload} 
        case decByAmt:
            return {amount:state.amount-action.payload} 
        default:
            return state;
    }

   
}
function bonusReducer(state={points:0},action){

    switch(action.type){
        case incBonus:
            return {points:state.points+1}
        case incByAmt:
            if(action.payload >=100)
                return {points:state.points+1} 
        default:
            return state;
    }

   
}



const history=[]
// store.subscribe(()=>{ //logger middleware takes care  
//     history.push(store.getState())
// console.log(history)
// }) //whenever state changes this function will be called gives the updated value


//async API call
/*
async function getUser(){
    console.log("get user")
    const {data} =await axios.get('http://localhost:3000/accounts/1')
    console.log(data)
}


getUser()
*/
//Action creaters

function getUserAccount(id){
    return async (dispatch,getState)=>{
        try{
            dispatch(getAccountUserPending())
            const {data} =await axios.get(`http://localhost:3000/accounts/${id}`)
          dispatch(getAccountUserFulfilled(data.amount))
        }catch(error){
        
            dispatch(getAccountUserRejected(error.message))
        }
   
    }
}

function getAccountUserFulfilled(value){
    return {type:getAccUserFulfilled,payload:value}
}

function getAccountUserRejected(error){
    return {type:getAccUserRejected,error:error}
}

function getAccountUserPending(){
    return {type:getAccUserPending}
}

function increment(){
    return {type:inc}
}
function decrement(){
    return {type:dec}
}

function incrementByAmount(value) {
return {type:incByAmt,payload:value}
  }

function decrementByAmount(value) {
return {type:decByAmt,payload:value}
  }

function incrementBonus(value){
 return {type:incBonus}
}




store.dispatch(getUserAccount(1))

//store.dispatch(incrementByAmount(200))
//store.dispatch(incrementBonus())
/*
store.dispatch(initUser(20))   
store.dispatch(increment())
store.dispatch(decrement())


store.dispatch(incrementByAmount(25))  
store.dispatch(decrementByAmount(2))  

*/