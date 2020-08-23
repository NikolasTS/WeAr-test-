const Router = require('koa-router');
const router = new Router();

const koaBody = require('koa-body');

const taskService = require('../services/taskService');
const userService = require('../services/userService');

const status = ['active', 'inactive', 'declined', 'completed'];
const mark =/^(<|>|=|<=|>=)\d+$/;
const space_cleaner =/^[ \s]+|[ \s]+$/g;
const number = /^\d{1,}$/;

router.get('/', koaBody(), async ctx => {
    const data = {
      query: ctx.request.query.query,
      users: ctx.request.query.users,
      status: ctx.request.query.status,
      mark: ctx.request.query.mark
    }

  let limit = ctx.request.query.limit;
  let offset = ctx.request.query.offset;
  if(!limit.match(number)){ctx.throw(400,'Limit is not number')}
  if(!offset.match(number)){ctx.throw(400,'Offset is not number')}
  if(limit<=0){limit = 'ALL'}
  if(offset<=0){offset='0'}

  //Creating substrings for different queries and validate 
  let query_users = userService.createUserQuery(data.users);
  let query_status=``;
  let query_query = `("task"."name" || ' ' ||  "task"."description" ILIKE '%${data.query}%')`
  let query_mark="";

  if(!data.status){
    query_status= `"task"."status" = 'active' OR "task"."status" = 'inactive' OR "task"."status" = 'declined' OR "task"."status" = 'completed'`;
  }
  else{
    data.status=data.status.split(',')
    data.status.forEach(e => {
      e = e.replace(space_cleaner, '');
      if(status.indexOf(e)===-1){ctx.throw(400,'Invalid value for the "status" field');}
      query_status+=`"task"."status" = '${e}' OR `
    }); 
    query_status=query_status.slice(0,-4)
  }

 
  if(!data.mark){query_mark='TRUE'}
  else{
    if(data.mark.search(mark)!==0){ctx.throw(400,'Invalid value for the "mark" field')}
    query_mark=`"task"."mark"${data.mark}`}

  //Find
  await taskService.find({query: query_query, user: query_users, status: query_status, mark: query_mark},limit,offset)
  .then(data=>{
      //Correct result
      if(data.length){
        const total_count=data[0].total;
        data.forEach(e=>{
          delete e.total_count;
          delete e.total;})
        let res ={
          data,
          total_count,
          limit,
          offset
        }
        ctx.body=res;
    }
    else{
      ctx.body={
        data,
        limit,
        offset
      };
    }

  })
  .catch(err=>{
    ctx.throw(err);
  })

});

router.post('/', koaBody(),async ctx => {

    const data={
      name: ctx.request.body.name,
      description : ctx.request.body.description,
      status: ctx.request.body.status,
      mark:ctx.request.body.mark,
      authorId: ctx.request.body.authorId,
      projectId: ctx.request.body.projectId
    }
  
    if(!data.name)ctx.throw(400,'Field "name" is empty')
    if(!data.description)ctx.throw(400,'Field "description" is empty')

    if(!data.status)ctx.throw(400,'Field "status" is empty')
    data.status=data.status.replace(space_cleaner, '')
    if(status.indexOf(data.status)===-1){ctx.throw(400,'Invalid value for the "status" field');}
  

    if(!data.mark)ctx.throw(400,'Field "mark" is empty')
    if(typeof data.mark !== "number"){ctx.throw(400,'mark is not number')}

    if(!data.authorId)ctx.throw(400,'Field "authorId" is empty')
    if(typeof data.authorId !== "number"){ctx.throw(400,'authorId is not number')}

    if(!data.projectId)ctx.throw(400,'Field "projectId" is empty')
    if(typeof data.projectId !== "number"){ctx.throw(400,'projectId is not number')}
    
    const task = await taskService.create(data)
    .then(task=>{
        ctx.body={
          message: "Task added successfully",
          id: task.id,
        }
    })
    .catch(err=>{
      ctx.throw(500,err)
    })
  
  });

router.put('/:id', koaBody(),async ctx => {

  const taskId = ctx.request.params.id;
  const userId = ctx.request.body.user;

  await taskService.addWorker(taskId,userId)
  .then(
    ctx.body=`User ${userId} is working in Task ${taskId}`
  )
  .catch(err=>{
    ctx.throw(400,err);
  })

});


module.exports = router;