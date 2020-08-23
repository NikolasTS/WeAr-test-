const project = require('../models').project;
const user = require('../models').user;
const task = require('../models').task;
const { Sequelize, sequelize } = require("../models");
const Op = require('../models').Sequelize.Op;

async function create(data){

    //Check if we have such User
    const userX = await user.findByPk(data.authorId);
    if(!userX){
        const err = new Error();
        err.status=400;
        err.message="User not found"
        throw err;
    }

    //Create project and set his author
    try{
        const projectX =  await project.create(data);
        await projectX.addUser(userX, { through: { author: true } });
        return projectX;
    }
    catch(err){
        const e = new Error();
        e.status=400;
        e.message=err.message;
        throw err;
    }


}

async function addWorker(projectId,userId){

    const projectX = await project.findByPk(projectId);
    if(!projectX){
        const err = new Error();
        err.status=400;
        err.message="Project not found"
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
        await projectX.addUser(userX)
    }
    catch(err){
        throw err;
    }

}

async function find(data, limit, offset){

   return await sequelize.query(
    `   SELECT *, LAST_VALUE("k"."total_count") OVER()  AS total FROM
        (SELECT *, DENSE_RANK() OVER(ORDER BY "m"."id") AS "total_count" FROM 
        (SELECT DISTINCT "project"."id", "project"."name", "project"."body", "project"."status", 
        
        AVG("t"."mark") OVER(PARTITION BY "project"."id") AS "mark"
        FROM "projects" AS  "project"
        INNER JOIN ( "project_workers" AS "users->projectWorker" INNER JOIN "users" AS "users" ON "users"."id" = "users->projectWorker"."user_id")
        ON "project"."id" = "users->projectWorker"."project_id" 
        AND ${data.user}
        LEFT OUTER JOIN "tasks" AS "t" 
        ON "project"."id"="t"."project_id" AND "t"."status" = 'completed'
        WHERE (
                (${data.query})
            AND (${data.status})
        ) )
         AS "m"
        ${data.mark}
        ORDER BY "m"."id")
        AS k
        LIMIT ${limit} OFFSET ${offset}
    `,{nest: true})
}

module.exports={create,addWorker,find}
