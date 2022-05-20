let imgMap;
let zoomQ=80;
let aqiBoston,aqiNYC,aqiLA,aqiChicago,aqiHouston;
let bostonArticles=[],bostonDates=[],laArticles=[],laDates=[],houstonArticles=[],houstonDates=[],nycArticles=[],nycDates=[],chicagoArticles=[],chicagoDates=[];
let NYTdata;

// https://apilist.fun/api/airvisual  Account:bs827
let AQIurlBoston='https://api.airvisual.com/v2/city?city=Boston&state=Massachusetts&country=USA&key=79c70f4d-be5c-4650-b5b9-6bc9ce410362';

let AQIurlNYC='https://api.airvisual.com/v2/city?city=new%20york%20city&state=new%20york&country=USA&key=79c70f4d-be5c-4650-b5b9-6bc9ce410362'

let AQIurlLA='https://api.airvisual.com/v2/city?city=los%20angeles&state=california&country=USA&key=79c70f4d-be5c-4650-b5b9-6bc9ce410362';

let AQIurlChicago='https://api.airvisual.com/v2/city?city=chicago&state=illinois&country=USA&key=79c70f4d-be5c-4650-b5b9-6bc9ce410362';

let AQIurlHouston='https://api.airvisual.com/v2/city?city=houston&state=texas&country=USA&key=79c70f4d-be5c-4650-b5b9-6bc9ce410362';

let NYTurlBoston='https://api.nytimes.com/svc/search/v2/articlesearch.json?fq=headline:(%22boston%22)%20AND%20pub_year:(%222021%22)&api-key=s4PD8nXG5spP8pxu3gyGZfF6oN8kP3px';

let NYTurlNYC='https://api.nytimes.com/svc/search/v2/articlesearch.json?fq=headline:(%22new%20york%22)%20AND%20pub_year:(%222021%22)&api-key=s4PD8nXG5spP8pxu3gyGZfF6oN8kP3px';

let NYTurlLA='https://api.nytimes.com/svc/search/v2/articlesearch.json?fq=headline:(%22los%20angeles%22)%20AND%20pub_year:(%222021%22)&api-key=s4PD8nXG5spP8pxu3gyGZfF6oN8kP3px';

let NYTurlChicago='https://api.nytimes.com/svc/search/v2/articlesearch.json?fq=headline:(%22chicago%22)%20AND%20pub_year:(%222021%22)&api-key=s4PD8nXG5spP8pxu3gyGZfF6oN8kP3px';

let NYTurlHouston='https://api.nytimes.com/svc/search/v2/articlesearch.json?fq=headline:(%22houston%22)%20AND%20pub_year:(%222021%22)&api-key=s4PD8nXG5spP8pxu3gyGZfF6oN8kP3px';

let NYTurl='https://api.nytimes.com/svc/search/v2/articlesearch.json?q=new%20york&api-key=s4PD8nXG5spP8pxu3gyGZfF6oN8kP3px';

function preload(){
  
  imgMap = loadImage("assets/map.png");
  bison = loadFont("assets/Bison.ttf");
  
   httpGet(AQIurlBoston, 'json',false, function(response) {
    aqiBoston=response.data.current.pollution.aqius;
    //console.log(response);
  }); 
  
   httpGet(AQIurlNYC, 'json',false, function(response) {
    aqiNYC=response.data.current.pollution.aqius;
    //console.log(response);
  });
  
  httpGet(AQIurlLA, 'json',false, function(response) {
    aqiLA=response.data.current.pollution.aqius;
    //console.log(response);
  });
  
  httpGet(AQIurlChicago, 'json',false, function(response) {
    aqiChicago=response.data.current.pollution.aqius;
    //console.log(response);
  });
  
  httpGet(AQIurlHouston, 'json',false, function(response) {
    aqiHouston=response.data.current.pollution.aqius;
    //console.log(response);
  });
  
  // NYT API ************************************************
  
    httpGet(NYTurlBoston,false, function(response) {
    console.log(response);
    for(let i=0;i<response.response.docs.length;i++){
      if(response.response.docs[i].headline.print_headline){
       bostonArticles[i]=response.response.docs[i].headline.print_headline;  
      }
      else{
        bostonArticles[i]=response.response.docs[i].headline.main;
      }
      bostonDates[i]=response.response.docs[i].pub_date.substring(0,10);
    }
    
  });
  
  httpGet(NYTurlNYC,false, function(response) {
    console.log(response);
    for(let i=0;i<response.response.docs.length;i++){
       nycArticles[i]=response.response.docs[i].headline.main;
       nycDates[i]=response.response.docs[i].pub_date.substring(0,10);
    }
  });
  
  httpGet(NYTurlLA,false, function(response) {
    console.log(response);
    for(let i=0;i<response.response.docs.length;i++){
       laArticles[i]=response.response.docs[i].headline.main;
       laDates[i]=response.response.docs[i].pub_date.substring(0,10);
    }
  });
  
  httpGet(NYTurlChicago,false, function(response) {
    console.log(response);
    for(let i=0;i<response.response.docs.length;i++){
       chicagoArticles[i]=response.response.docs[i].headline.main;
       chicagoDates[i]=response.response.docs[i].pub_date.substring(0,10);
    }
  });
  
  httpGet(NYTurlHouston,false, function(response) {
    console.log(response);
    for(let i=0;i<response.response.docs.length;i++){
       houstonArticles[i]=response.response.docs[i].headline.main;
       houstonDates[i]=response.response.docs[i].pub_date.substring(0,10);
    }
  });
  
  httpGet(NYTurl, false, function(response) {
    NYTdata=response;
    //console.log(NYTdata);
  });
}
function setup() {
  createCanvas(600, 600);
  imageMode(CENTER);
}

