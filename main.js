var token = "";

function login(username, password){
    var d = new Date();
    $.ajax({
        url : "https://sample-test-sample-app.1d35.starter-us-east-1.openshiftapps.com/login-session",
        type : "POST",
        data : JSON.stringify({ "username" : username, "password" : password }),
        contentType : "application/json",
        success : function(data){
            console.log(data);
            token = data["token"];
            listen_messages("main.child.topic1", d.toISOString().replace("T"," ").replace("Z",""));
        },
        error : function(err){
            console.log(err);
        }
    });
    // $.post( "http://sample-test-sample-app.1d35.starter-us-east-1.openshiftapps.com/login-session", { "username" : username, "password" : password }, function(data){
    //     console.log(data["token"]);
    //     token = data["token"];
    //     return data["token"];
    // });
}

function send_message(topic, message){
    $.ajax({
        url : "https://sample-test-sample-app.1d35.starter-us-east-1.openshiftapps.com/message",
        type : "POST",
        data : JSON.stringify({"text" : message,"key" : topic,"token" : token}),
        contentType : "application/json",
        success : function(data){
            console.log(data);
        }
    });

    // $.post("http://sample-test-sample-app.1d35.starter-us-east-1.openshiftapps.com/message", {
    //     "text" : message,
    //     "key" : topic,
    //     "token" : token
    // }, function(data){
    //     console.log(data);
    // });
}


function get_messages(topic, from_time){
    $.get("https://sample-test-sample-app.1d35.starter-us-east-1.openshiftapps.com/message?token=" + token + "&key=" + topic + "&from_time=" + from_time, function(data){
        console.log(data);
        set_messages(data);
    });
}


function listen_messages(topic, from_time){
    setInterval(function(){
        get_messages(topic, from_time)
    }, 500);
}




function set_messages(messages){

    var msg_txt = "";

    for (var i in messages){
        item = messages[i]
        tmp = `<div class="card">
                    <header class="card-header">
                        <p class="card-header-title">
                            `+ item["key"] +`
                        </p>
                    </header>
                    <div class="card-content">
                        <div class="content">
                            `+item["text"]+`
                        </div>
                    </div>
                </div>
                <br>`
        msg_txt += tmp
    }

    $("#messages").html(msg_txt);
}




var messages = [
    {"topic" : "topic1", "message" : "message 1"},
    {"topic" : "topic2", "message" : "message 2"},
];

login("mridulganga", "password123")


