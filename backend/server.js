var express     = require('express');
var app         = express();
var bodyParser  = require('body-parser');
var mysql = require('mysql');

var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'people.outofbox@gmail.com',
      pass: ''
    }
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'student_portal'
  });

  connection.connect(function(err) {
    if (err) throw err
    console.log('You are now connected...')
  }) 

app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
    // Pass to next layer of middleware
    next();
});

app.post("/emails",function(req, res){
    var pageNo =            req.body.pageNo?req.body.pageNo:1;
    var recordPerPage =     req.body.recordPerPage?req.body.recordPerPage:30;
    var orderByField =      req.body.orderByField?req.body.orderByField:'updated_on';
    var orderType =         req.body.orderType?req.body.orderType:'DESC';
    var sqlLimit = '  ';
    var sqlOrderBy = ' ';
    
    var sql = "SELECT * FROM";
    var table=  " sp_emails ";
    
    sqlOrderBy = " ORDER BY "+ orderByField +" "+orderType;
    if(pageNo) {
        sqlLimit =  " LIMIT 0, "+recordPerPage;
    }
    //console.log(sql+table+sqlOrderBy+sqlLimit);
   
    connection.query(sql+table+sqlOrderBy+sqlLimit, function(err, result) {
        if (err) throw err;
        getTotalRowsCount("SELECT COUNT(*) as totalRows FROM "+table+sqlOrderBy, result, res);
        //console.log('totalRow', totalRow)
        //res.status(200).send({status: 'success', data:{records: result, totalRow: totalRow}});
    });
});

function getTotalRowsCount(sql, records, res) {
    return connection.query(sql, function(err, result) {
        if (err) throw err
        console.log(result[0]);
        res.status(200).send({status: 'success', data:{records: records, totalRows: result[0].totalRows}});
    });
}
app.post("/duplicate",function(req, res){
    var field   = req.body.field;
    var id      = req.body.id;
    var value   = req.body.value;
    var type    = req.body.type;
    var table  = '';
    switch(type) {
        case 'email':
            table = 'sp_emails';
            break;
        case 'group':
            table = 'sp_groups';
            break;
    }
    var sql   = "SELECT COUNT(*) as record_found FROM "+table+" WHERE ";
    var whereString='';
    if(id != '') {
        whereString += 'id !='+id;
    }
    whereString += " AND "+field+" = '"+value+"'";
    sql = sql + whereString;
    console.log(sql);
    connection.query(sql, function(err, result) {
        if (err) {
            res.status(200).send({status: 'fail', data:[]});
            throw err;
        }
        res.status(200).send({status: 'success', data:result[0].record_found});
    });
});

app.get("/email/:id",function(req, res){
    var id = req.params.id;
    var sql = 'SELECT * FROM sp_emails WHERE id="'+id+'"';
    console.log(sql);
    connection.query(sql, function(err, result) {
        if (err) {
            res.status(200).send({status: 'fail', data:[]});
            throw err;
        }
        res.status(200).send({status: 'success', data:result[0]});
    });
});
app.post("/email",function(req, res){
    var name    = req.body.name;
    var email   = req.body.email;
    var sql   = "INSERT INTO sp_emails (name, email, created_on) values('"+name+"', '"+email+"', current_timestamp)";
    console.log(sql);
    connection.query(sql, function(err, result) {
        if (err) throw err
        res.status(200).send({status: 'success', data:result});
    });
});

app.put("/email",function(req, res){
    var id = req.body.id;
    var name = req.body.name;
    var email = req.body.email;
    var sql = "UPDATE sp_emails SET name='"+name+"',  email='"+email+"' WHERE id="+id;
    console.log(sql);
    connection.query(sql, function(err, result) {
        if (err)  {
            res.status(200).send({status: 'fail', error: err, data:[]});
            throw err;
        }
        res.status(200).send({status: 'success', data:result});
    });
});

app.get("/groups",function(req, res){
    connection.query('select * from sp_groups', function(err, result) {
        if (err) throw err
        res.status(200).send({'status': 'success', data:result});
    });
});

app.get("/groupsTOSubscribe",function(req, res){
    connection.query("select * from sp_groups WHERE is_visible_on_subscription = 'Y'", function(err, result) {
        if (err) throw err
        res.status(200).send({'status': 'success', data:result});
    });
});

