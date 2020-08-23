const supertest = require("supertest");
const assert = require('assert');
const app = require("../scr/index.js");
const chai = require('chai')

const ResponseShema=['data', 'limit', 'total_count', 'offset'];
const EmptyResponseShema=['data', 'limit', 'offset'];
const userDataShema =['id', 'name', 'surname', 'name_r', 'surname_r', 'email', 'created_at', 'updated_at'];
const projectDataShema = ['id', 'name', 'body', 'status', 'mark'];
const taskDataShema = ['id', 'name', 'description', 'status', 'mark'];

let index = 152;
let user_id, project_id, task_id;

describe("GET /", function() {
  it("Checking if the server is running. It should has status code 200", function(done) {
    supertest(app)
      .get("/")
      .expect(200)
      .end(function(err, res){
        if (err){ done(err);}
        done();
      });
  });

});

describe("GET api/users", function() {
    
    it("All fields are filled. Cyrill. Only name", function(done) {
      supertest(app)
        .get("/api/users").query({
            name : "Олег",
            limit : 0,
            offset : 0
        })
        .expect('Content-Type', /json/)
        .expect(200)
        .expect((res)=>{
            chai.assert.hasAllDeepKeys(res.body, ResponseShema);
            res.body.data.forEach(e => {
                chai.assert.hasAllDeepKeys(e, userDataShema);
            });
        })
        .end(function(err, res){
            if(err){done(err);}
            else{done();}
        });
    });
  
    it("All fields are filled. Cyrill. Name and surname", function(done) {
        supertest(app)
          .get("/api/users").query({
              name : "Олег Го",
              limit : 0,
              offset : 0
          })
          .expect('Content-Type', /json/)
          .expect(200)
          .expect((res)=>{
                chai.assert.hasAllDeepKeys(res.body, ResponseShema);
                res.body.data.forEach(e => {
                    chai.assert.hasAllDeepKeys(e, userDataShema);
                });
          })
          .end(function(err, res){
              if(err){done(err);}
              else{done();}
          });
      });

    it("All fields are filled. Latin. Name and surname", function(done) {
    supertest(app)
        .get("/api/users").query({
            name : "Igor Las",
            limit : 0,
            offset : 0
        })
        .expect('Content-Type', /json/)
        .expect(200)
        .expect((res)=>{
            chai.assert.hasAllDeepKeys(res.body, ResponseShema);
            res.body.data.forEach(e => {
                chai.assert.hasAllDeepKeys(e, userDataShema);
            });
        })
        .end(function(err, res){
            if(err){done(err);}
            else{done();}
        });
    });

    it("All fields are filled. Latin and Cyrill. Multi name and surname", function(done) {
    supertest(app)
        .get("/api/users").query({
            name : "Igor Las , Олег Го, Mish, Миша",
            limit : 0,
            offset : 0
        })
        .expect('Content-Type', /json/)
        .expect(200)
        .expect((res)=>{
            chai.assert.hasAllDeepKeys(res.body, ResponseShema);
            res.body.data.forEach(e => {
                chai.assert.hasAllDeepKeys(e, userDataShema);
            });
        })
        .end(function(err, res){
            if(err){done(err);}
            else{done();}
        });
    });

    it("All fields are filled. Latin and Cyrill. Multi name and surname. Limit and offset", function(done) {
    supertest(app)
        .get("/api/users").query({
            name : "Igor Las , Олег Го, Mish, Миша",
            limit : 2,
            offset : 1
        })
        .expect('Content-Type', /json/)
        .expect(200)
        .expect((res)=>{
            chai.assert.hasAllDeepKeys(res.body, ResponseShema);
            res.body.data.forEach(e => {
                chai.assert.hasAllDeepKeys(e, userDataShema);
            });
        })
        .end(function(err, res){
            if(err){done(err);}
            else{done();}
        });
    });

    it("All fields are filled. Latin and Cyrill. Multi name and surname. Limit and offset is empty", function(done) {
    supertest(app)
        .get("/api/users").query({
            name : "Igor Las , Олег Го, Mish, Миша",
            limit : "",
            offset : ""
        })
        .expect('Content-Type', /json/)
        .expect(200)
        .expect((res)=>{
            chai.assert.hasAllDeepKeys(res.body, ResponseShema);
            res.body.data.forEach(e => {
                chai.assert.hasAllDeepKeys(e, userDataShema);
            });
        })
        .end(function(err, res){
            if(err){done(err);}
            else{done();}
        });
    });

    it("Invalid user", function(done) {
    supertest(app)
        .get("/api/users").query({
            name : "zfkl",
            limit : 0,
            offset : 0
        })
        .expect('Content-Type', /json/)
        .expect(200)
        .expect((res)=>{
            chai.assert.hasAllDeepKeys(res.body, EmptyResponseShema);
            chai.assert.isEmpty(res.body.data)
        })
        .end(function(err, res){
            if(err){done(err);}
            else{done();}
        });
    })

    it("Limit is not a number", function(done) {
        supertest(app)
            .get("/api/users").query({
                name : "",
                limit : "sda",
                offset : 0
            })
            .expect('Content-Type', 'text/plain; charset=utf-8')
            .expect(400, 'Limit is not number')
            .end(function(err, res){
                if(err){done(err);}
                else{done();}
            });
        })
    
    it("Offset is not a number", function(done) {
        supertest(app)
            .get("/api/users").query({
                name : "",
                limit : 0,
                offset : 'sda'
            })
            .expect('Content-Type', 'text/plain; charset=utf-8')
            .expect(400, 'Offset is not number')
            .end(function(err, res){
                if(err){done(err);}
                else{done();}
            });
        })


});

