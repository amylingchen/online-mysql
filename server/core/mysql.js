const  mysql =require('mysql');
const  pool =mysql.createPool({
    host    :'localhost',
    port    :'3306',
    user    :'root',
    password:'Init1234!',
    database:'states',
});
module.exports.Pool=pool;

module.exports.query=(sql,value,cb)=>{
    if(typeof cb=='function'){
        pool.getConnection((err, connection)  => {
            if (err) {
                connection.release();
                cb(err);
            }else{
                connection.query(sql,value,(err,rows)=>{
                    // console.error('Error implement SQL : ' + err);
                    connection.release();
                    cb(err,rows);
                });
            }
        });
    }else{
        return new Promise((resolve,reject)=>{
            pool.getConnection((err, connection)  => {
                if (err) {
                    connection.release();
                    reject(err);
                }else{
                    console.log(sql);
                    connection.query(sql,value,(err,rows)=>{
                        connection.release();
                        if (err)
                            reject(err);
                        else
                            resolve(rows);

                    });
                }
            });
        })
    }

};


// pool.end((err) => {
//     if (err) {
//         console.error('Error closing pool: ' + err);
//     }
//     console.log('Pool was closed.');
// });

// let  sql='SELECT * FROM citypopulation';
// let params=[];
// query(sql,params,function (result){
//     console.log(result[0]);
// })
// export default query();

