const bcryptjs = require('bcryptjs')

const users = [
    {
        name:'Jasmeet',
        email:'user@example.com',
        password : bcryptjs.hashSync('123456' , 10),
        phone:1234455667,
        college:'GTBIT',
        city:'delhi'
    },
    {
        name:'Preet',
        email:'user2@example.com',
        password : bcryptjs.hashSync('123456' , 10),
        phone:111111111,
        college:'GTBIT',
        city:'delhi'
    },
    {
        name:'User3',
        email:'user3@example.com',
        password : bcryptjs.hashSync('123456' , 10),
        phone:333333333333,
        college:'GTBIT',
        city:'delhi'
    }
]

module.exports.users = users;