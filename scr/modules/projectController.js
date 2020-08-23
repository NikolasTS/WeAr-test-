const Router = require('koa-router');
const router = new Router();

const koaBody = require('koa-body');

const projectService = require('../services/projectService');
const userService = require('../services/userService');

const status = ['active', 'inactive', 'declined', 'completed'];
const mark =/^(<|>|=|<=|>=)\d+$/;
const space_cleaner =/^[ \s]+|[ \s]+$/g;
const number = /^\d{1,}$/;

router.get('/', async ctx => {
  
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
  let query_query = `("project"."name" || ' ' ||  "project"."body" ILIKE '%${data.query}%')`
  let query_mark="";

  if(!data.status){
    query_status= `"project"."status" = 'active' OR "project"."status" = 'inactive' OR "project"."status" = 'declined' OR "project"."status" = 'completed'`;
  }
  else{
    data.status=data.status.split(',')
    data.status.forEach(e => {
      e = e.replace(space_cleaner, '');
      if(status.indexOf(e)===-1){ctx.throw(400,'Invalid value for the "status" field');}
      query_status+=`"project"."status" = '${e}' OR `
    }); 
    query_status=query_status.slice(0,-4)
  }

  if(!data.mark){query_mark=''}
  else{
    if(data.mark.search(mark)!==0){ctx.throw(400,'Invalid value for the "mark" field')}
    query_mark=`WHERE "m"."mark"${data.mark}`
  }

  //Find
  await projectService.find({query: query_query, user: query_users, status: query_status, mark: query_mark},limit,offset)
  .then(data=>{

    if(data.length){
        //Correct result
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
    body : ctx.request.body.body,
    status: ctx.request.body.status,
    authorId: ctx.request.body.authorId
  }

  if(!data.name)ctx.throw(400,'Field "name" is empty')
  if(!data.body)ctx.throw(400,'Field "body" is empty')

  if(!data.status)ctx.throw(400,'Field "status" is empty')
  data.status=data.status.replace(space_cleaner, '')
  if(status.indexOf(data.status)===-1){ctx.throw(400,'Invalid value for the "status" field');}

  
  if(!data.authorId)ctx.throw(400,'Field "authorId" is empty')
  if(typeof data.authorId !== "number"){ctx.throw(400,'authorId is not number')}
  
  const project = await projectService.create(data)
  .then(project=>{
      ctx.body={
        message: "Project added successfully",
        id: project.id,
      }
  })
  .catch(err=>{
    if(err.name === 'SequelizeUniqueConstraintError'){
      ctx.throw(400,'Project with this name is already')
    }
    if(err.status===400){
      ctx.throw(400,err.message)
    }
    ctx.throw(500,err)
  })

});

router.put('/:id', koaBody(),async ctx => {
  
  const projectId = ctx.request.params.id;
  const userId = ctx.request.body.user;

  await projectService.addWorker(projectId,userId)
  .then(
    ctx.body=`User ${userId} is working in Project ${projectId}`
  )
  .catch(err=>{
    ctx.throw(400,err);
  })

});


module.exports = router;

