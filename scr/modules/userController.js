  
const Router = require('koa-router');
const router = new Router();
const validator = require('validator');

const koaBody = require('koa-body');

const userService = require('../services/userService');

const number = /^\d{1,}$/;

router.get('/', koaBody(), async ctx => {

  const data = ctx.request.query.name;
  let limit = ctx.request.query.limit;
  let offset = ctx.request.query.offset;

  if(!limit.match(number)&&limit!==''){ctx.throw(400,'Limit is not number')}
  if(!offset.match(number)&&offset!==''){ctx.throw(400,'Offset is not number')}
  if(limit<=0){limit = 'ALL'}
  if(offset<=0){offset='0'}

  
  //Create substring 
  let final_query = userService.createUserQuery(data);

  //Find
  await userService.find(final_query, limit, offset)
  .then(data=>{

    //Correct result
    if(data.length){
      const total_count=data[0].total_count;
      data.forEach(e=>{delete e.total_count;})
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
  }})
  .catch(err=>{
    ctx.throw(err);
  })

});

router.post('/', koaBody(),async ctx => {

  const data={
    name: ctx.request.body.name,
    surname : ctx.request.body.surname,
    name_r: ctx.request.body.name_r,
    surname_r : ctx.request.body.surname_r,
    email: ctx.request.body.email,
  }

  //Validation data

  //Latin name
  if(!data.name)ctx.throw(400,'Field "name" is empty')
  if(!data.surname)ctx.throw(400,'Field "surname" is empty')
  if(userService.isKirill(data.name+data.surname))ctx.throw(400,'Use latin letters in the name and surname fields')

  //Cyrill name
  if(!data.name_r)ctx.throw(400,'Field "nameR" is empty')
  if(!data.surname_r)ctx.throw(400,'Field "surnameR" is empty')
  if(userService.isLatin(data.name_r+data.surname_r)){ctx.throw(400,'Use cyrillic letters in the name_r and surname_r fields')}

  //Email
  if(!data.email)ctx.throw(400,'Field "email" is empty')
  if(!validator.isEmail(data.email))ctx.throw(400,'Incorrectly entered email')

  //Creating
  await userService.create(data)
  .then(user=>{
      ctx.body={
        message: `User ${user.id} added successfully`,
        id: user.id,
      }
  })
  .catch(err=>{ 
    if(err.name === 'SequelizeUniqueConstraintError'){
        ctx.throw(400,'User with this email already exists')
    } 
    ctx.throw(500,err)
  })

});

router.put('/:id', koaBody(),async ctx => {
  const userId = ctx.request.params.id;
  const taskId = ctx.request.body.typeId;
  const type= ctx.request.body.type;

  if(type!=='project' && type!=='task'){ctx.throw(400,'Invalid type')}

  await userService.addWorker(userId,taskId,type)
  .then(
    ctx.body=`User ${userId} is working in ${type} ${taskId}`
  )
  .catch(err=>{
    ctx.throw(400,err);
  })

});


module.exports = router;