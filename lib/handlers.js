'use strict';

const fs = require('fs');
var Converter = require("csvtojson").Converter;
var converter = new Converter({});
 

const accountSid = 'AC2d3c3a0d7249b09d081f2b29e566c328';
const authToken = '332107429f513b41819ef991409c6367';


const client = require('twilio')(accountSid, authToken);




var handlers = {};

handlers.default = function(request, reply)
{
    reply.view('Index');
};

handlers.fileUpload = function(request, reply){
    /*
var path = __dirname + "/uploads/" + request.payload.uploadfile;
var file = fs.createWriteStream(path);
*/
console.log(request.payload.uploadfile);

 //require("fs").Read(request.payload.uploadfile).pipe(converter);
converter.fromString(request.payload.uploadfile, function(err,result)
{

   /*
   field names
   Plaintiff1 Phone
   Defendant1 Phone
   Plaintiff2 Phone
   Defendant2 Phone
   Defendant3 Phone
   */
   result.forEach(function(line){
       if(line['Plaintiff2 Phone'])
       {
           if(line['Plaintiff1 Phone'].length !== 0)
           {
               sendMessage(line['Plaintiff1 Phone'], request.payload.textBody);
               //console.log(line['Plaintiff1 Phone']);
           }
           if(line['Plaintiff2 Phone'].length !== 0)
           {
               sendMessage(line['Plaintiff2 Phone'], request.payload.textBody);
              // console.log(line['Plaintiff2 Phone']);
           }
           if(line['Defendant1 Phone'].length !== 0)
           {
               sendMessage(line['Defendant1 Phone'], request.payload.textBody);
              // console.log(line['Defendant1 Phone']);
           }
           if(line['Defendant2 Phone'].length !== 0)
           {
               sendMessage(line['Defendant2 Phone'], request.payload.textBody);
              // console.log(line['Defendant2 Phone']);
           }
           if(line['Defendant3 Phone'].length !== 0)
           {
               sendMessage(line['Defendant3 Phone'], request.payload.textBody);
               //console.log(line['Defendant3 Phone']);
           }
          
       }
 

});
var me = "message sent";
reply.view('Index', {message : me});
})
}

function sendMessage(number, textMessage)
{
    console.log('sending text message\n' + number + '\n' + textMessage);
    
    
                    client.messages.create({
                    to: number,
                    from: '6152402110',
                    body: textMessage,
                        }, function (err, message) {
                            console.log(message.sid);
                        });
                        
}


handlers.readFile = function(request, reply)
{
require("fs").createReadStream("./HCATest01.csv").pipe(converter);

converter.on("end_parsed", function (jsonArray) {
   //console.log(jsonArray[0]);
  // console.log(jsonArray[0]['Plaintiff2 Phone']); 
   jsonArray.forEach(function(line){
       if(line['Plaintiff2 Phone'])
       {
            for(var x = 1; x <= 5; x++)
            {
                console.log(line['Plaintiff2 Phone']);
                    client.messages.create({
                    to: ine['Plaintiff2 Phone'],
                    from: '6152402110',
                    body: 'Test from Node',
                        }, function (err, message) {
                            console.log(message.sid);
                        });
            }
       }
       
            
       
       
   });
   
});

    

   

 


/*
    fs.readFile('./HCATest01.csv','utf8',function(errr,data)
    {
        
        //console.log(data);
    });
    */
    reply();
};

   // Twilio Credentials

    //require the Twilio module and create a REST client
    

    

module.exports = handlers;