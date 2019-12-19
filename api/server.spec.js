const request = require('supertest');

const server = require('./server.js');

describe('server.js', function(){

    describe('environment', function(){

        it('should set environment to testing', function(){
            expect(process.env.DB_ENV).toBe('testing');
        })
    })

    describe("get /", function(){

        it('should return a 200 okay status', function(){
            //spin up server
            return request(server)
            //make get request to '/'
            .get('/')
            
            //look at https status code of res
            .then(res=>{
                expect(res.status).toBe(200);
            });
        });

        it('should retun json', function() {
            return request(server)
            .get('/')
            .then(res=>{
                expect(res.type).toMatch(/json/i);
            });
        });

        it('should be returning {api:up}',function () {
            return request(server)
            .get('/')
            .then(res=>{
                expect(res.body.api).toBe('up')
            })
        })

        it("sample of setting a header",function () {
            return request(server)
            .post('/login')
            .send({username:'me', password: 'pass'})
            .then(res=>{
                const token = res.body.token;
                return request(server)
                .get('/')
                .set("Authorization", token)
                .then(res=>{
                    expect(Array.isArray(res.body)).toBe(true);
                })
            })
        })
    })
})