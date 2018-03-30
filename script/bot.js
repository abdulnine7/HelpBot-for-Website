//CHAT WINDOW JS
$(document).on('click', '.panel-heading', function (e) {
    var $this = $(".panel-heading span.icon_minim");
    if (!$this.hasClass('panel-collapsed')) {
        $this.parents('.panel').find('.panel-body').slideUp();
        $this.addClass('panel-collapsed');
        $this.removeClass('glyphicon-minus').addClass('glyphicon-plus');
    } else {
        $this.parents('.panel').find('.panel-body').slideDown();
        $this.removeClass('panel-collapsed');
        $this.removeClass('glyphicon-plus').addClass('glyphicon-minus');
    }
});


//CHATBOT JS
var me = {};
me.avatar = ""; //USER AVTAR HERE

var you = {};
you.avatar = "icon.png";

function formatAMPM(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
}            

//-- No use time. It is a javaScript effect.
function insertChat(who, text, time){
    if (time === undefined){
        time = 0;
    }
    var control = "";
    var date = formatAMPM(new Date());
    
    if (who == "me"){
        control = '<li style="width:100%">' +
                        '<div class="msj macro">' +
                        // '<div class="avatar"><img class="img-circle" style="width:100%;" src="'+ me.avatar +'" /></div>' +
                            '<div class="text text-l">' +
                                '<p>'+ text +'</p>' +
                                '<p><small>'+date+'</small></p>' +
                            '</div>' +
                        '</div>' +
                    '</li>';                    
    }else{
        control = '<li style="width:100%;">' +
                        '<div class="msj-rta macro">' +
                            '<div class="text text-r">' +
                                '<p>'+text+'</p>' +
                                '<p><small>'+date+'</small></p>' +
                            '</div>' +
                        '<div class="avatar" style="padding:0px 0px 0px 10px !important"><img class="img-circle" style="width:100%;" src="'+you.avatar+'" /></div>' +                                
                  '</li>';
    }
    setTimeout(
        function(){                        
            $("ul").append(control).scrollTop($("ul").prop('scrollHeight'));
        }, time);
    
}

function resetChat(){
    $("ul").empty();
}

function ask_question(question, show_question) {

        var xhttp = new XMLHttpRequest();
        xhttp.onload = function () {
            if (this.status == 200 && this.responseText != null) {
                var response = JSON.parse(this.responseText);
                console.log(response);
                var answer = response[0].response.answer;
                var question = response[0].response.question;
                if(answer == "Sorry, I don't have an answer for that!"){
                	var control = "";
					var date = formatAMPM(new Date());
					control = '<li style="width:100%;">' +
                        '<div class="msj-rta macro">' +
                            '<div class="text text-r">' +
                                '<p>Sorry, I don\'t have an answer for that! Do you want ot search google for that? <br><br><a href="https://www.google.co.in/search?q='+ question +'" target="_blank"><button style="background-color :#4CAF50; color :white; padding :5px 10px;font-size :12px;cursor :pointer;">Search Google >></button></a></p>' +
                                '<p><small>'+date+'</small></p>' +
                            '</div>' +
                        '<div class="avatar" style="padding:0px 0px 0px 10px !important"><img class="img-circle" style="width:100%;" src="'+you.avatar+'" /></div>' +                                
                  '</li>';
						
					setTimeout(
					function(){                        
						$("ul").append(control).scrollTop($("ul").prop('scrollHeight'));
					}, 0);		    
					
					   
                } else {
                insertChat("you", answer,0);
                } 
            }
        }

        xhttp.open("GET", "proxy.php?question="+question+"&sessionid=1234567");
        xhttp.setRequestHeader("Content-type", "application/json");
        xhttp.send();

        return false;
    }

$(".mytext").on("keydown", function(e){
    if (e.which == 13){
        var text = $(this).val();
        if (text !== ""){
            insertChat("me", text); 
            ask_question(text);  
            console.log("question asked");        
            $(this).val('');
        }
    }
});

$('body > div > div > div:nth-child(2) > span').click(function(){
    $(".mytext").trigger({type: 'keydown', which: 13, keyCode: 13});
})

//-- Clear Chat
// resetChat();

//-- Print Messages
insertChat("you", "Hello There how can I help you?", 0); 


//-- NOTE: No use time on insertChat.