describe("GET api/projects", function() {

    it("All fields are empty", function(done) {
    supertest(app)
        .get("/api/projects").query({
            query:"",
            users:"",
            status:"",
            mark:"",
            limit : 0,
            offset : 0
        })
        .expect('Content-Type', /json/)
        .expect(200)
        .expect((res)=>{
            chai.assert.hasAllDeepKeys(res.body, ResponseShema);
            res.body.data.forEach(e => {
                chai.assert.hasAllDeepKeys(e, projectDataShema);
            });
        })
        .end(function(err, res){
            if(err){done(err);}
            else{done();}
        });
    });

    it("All fields are filled. Empty query", function(done) {
        supertest(app)
            .get("/api/projects").query({
                query:"test body",
                users:"Oleg, Миша",
                status:"active",
                mark:">2",
                limit : 0,
                offset : 0
            })
            .expect('Content-Type', /json/)
            .expect(200)
            .expect((res)=>{
                chai.assert.hasAllDeepKeys(res.body, EmptyResponseShema);
                chai.assert.isEmpty(res.body.data)
            })
            .end(function(err, res){
                if(err){done(err);}
                else{done();}
            });
        });

    it("All fields are filled. Successful request", function(done) {
        supertest(app)
            .get("/api/projects").query({
                query:"test body",
                users:"Oleg, Миша",
                status:"inactive",
                mark:">2",
                limit : 0,
                offset : 0
            })
            .expect('Content-Type', /json/)
            .expect(200)
            .expect((res)=>{
                chai.assert.hasAllDeepKeys(res.body, ResponseShema);
                res.body.data.forEach(e => {
                    chai.assert.hasAllDeepKeys(e, projectDataShema);
                });
            })
            .end(function(err, res){
                if(err){done(err);}
                else{done();}
            });
        });

    it("Limit is not a number", function(done) {
        supertest(app)
            .get("/api/projects").query({
                query:"test body",
                users:"Oleg, Миша",
                status:"inactive",
                mark:">2",
                limit : "sda",
                offset : 0
            })
            .expect('Content-Type', 'text/plain; charset=utf-8')
            .expect(400, 'Limit is not number')
            .end(function(err, res){
                if(err){done(err);}
                else{done();}
            });
        })
    
    it("Offset is not a number", function(done) {
        supertest(app)
            .get("/api/projects").query({
                query:"test body",
                users:"Oleg, Миша",
                status:"inactive",
                mark:">2",
                limit : 0,
                offset : 'sda'
            })
            .expect('Content-Type', 'text/plain; charset=utf-8')
            .expect(400, 'Offset is not number')
            .end(function(err, res){
                if(err){done(err);}
                else{done();}
            });
        })

    it("Invalid status", function(done) {
        supertest(app)
            .get("/api/projects").query({
                query:"test body",
                users:"Oleg, Миша",
                status:"active, invalid",
                mark:">2",
                limit : 0,
                offset : 0
            })
            .expect('Content-Type', 'text/plain; charset=utf-8')
            .expect(400, 'Invalid value for the "status" field')
            .end(function(err, res){
                if(err){done(err);}
                else{done();}
            });
        })

    it("Invalid mark", function(done) {
        supertest(app)
            .get("/api/projects").query({
                query:"test body",
                users:"Oleg, Миша",
                status:"active",
                mark:"asdd",
                limit : 0,
                offset : 0
            })
            .expect('Content-Type', 'text/plain; charset=utf-8')
            .expect(400, 'Invalid value for the "mark" field')
            .end(function(err, res){
                if(err){done(err);}
                else{done();}
            });
        })
});

