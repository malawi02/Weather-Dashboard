$(document).ready(function(){
    
    $("#submitCity").click(function(){
        return getWeather();
    });
    
    
});
var lat=null;
var lon=null;

function getWeather(){
    var city = $("#city").val();

    if(city != ''){
        
        $.ajax({
           url: 'http://api.openweathermap.org/data/2.5/weather?q=' + city + "&units=imperial" + "&APPID=c10bb3bd22f90d636baa008b1529ee25",
            type: "GET",
            dataType: "jsonp",
            success: function(data){
                var widget = showResults(data)

                $("#showWeather").html(widget);
                
                $("#city").val('');
                lat=data.coord.lat
                lon=data.coord.lon
                getUV(lat,lon)
            }
            
        });


      
        
    }else{
        $("#error").html("<div class='alert alert-danger' id='errorCity'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a>City field cannot be empty</div>");
    }
    getForecast();
    // getUV(lat,lon);
    
}

function getUV(lat,lon){
    $.ajax({
        url: 'http://api.openweathermap.org/data/2.5/uvi/forecast?lat=' + lat +'&lon='+ lon + "&APPID=c10bb3bd22f90d636baa008b1529ee25",
         type: "GET",
         dataType: "jsonp",
         success: function(data){
            var widget = showUv(data)
             $("#showUV").html(widget);
         }
         
     });
}

function showUv(data){
    return "<h3 style='padding-left:40px;'><strong>UV index</strong>: "+data[0].value+"&deg;F</h3>"
}
function showResults(data,data2){
    return  '<h2 style="font-weight:bold; font-size:30px; padding-top:20px;" class="text-center">Current Weather for '+data.name+', '+data.sys.country+'</h2>'+
            "<h3 style='padding-left:40px;'><strong>Weather</strong>: "+data.weather[0].main+"</h3>"+
            "<h3 style='padding-left:40px;'><strong>Description</strong>:<img src='http://openweathermap.org/img/w/"+data.weather[0].icon+".png'> "+data.weather[0].description+"</h3>"+
            "<h3 style='padding-left:40px;'><strong>Temperature</strong>: "+data.main.temp+" &deg;F</h3>"+
            "<h3 style='padding-left:40px;'><strong>Pressure</strong>: "+data.main.pressure+" hpa</h3>"+
            "<h3 style='padding-left:40px;'><strong>Humidity</strong>: "+data.main.humidity+"%</h3>"+
            "<h3 style='padding-left:40px;'><strong>Min Temperature</strong>: "+data.main.temp_min+"&deg;F</h3>"+
            "<h3 style='padding-left:40px;'><strong>Max Temperature</strong>: "+data.main.temp_max+"&deg;F</h3>"+
            "<h3 style='padding-left:40px;'><strong>Wind Speed</strong>: "+data.wind.speed+"m/s</h3>"+
            "<h3 style='padding-left:40px; padding-bottom:30px;'><strong>Wind Direction</strong>: "+data.wind.deg+"&deg;</h3>";
}

function getForecast(){
    var city = $("#city").val();
    var days = 5
    
    if(city != '' && days != ''){
        
        $.ajax({
            url: 'http://api.openweathermap.org/data/2.5/forecast/daily?q=' + city + "&units=imperial" + "&cnt=5" + "&APPID=c10bb3bd22f90d636baa008b1529ee25",
            type: "GET",
            dataType: "jsonp",
            success: function(data){
                
                var table = '';
                
                var header = '<h2 style="font-weight:bold; font-size:30px; margin-top:20px;">Weather forecast for ' + data.city.name + ', ' + data.city.country + '</h2>'
                
                for(var i = 0; i < data.list.length; i++){
                    table += "<tr>";
                    
                    table += "<td><img src='http://openweathermap.org/img/w/"+data.list[i].weather[0].icon+".png'></td>";
                    table += "<td>" + data.list[i].weather[0].main + "</td>";
                    table += "<td>" + data.list[i].weather[0].description + "</td>";
                    table += "<td>" + data.list[i].temp.morn + "&deg;F</td>";
                    table += "<td>" + data.list[i].temp.night + "&deg;F</td>";
                    table += "<td>" + data.list[i].temp.min + "&deg;F</td>";
                    table += "<td>" + data.list[i].temp.max + "&deg;F</td>";
                    table += "<td>" + data.list[i].pressure + "hpa</td>";
                    table += "<td>" + data.list[i].humidity + "%</td>";
                    table += "<td>" + data.list[i].speed + "m/s</td>";
                    table += "<td>" + data.list[i].deg + "&deg;</td>";
                    
                    table += "</tr>";
                }
                
                $("#forecastWeather").html(table);
                // $("#header").html(header);
                
                // $("#city").val('');
                // $("#days").val('')
                
            }
            
            
        });
        
    }else{
        $("#error").html("<div class='alert alert-danger' id='errorCity'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a>City field cannot be empty</div>");
    }
    
}











