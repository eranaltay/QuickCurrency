
function callURL(source, fromAndTo)
{    
  var from = "";
  var to = "";
  //split the 'ils to usd'
  var splitedId = fromAndTo.toLowerCase().split("to");

    //call of callURL(...) came from 'update button' of create new currency rate
    if(source == "update")
    {        
       splitedId.reverse();
    }

    from = splitedId[0];
    to = splitedId[1]; 

    console.log("func callURL(): " + from + " to " + to);

       //ajax call to json api
       $.ajax({

    //api
    url: 'http://rate-exchange.appspot.com/currency?from=' + from + "&to=" + to,

    type: "GET",
    dataType: "json",
    async:true,

    //success of fetching json
    success: function (json) 
    {
       if(json.err) 
          alert(json.err)
       
       else
          createNotification(json, from + " to " + to);
    },
    
    //failure of fetching json
    error: function () {
        ErrorFunction();
    }

        });
   }


function createNotification(json, id)
{
   console.log("create");
   console.log(JSON.stringify(json));

  chrome.notifications.create(
   id ,{   
      type: "basic", 
      iconUrl: "icon.png", 
      title: "Quick Currency", 
      message: json.from + " To " + json.to + ": " + json.rate,
      buttons: [{ title: "Get Switched Currency"}],
      priority: 2},
  function(id)  {    } 

  ); 

}

function  ErrorFunction()
{
  window.alert("Aw Snap, theres an error")
	console.log("error");
}

chrome.notifications.onButtonClicked.addListener(
  function (notificationid, buttonid) 
  {
    console.log("received from btn listener: " + notificationid);
    callURL("update", notificationid);
});

chrome.omnibox.onInputEntered.addListener(
	function(text) {
      console.log("entered on query bar: " + text);
      callURL("create", text);
	});

