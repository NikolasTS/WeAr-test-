const { Sequelize, sequelize } = require("../models");
const task = require('../models').task;
const project = require('../models').project;
const user = require('../models').user;
const Op = require('../models').Sequelize.Op;


async function create(data){

    const userX = await user.findByPk(data.authorId);
    if(!userX){
        const err = new Error();
        err.status=400;
        err.message="User not found"
        throw err;
    }

    const projectX = await project.findByPk(data.projectId);
    if(!projectX){
        const err = new Error();
        err.status=400;
        err.message="Project not found"
        throw err;
    }

    try{
        const taskX =  await task.create(data);
        await projectX.addTask(taskX);
        await taskX.addUser(userX, { through: { author: true } });
        return taskX;
    }
    catch(err){
        const e = new Error();
        e.status=400;
        e.message=err.message;
        throw err;
    }

}

async function addWorker(taskId,userId){

    const taskX = await task.findByPk(taskId);
    if(!taskX){
        const err = new Error();
        err.status=400;
        err.message="Task not found"
        throw err;
    }

    const userX = await user.findByPk(userId);
    if(!userX){
        const err = new Error();
        err.status=400;
        err.message="User not found"
        throw err;
    }

    try{
        await taskX.addUser(userX)
    }
    catch(err){
        throw err;
    }

}

async function find(data, limit, offset){

       return await sequelize.query(
        `
        SELECT *, LAST_VALUE("k"."total_count") OVER()  AS total FROM
        (SELECT DISTINCT "task"."id", "task"."name", "task"."description", "task"."status", "task"."mark",
            DENSE_RANK() OVER(ORDER BY "task"."id") AS "total_count"
            FROM "tasks" AS  "task"
            INNER JOIN ( "task_workers" AS "users->taskWorker" INNER JOIN "users" AS "users" ON "users"."id" = "users->taskWorker"."user_id")
            ON "task"."id" = "users->taskWorker"."task_id" 
            AND ${data.user}
            WHERE (
                    (${data.query})
                AND (${data.status})
                AND (${data.mark})
            ) 
            ORDER BY "task"."id")
            AS "k"
            LIMIT ${limit} OFFSET ${offset}
        `,{nest: true})
        

}

module.exports={create,addWorker, find}