function draw() {
  background(247);
  image(imgMap,width/2,height/2,width+zoomQ,(width+zoomQ)*0.68);
  fill(255,0,0);
  textSize(12);
  //text(`X: ${mouseX}, Y: ${mouseY}`, 40, 20);
  
  push();
  fill(255,0,0,150);
  textSize(144);
  textFont(bison);
  text('NYT',10,585);
  text('AQI',176,585);
  fill(168,50,50,210);
  //textSize(325);
  text('+',145,585);
  pop();
  
   textSize(18);
   boston();
   nyc();
   la();
   chicago();
   houston();
}

function boston(){
  if(dist(mouseX,mouseY,576,185)>aqiBoston/2){
     fill(255,0,0,200);
     }
  else{
    fill(168,50,50,230);
    push();
    fill(40);
    textSize(10);
    for(let i=0;i<bostonArticles.length;i++){
     text(bostonArticles[i]+'   | '+bostonDates[i],10,15+i*12); 
    }
    pop();
    
    push();
  fill(48,52,63,200);
  textSize(144);
  textFont(bison);
  text('BOSTON',265,585);
  pop();
  }
  
  ellipse(576,185,aqiBoston);
  fill(255);
  noStroke();
  text(aqiBoston,546,185);
}

function nyc(){
  if(dist(mouseX,mouseY,550,210)>aqiNYC/2){
     fill(255,0,0,200);
     }
  else{
    fill(168,50,50,230);
    push();
    fill(40);
    textSize(10);
    for(let i=0;i<nycArticles.length;i++){
     text(nycArticles[i]+'   | '+nycDates[i],10,15+i*12); 
    }
    pop();
    push();
  fill(48,52,63,200);
  textSize(144);
  textFont(bison);
  text('NYC',430,585);
  pop();
  }
  ellipse(550,210,aqiNYC);
  fill(255);
  noStroke();
  text(aqiNYC,520,210);
}

function la(){
  if(dist(mouseX,mouseY,112,377)>aqiLA/2){
     fill(255,0,0,200);
     }
  else{
    fill(168,50,50,230);
    push();
    fill(40);
    textSize(10);
    for(let i=0;i<laArticles.length;i++){
     text(laArticles[i]+'   | '+laDates[i],10,15+i*12); 
    }
    pop();
    push();
  fill(48,52,63,200);
  textSize(144);
  textFont(bison);
  text('LA',485,585);
  pop();
  }
  ellipse(112,377,aqiLA);
  fill(255);
  noStroke();
  text(aqiLA,142,377);
}

function chicago(){
  if(dist(mouseX,mouseY,400,235)>aqiChicago/2){
     fill(255,0,0,200);
     }
  else{
    fill(168,50,50,230);
    push();
    fill(40);
    textSize(10);
    for(let i=0;i<chicagoArticles.length;i++){
     text(chicagoArticles[i]+'   | '+chicagoDates[i],10,15+i*12); 
    }
    pop();
    push();
  fill(48,52,63,200);
  textSize(144);
  textFont(bison);
  text('CHICAGO',230,585);
  pop();
  }
  ellipse(400,235,aqiChicago);
  fill(255);
  noStroke();
  text(aqiChicago,370,235);
}

function houston(){
  if(dist(mouseX,mouseY,323,418)>aqiHouston/2){
     fill(255,0,0,200);
     }
  else{
    fill(168,50,50,230);
    push();
    fill(40);
    textSize(10);
    for(let i=0;i<houstonArticles.length;i++){
     text(houstonArticles[i]+'   | '+houstonDates[i],10,15+i*12); 
    }
    pop();
    push();
  fill(48,52,63,200);
  textSize(144);
  textFont(bison);
  text('HOUSTON',210,585);
  pop();
  }
  ellipse(323,418,aqiHouston);
  fill(255);
  noStroke();
  text(aqiHouston,293,418);
}