app.get("/group/:id",function(req, res){
    var id = req.params.id;
    var sql = 'SELECT * FROM sp_groups WHERE id="'+id+'"';
    console.log(sql);
    connection.query(sql, function(err, result) {
        if (err) {
            res.status(200).send({status: 'fail', data:[]});
            throw err;
        }
        res.status(200).send({status: 'success', data:result[0]});
    });
});
app.post("/group",function(req, res){
    var name    = req.body.name;
    var sql   = "INSERT INTO sp_groups (name, created_on) values('"+name+"', current_timestamp)";
    console.log(sql);
    connection.query(sql, function(err, result) {
        if (err) throw err
        res.status(200).send({status: 'success', data:result});
    });
});

app.put("/group",function(req, res){
    var id = req.body.id;
    var name = req.body.name;
    var sql = "UPDATE sp_groups SET name='"+name+"' WHERE id="+id;
    console.log(sql);
    connection.query(sql, function(err, result) {
        if (err)  {
            res.status(200).send({status: 'fail', error: err, data:[]});
            throw err;
        }
        res.status(200).send({status: 'success', data:result});
    });
});

app.get("/groupEmails/:groupId",function(req, res){
    var groupId = req.params.groupId;
    var sql = 'SELECT *, '+
              'e.id AS email_id, '+
              'e.name AS email_name, '+
              'e.created_on AS email_created_on, '+
              'e.updated_on AS email_updated_on, '+
            
              'g.id AS group_id, '+             
              'g.name AS group_name '+
              'FROM sp_emails_groups eg, '+
              'sp_emails e, sp_groups g '+
              'WHERE eg.group_id='+groupId+' AND eg.group_id = g.id AND eg.email_id = e.id';
    console.log(sql);
    connection.query(sql, function(err, result) {
        if (err) {
            res.status(200).send({status: 'fail', data:[]});
            throw err;
        }
        res.status(200).send({status: 'success', data:result});
    });
});
app.get("/unAssignedEmails/:groupId",function(req, res){
    var groupId = req.params.groupId;
    console.log(req.params);
    var sql = 'SELECT e.* FROM sp_emails e WHERE e.id NOT IN (SELECT email_id FROM sp_emails_groups eg WHERE eg.group_id ='+groupId+' )';
    console.log(sql);
    connection.query(sql, function(err, result) {
        if (err) {
            res.status(200).send({status: 'fail', data:[]});
            throw err;
        }
        res.status(200).send({status: 'success', data:result});
    });
});

app.get("/groupEmailDetail/:id",function(req, res){
    var id = req.params.id;
    var sql = 'SELECT *, '+
              'e.id AS email_id, '+
              'e.name AS email_name, '+
              'e.created_on AS email_created_on, '+
              'e.updated_on AS email_updated_on, '+
            
              'g.id AS group_id, '+             
              'g.name AS group_name '+
              'FROM sp_emails_groups eg, '+
              'sp_emails e, sp_groups g '+
              'WHERE eg.id='+id+' AND eg.group_id = g.id AND eg.email_id = e.id';
    console.log(sql);
    connection.query(sql, function(err, result) {
        if (err) {
            res.status(200).send({status: 'fail', data:{}});
            throw err;
        }
        res.status(200).send({status: 'success', data:result[0]});
    });
});
app.post("/groupEmails",function(req, res){
    var group_id    = req.body.group_id;
    var email_id    = req.body.email_id;
    var sql   = "INSERT INTO sp_emails_groups (group_id, email_id, created_on) values("+group_id+", "+email_id+", current_timestamp)";
    console.log(sql);
    connection.query(sql, function(err, result) {
        if (err) throw err
        res.status(200).send({status: 'success', data:result});
    });
});
app.put("/groupEmails",function(req, res){
    var id          = req.body.id;
    var group_id    = req.body.group_id;
    var email_id    = req.body.email_id;
    var sql = "UPDATE sp_groups_emails SET group_id="+group_id+", email_id= "+email_id+" WHERE id="+id;
    console.log(sql);
    connection.query(sql, function(err, result) {
        if (err)  {
            res.status(200).send({status: 'fail', error: err, data:[]});
            throw err;
        }
        res.status(200).send({status: 'success', data:result});
    });
});

app.get("/sendEmailToroups",function(req, res){
    var mailOptions = {
        from: 'youremail@gmail.com',
        to: 'people.outofbox@gmail.com',
        subject: 'Sending Email using Node.js',
        text: 'That was easy!'
    };
    
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
        console.log(error);
        } else {
        console.log('Email sent: ' + info.response);
        }
    });
});
var server = app.listen(3003, function(){
    console.log('Backend server started on '+server.address().port);
})