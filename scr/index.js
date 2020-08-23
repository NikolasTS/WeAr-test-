const Koa = require('koa');
const Router = require('koa-router');
const config = require('config')
 

const userController = require('./modules/userController');
const taskController = require('./modules/taskController');
const projectController = require('./modules/projectController');


function createApp() {
  const app = new Koa();
  const router = new Router();

  app.on('error', function(err){
    console.error(err.stack);
    console.log(err.message);
  });

  router.get('/', async ctx=>{
    ctx.status=200;
  })

  router.use('/api/users', userController.routes());
  router.use('/api/tasks', taskController.routes());
  router.use('/api/projects', projectController.routes());

  app.use(router.routes());
  app.use(router.allowedMethods());
  
  return app;
}

let app = createApp().listen(3000, ()=>{console.log('Server started on http://127.0.0.1:3000');})



module.exports = app;