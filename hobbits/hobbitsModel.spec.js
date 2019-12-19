const Hobbits = require('./hobbitsModel.js');
const db = require("../data/dbConfig.js");

describe("hobbits model", function(){

    
        beforeEach( async ()=>{
           await db('hobbits').truncate();
        })
   

    describe("insert()", function(){

        it('should insert hobbit to the db', async function(){
            // call insert, passing a hobbit object
            await Hobbits.insert({name: 'Sam'});
            await Hobbits.insert({name:"Gaffer"});

            //check the database directly 
            const hobbits = await db('hobbits');
            expect(hobbits).toHaveLength(2);
        })
    })
})