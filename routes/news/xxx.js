var jsonObj = {"55":"1","70":"0","80":"2","60":"2"};
for (var prop in jsonObj)
{
    console.error("jsonObj[" + prop + "]=" + jsonObj[prop]);
}