describe("GET api/tasks", function() {

    it("All fields are empty", function(done) {
    supertest(app)
        .get("/api/tasks").query({
            query:"",
            users:"",
            status:"",
            mark:"",
            limit : 0,
            offset : 0
        })
        .expect('Content-Type', /json/)
        .expect(200)
        .expect((res)=>{
            chai.assert.hasAllDeepKeys(res.body, ResponseShema);
            res.body.data.forEach(e => {
                chai.assert.hasAllDeepKeys(e, taskDataShema);
            });
        })
        .end(function(err, res){
            if(err){done(err);}
            else{done();}
        });
    });

    it("All fields are filled. Empty query", function(done) {
        supertest(app)
            .get("/api/tasks").query({
                query:"test body",
                users:"Oleg",
                status:"active",
                mark:"=0",
                limit : 0,
                offset : 0
            })
            .expect('Content-Type', /json/)
            .expect(200)
            .expect((res)=>{
                chai.assert.hasAllDeepKeys(res.body, EmptyResponseShema);
                chai.assert.isEmpty(res.body.data)
            })
            .end(function(err, res){
                if(err){done(err);}
                else{done();}
            });
        });

    it("All fields are filled. Successful request", function(done) {
        supertest(app)
            .get("/api/tasks").query({
                query:"test body",
                users:"Oleg, Миша",
                status:"inactive",
                mark:">2",
                limit : 0,
                offset : 0
            })
            .expect('Content-Type', /json/)
            .expect(200)
            .expect((res)=>{
                chai.assert.hasAllDeepKeys(res.body, ResponseShema);
                res.body.data.forEach(e => {
                    chai.assert.hasAllDeepKeys(e, taskDataShema);
                });
            })
            .end(function(err, res){
                if(err){done(err);}
                else{done();}
            });
        });

    it("Limit is not a number", function(done) {
        supertest(app)
            .get("/api/tasks").query({
                query:"test body",
                users:"Oleg, Миша",
                status:"inactive",
                mark:">2",
                limit : "sda",
                offset : 0
            })
            .expect('Content-Type', 'text/plain; charset=utf-8')
            .expect(400, 'Limit is not number')
            .end(function(err, res){
                if(err){done(err);}
                else{done();}
            });
        })
    
    it("Offset is not a number", function(done) {
        supertest(app)
            .get("/api/tasks").query({
                query:"test body",
                users:"Oleg, Миша",
                status:"inactive",
                mark:">2",
                limit : 0,
                offset : 'sda'
            })
            .expect('Content-Type', 'text/plain; charset=utf-8')
            .expect(400, 'Offset is not number')
            .end(function(err, res){
                if(err){done(err);}
                else{done();}
            });
        })

    it("Invalid status", function(done) {
        supertest(app)
            .get("/api/tasks").query({
                query:"test body",
                users:"Oleg, Миша",
                status:"active, invalid",
                mark:">2",
                limit : 0,
                offset : 0
            })
            .expect('Content-Type', 'text/plain; charset=utf-8')
            .expect(400, 'Invalid value for the "status" field')
            .end(function(err, res){
                if(err){done(err);}
                else{done();}
            });
        })

    it("Invalid mark", function(done) {
        supertest(app)
            .get("/api/tasks").query({
                query:"test body",
                users:"Oleg, Миша",
                status:"active",
                mark:"asdd",
                limit : 0,
                offset : 0
            })
            .expect('Content-Type', 'text/plain; charset=utf-8')
            .expect(400, 'Invalid value for the "mark" field')
            .end(function(err, res){
                if(err){done(err);}
                else{done();}
            });
        })
});

