const express =require("express");
const db=require("../core/mysql");
const {request, response} = require("express");
const bodyParser = require("body-parser");
const router=express.Router();


//get all states to show
router.get("/getStates",async(request,response,next)=>{
    let value=[];
    let sql='SELECT distinct state FROM citypopulation;';
    let result =await db.query(sql,value);
    response.json(result);
})

router.post("/searchPopulation",bodyParser.json(),
    async(request,response,next)=>{
        try{
            let value=[];
            console.log(request.body);
            const sqlcode=request.body.sqlcode;
            console.log(sqlcode);
            let result =await db.query(sqlcode,value);
            response.json({
                    code:200,
                    data:result,
                    msg:'sucess'
                }


            );
        }catch (error){
            response.json({
                code:400,
                data:error,
                msg:'failed'
            });
            console.error('An error occurred:', error);

        }

    })

/**
 * getallData from database
 * param
 */
router.get("/getAllPopulation",async (request,response,next)=>{
    let state=request.query.state;
    let city = request.query.city;
    let leastSize= request.query.leastSize==undefined?0:request.query.leastSize;
    let mostSize= request.query.mostSize==undefined?100000000:request.query.mostSize;
    let pageSize= request.query.pageSize==undefined?20:request.query.pageSize;
    let pageNo= request.query.pageNo==undefined?1:request.query.pageNo;
    let startPage=(pageNo-1)*pageSize;
    let value=[];
    let sql=` `;
    let countsql='';
    if(!state && !city){
        sql=`SELECT * FROM citypopulation where population between ${leastSize} and ${mostSize} limit ${startPage},${pageSize};`;
        countsql=`SELECT count(*) as c FROM citypopulation where population between ${leastSize} and ${mostSize};`;

    }else if(!state ){
        sql=`SELECT * FROM citypopulation where place like '%${city}%' and population between ${leastSize} and ${mostSize} limit ${startPage},${pageSize};`;
        countsql=`SELECT count(*) as c FROM citypopulation where place like '%${city}%' and population between ${leastSize} and ${mostSize};`;
    }else if(!city){
        sql=`SELECT * FROM citypopulation where state = '%${state}%' and population between ${leastSize} and ${mostSize} limit ${startPage},${pageSize};`;
        countsql=`SELECT count(*) as c FROM citypopulation where state like '%${state}%' and population between ${leastSize} and ${mostSize} ;`;
    }else{
        sql=`SELECT * FROM citypopulation where state ='${state}' and place like '%${city}%' and population between ${leastSize} and ${mostSize} limit ${startPage},${pageSize};`;
        countsql=`SELECT count(*) as c  FROM citypopulation where state ='${state}' and place like '%${city}%' and population between ${leastSize} and ${mostSize} ;`;
    }
    let result =await db.query(sql,value);
    let count=await db.query(countsql,value);
    count =count[0].c;
    let pages=Math.ceil(count / pageSize);

    response.json({
        code:200,
        pages:pages,
        pageNo:parseInt(pageNo),
        count:count,
        data:result,
        msg:'success'
    });
})


/**
 * getCityData from database
 * param
 */
router.get("/getCityPopulation",async (request,response,next)=>{
    let state=request.query.state;
    let city = request.query.city;
    let leastSize= request.query.leastSize==undefined?0:request.query.leastSize;
    let mostSize= request.query.mostSize==undefined?100000000:request.query.mostSize;
    let pageSize= request.query.pageSize==undefined?20:request.query.pageSize;
    let pageNo= request.query.pageNo==undefined?1:request.query.pageNo;
    let startPage=(pageNo-1)*pageSize;
    let value=[];
    let sql=` `;
    let countsql='';
    if(!state && !city){
        sql=`select state,place ,fips ,sum(population) as population  from citypopulation group by state,place,fips having population between ${leastSize} and ${mostSize} limit ${startPage},${pageSize};`;
        countsql=`select count(*) as c from(select state,place ,fips ,sum(population) as population  from citypopulation group by state,place,fips having population between ${leastSize} and ${mostSize})as subquery;`;

    }else if(!state ){
        sql=`select state,place ,fips ,sum(population) as population from citypopulation where place like '%${city}%' group by state,place,fips having population between ${leastSize} and ${mostSize} limit ${startPage},${pageSize};`;
        countsql=`SELECT count(*) as c FROM (select state,place ,fips ,sum(population) as population from citypopulation where place like '%${city}%' group by state,place,fips having population between ${leastSize} and ${mostSize}) as subquery;`;
    }else if(!city){
        sql=`select state,place ,fips ,sum(population) as population from citypopulation where state = '%${state}%' group by state,place,fips having population between ${leastSize} and ${mostSize} limit ${startPage},${pageSize};`;
        countsql=`SELECT count(*) as c FROM (select state,place ,fips ,sum(population) as population from citypopulation where state = '%${state}%' group by state,place,fips having population between ${leastSize} and ${mostSize}) as subquery;;`;
    }else{
        sql=`select state,place ,fips ,sum(population) as population  from citypopulation where state ='${state}' group by state,place,fips having population between ${leastSize} and ${mostSize} limit ${startPage},${pageSize};`;
        countsql=`SELECT count(*) as c FROM (select state,place ,fips ,sum(population) as population  from citypopulation where state ='${state}' group by state,place,fips having population between ${leastSize} and ${mostSize}) as subquery;;`;
    }
    let result =await db.query(sql,value);
    let count=await db.query(countsql,value);
    count =count[0].c;
    let pages=Math.ceil(count / pageSize);

    response.json({
        code:200,
        pages:pages,
        pageNo:parseInt(pageNo),
        count:count,
        data:result,
        msg:'success'
    });
})


module.exports = router

