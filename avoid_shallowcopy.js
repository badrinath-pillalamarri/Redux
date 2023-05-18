const state={account:{amount:1},bonus:{points:2}}

const newState={account:{...state.account},bonus:{poinst:state.bonus.points+1}}
/*
avoid writing 
const newState={account:state.account,bonus:{poinst:state.bonus.points+1}}
//if you do the following update in one object, it results in another also
*/


console.log(newState,state)
//{ account: { amount: 1 }, bonus: { poinst: 3 } } { account: { amount: 1 }, bonus: { points: 2 } }

state.account.amount=100

console.log(newState,state)









/*
const state={account:{amount:1},bonus:{points:2}}

const newState={account:{...state.account},bonus:{poinst:state.bonus.points+1}}

console.log(newState,state)
//{ account: { amount: 1 }, bonus: { poinst: 3 } } { account: { amount: 1 }, bonus: { points: 2 } }

state.account.amount=100

console.log(newState,state)
// { account: { amount: 1 }, bonus: { poinst: 3 } } { account: { amount: 100 }, bonus: { points: 2 } }
*/