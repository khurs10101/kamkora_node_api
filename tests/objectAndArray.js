const { use } = require("passport")

let user={
    name: "hello", age: 18, address: "guwahati"
}

for(let i in user){
    console.log(i)
}

console.log(user)