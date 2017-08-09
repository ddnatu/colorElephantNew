app.service('MyService', function ($http) {

    var req1 = {
        method: 'POST',
        url: 'http://uitask.azurewebsites.net/fetchRecords',
        headers: {
            'Content-Type': 'application/json'
        },
        data: {
            "RequestObject":"Telemetry",
            "UserID": "Admin",
            "containerName":"garwareanaloginputtelemetry",
            "fromDate":"2017-07-22 00:00:00",
            "toDate":"2017-07-22 23:00:00"
        }
    }

    var reqUploadFile = {
        method: 'POST',
        url: 'http://localhost:3000/upload'
        // transformRequest: function(data, headersGetterFunction) {
        //     return data; // do nothing! FormData is very good!
        // }
    }
    var reqadminRegisters = {
        method: 'POST',
        url: 'http://localhost:3000/registerAdmin',
        headers: {
            'Content-Type': 'application/json'
        }
    }
    this.getData = function(Tags){
        req.data.Tags = Tags;
        // console.log('reqData', req);
        return $http(req);
    }

    this.uploadAttachment = function(attachment){
        reqUploadFile.data = attachment;
        // console.log('attachment', attachment);
        console.log('reqUploadFile', reqUploadFile);
        return $http(reqUploadFile);
    }

    this.adminRegisters = function(adminCredentialsObject){
        reqadminRegisters.data = adminCredentialsObject;
        console.log('reqadminRegisters', reqadminRegisters);
        return $http(reqUploadFile);
    }
});