describe("POST api/users", function() {
    
    it("Successful request", function(done) {
        supertest(app)
            .post("/api/users").send({
                name: `Test${index}`,
                surname: `Testovich${index}`,
                name_r: `Тест${index}`,
                surname_r: `Тестович${index}`,
                email: `test_email_TEST_${index}@mail.test`
            })
            .expect('Content-Type', /json/)
            .expect(200)
            .expect((res)=>{
                user_id=res.body.id;
                chai.assert.deepEqual(res.body, {message: `User ${user_id} added successfully`,id: user_id})
            })
            .end(function(err, res){
                if(err){done(err);}
                else{done();}
            });
        });

    it("Email exists", function(done) {
        supertest(app)
            .post("/api/users").send({
                name: `Test${index}`,
                surname: `Testovich${index}`,
                name_r: `Тест${index}`,
                surname_r: `Тестович${index}`,
                email: `test_email_TEST_${index}@mail.test`
            })
            .expect('Content-Type', "text/plain; charset=utf-8")
            .expect(400,'User with this email already exists')
            .end(function(err, res){
                if(err){done(err);}
                else{done();}
            });
        });

    it("Invalid latin name", function(done) {
        supertest(app)
            .post("/api/users").send({
                name: `Test${index}`,
                surname: `Тестович${index}`,
                name_r: `Тест${index}`,
                surname_r: `Тестович${index}`,
                email: `test_email_TEST_${index}@mail.test`
            })
            .expect('Content-Type', "text/plain; charset=utf-8")
            .expect(400,'Use latin letters in the name and surname fields')
            .end(function(err, res){
                if(err){done(err);}
                else{done();}
            });
        });

    it("Invalid cyrill name", function(done) {
        supertest(app)
            .post("/api/users").send({
                name: `Test${index}`,
                surname: `Testovich${index}`,
                name_r: `Тест${index}`,
                surname_r: `Testovish${index}`,
                email: `test_email_TEST_${index}@mail.test`
            })
            .expect('Content-Type', "text/plain; charset=utf-8")
            .expect(400,'Use cyrillic letters in the name_r and surname_r fields')
            .end(function(err, res){
                if(err){done(err);}
                else{done();}
            });
        });

    it("Invalid email", function(done) {
        supertest(app)
            .post("/api/users").send({
                name: `Test${index}`,
                surname: `Testovich${index}`,
                name_r: `Тест${index}`,
                surname_r: `Тестович${index}`,
                email: `test_email_TEST_${index}`
            })
            .expect('Content-Type', "text/plain; charset=utf-8")
            .expect(400,'Incorrectly entered email')
            .end(function(err, res){
                if(err){done(err);}
                else{done();}
            });
        });

    it("Empty field email", function(done) {
        supertest(app)
            .post("/api/users").send({
                name: `Test${index}`,
                surname: `Testovich${index}`,
                name_r: `Тест${index}`,
                surname_r: `Тестович${index}`,
                email: ``
            })
            .expect('Content-Type', "text/plain; charset=utf-8")
            .expect(400,'Field "email" is empty')
            .end(function(err, res){
                if(err){done(err);}
                else{done();}
            });
        });
})

describe("POST api/projects", function() {
    
    it("Successful request", function(done) {
        supertest(app)
            .post("/api/projects").send({
                name: `Project${index}`,
                body : `Test body for Project${index}`,
                status: "active",
                authorId: user_id
            })
            .expect('Content-Type', /json/)
            .expect(200)
            .expect((res)=>{
                project_id=res.body.id;
                chai.assert.deepEqual(res.body, {message: "Project added successfully", id: project_id})
            })
            .end(function(err, res){
                if(err){done(err);}
                else{done();}
            });
        });

    it("Name exists", function(done) {
        supertest(app)
            .post("/api/projects").send({
                name: `Project${index}`,
                body : `Test body for Project${index}`,
                status: "active",
                authorId: user_id
            })
            .expect('Content-Type', "text/plain; charset=utf-8")
            .expect(400,'Project with this name is already')
            .end(function(err, res){
                if(err){done(err);}
                else{done();}
            });
        });

    it("Empty field name", function(done) {
        supertest(app)
            .post("/api/projects").send({
                name: ``,
                body : `Test body for Project${index}`,
                status: "active",
                authorId: user_id
            })
            .expect('Content-Type', "text/plain; charset=utf-8")
            .expect(400,'Field "name" is empty')
            .end(function(err, res){
                if(err){done(err);}
                else{done();}
            });
        });

    it("Invalid status", function(done) {
        supertest(app)
            .post("/api/projects").send({
                name: `Project${index}`,
                body : `Test body for Project${index}`,
                status: "invalid",
                authorId: user_id
            })
            .expect('Content-Type', "text/plain; charset=utf-8")
            .expect(400,'Invalid value for the "status" field')
            .end(function(err, res){
                if(err){done(err);}
                else{done();}
            });
        });

    it("authorId is not a number", function(done) {
        supertest(app)
            .post("/api/projects").send({
                name: `Project${index}`,
                body : `Test body for Project${index}`,
                status: "active",
                authorId: "sd"
            })  
            .expect('Content-Type', "text/plain; charset=utf-8")
            .expect(400,'authorId is not number')
            .end(function(err, res){
                if(err){done(err);}
                else{done();}
            });
        });

    it("User not found", function(done) {
        supertest(app)
            .post("/api/projects").send({
                name: `Project${index}`,
                body : `Test body for Project${index}`,
                status: "active",
                authorId: user_id+50
            })  
            .expect('Content-Type', "text/plain; charset=utf-8")
            .expect(400,'User not found')
            .end(function(err, res){
                if(err){done(err);}
                else{done();}
            });
        });

})

