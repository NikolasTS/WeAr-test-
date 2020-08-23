const user = require('../models').user;
const task = require('../models').task;
const project = require('../models').project;
const Op = require('../models').Sequelize.Op;
const { Sequelize, sequelize } = require("../models");
const space_cleaner =/^[ \s]+|[ \s]+$/g;

async function create(data){
    try{
        return await user.create(data)
    }
    catch(err){
        throw err;
    }
}

async function find(query, limit, offset){
    return await sequelize.query(
        `SELECT *, COUNT(*) OVER () AS total_count 
        FROM "users" AS "users" 
        WHERE ${query} 
        LIMIT ${limit} OFFSET ${offset} `,{nest: true})
}

function createUserQuery(data){

        let q_array= data.split(",")

        let final_query = "";
        let tmp, kirril;
        
        q_array.forEach(e => {
            e = e.replace(space_cleaner, '');
          if(e.search(/[А-яЁё]/) !== -1){ kirril='_r'}
          else{kirril=''}
      
          final_query+=`("users"."name${kirril}" || ' ' || "users"."surname${kirril}" ILIKE '%${e}%') OR `
      
        })
      
        final_query = final_query.slice(0,-4);
        return final_query
   
}

function isKirill(str){
    return (str.search(/[А-яЁё]/) !== -1) ? true:false    
}

function isLatin(str){
    return (str.search(/[a-zA-Z]/) !== -1) ? true:false    
}



async function addWorker(userId,taskId,type){

    const userX = await user.findByPk(userId);
    if(!userX){
        const err = new Error();
        err.status=400;
        err.message="User not found"
        throw err;
    }

    let obj;
    if(type==='task'){
        obj = await task.findByPk(taskId);
    }
    if(type==='project'){
        obj = await project.findByPk(taskId);
    }
    
    if(!obj){
        const err = new Error();
        err.status=400;
        err.message=`${type} not found`
        throw err;
    }
    

    try{
        await obj.addUser(userX)
    }
    catch(err){
        throw err;
    }

}
module.exports={create, find, createUserQuery,isKirill, addWorker, isLatin}