describe("POST api/tasks", function() {
    
    it("Successful request", function(done) {
        supertest(app)
            .post("/api/tasks").send({
                name: `Task${index}`,
                description : `Test body Task${index}`,
                status: "inactive",
                mark: 2,
                authorId: user_id,
                projectId: project_id
            })
            .expect('Content-Type', /json/)
            .expect(200)
            .expect((res)=>{
                task_id=res.body.id;
                chai.assert.deepEqual(res.body, {message: "Task added successfully", id: task_id})
            })
            .end(function(err, res){
                if(err){done(err);}
                else{done();}
            });
        });

    it("Empty field name", function(done) {
        supertest(app)
            .post("/api/tasks").send({
                name: ``,
                description : `Test body Task${index}`,
                status: "inactive",
                mark: 2,
                authorId: user_id,
                projectId: project_id
            })
            .expect('Content-Type', "text/plain; charset=utf-8")
            .expect(400,'Field "name" is empty')
            .end(function(err, res){
                if(err){done(err);}
                else{done();}
            });
        });

    it("Invalid status", function(done) {
        supertest(app)
            .post("/api/tasks").send({
                name: `Task${index}`,
                description : `Test body Task${index}`,
                status: "invalid",
                mark: 2,
                authorId: user_id,
                projectId: project_id
            })
            .expect('Content-Type', "text/plain; charset=utf-8")
            .expect(400,'Invalid value for the "status" field')
            .end(function(err, res){
                if(err){done(err);}
                else{done();}
            });
        });

    it("mark is not a number", function(done) {
        supertest(app)
            .post("/api/tasks").send({
                name: `Task${index}`,
                description : `Test body Task${index}`,
                status: "inactive",
                mark: "sdf",
                authorId: user_id,
                projectId: project_id
            }) 
            .expect('Content-Type', "text/plain; charset=utf-8")
            .expect(400,'mark is not number')
            .end(function(err, res){
                if(err){done(err);}
                else{done();}
            });
        });

    it("authorId is not a number", function(done) {
        supertest(app)
            .post("/api/tasks").send({
                name: `Task${index}`,
                description : `Test body Task${index}`,
                status: "inactive",
                mark: 2,
                authorId: "asd",
                projectId: project_id
            }) 
            .expect('Content-Type', "text/plain; charset=utf-8")
            .expect(400,'authorId is not number')
            .end(function(err, res){
                if(err){done(err);}
                else{done();}
            });
        });

    it("projectId is not a number", function(done) {
        supertest(app)
            .post("/api/tasks").send({
                name: `Task${index}`,
                description : `Test body Task${index}`,
                status: "inactive",
                mark: 2,
                authorId: user_id,
                projectId: "asd"
            }) 
            .expect('Content-Type', "text/plain; charset=utf-8")
            .expect(400,'projectId is not number')
            .end(function(err, res){
                if(err){done(err);}
                else{done();}
            });
        });

    
    it("User not found", function(done) {
        supertest(app)
            .post("/api/tasks").send({
                name: `Task${index}`,
                description : `Test body Task${index}`,
                status: "inactive",
                mark: 2,
                authorId: user_id+50,
                projectId: project_id
            })  
            .expect('Content-Type', "text/plain; charset=utf-8")
            .expect(400,'User not found')
            .end(function(err, res){
                if(err){done(err);}
                else{done();}
            });
        });

    it("Project not found", function(done) {
        supertest(app)
            .post("/api/tasks").send({
                name: `Task${index}`,
                description : `Test body Task${index}`,
                status: "inactive",
                mark: 2,
                authorId: user_id,
                projectId: project_id+50
            })  
            .expect('Content-Type', "text/plain; charset=utf-8")
            .expect(400,'Project not found')
            .end(function(err, res){
                if(err){done(err);}
                else{done();}
            });
        });

})
