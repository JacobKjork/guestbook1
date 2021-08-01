//Någon javascript konvention säger att man skall ange alla konstanter i en 
//rad och i alfabetisk ordning. Kommer nog inte behåll det så.
const express = require("express"),
  app = express(),
  getAllPosts = express.Router(),
  getOnePost = express.Router(),
  setOnePost = express.Router(),
  //eftersom filen ligger där den ligger och vi kör visualstudio code 
  //från nivån ovanför så använder vi dirname för att hitta rätt
  reposorypath = `${__dirname}/../test.json`,
  port = process.env.PORT || 3000;

// första routen för att hämnta alla poster
getAllPosts.route('/posts')
  .get((req, res) => {
    const fs = require('fs');

    fs.readFile(reposorypath, (err, data) => {
      if (err) throw err;
      let posts = JSON.parse(data);
      //console.log(JSON.stringify(posts, null, 2));
      res.json(posts);
    });
  });

//en route för att hämta en post med ett särskilt id (inte med i uppgiften)
getOnePost.route('/posts/:postId')
  .get((req, res) => {
    const fs = require('fs');

    fs.readFile(reposorypath, (err, data) => {
      if (err) throw err;
      let posts = JSON.parse(data);
      //console.log(JSON.stringify(posts, null, 2));

      //Plocka fram posten från json-objektet, behöver ha en array för att använda find därav Object.values
      const TheOnePost = Object.values(posts)[0].find(post => post.postId === parseInt(req.params.postId));

      res.json(TheOnePost);
    });
  });

//en route för att sätta värdet på en ny post. Bör
//naturligt vis vara en post och inte en get. Lite som
//test bara, kan ju också tänka sig att ett hobbyprojekt kan
//ha en get för att kunna trixa lite. 
//-----------------------------------
//todo 
//urlendcode och lite säkerhetsfix
//validera mot schemat
//-----------------------------------
  setOnePost.route('/posts/addPost')
  .get((req, res) => {
     posterName = req.query.posterName;
     posterEmail = req.query.posterEmail;
     posterIpAddress = req.ip;
     postBody = req.query.postBody;
    const fs = require('fs');
    //skapa posts här eftersom den behövs i flera scoope
    let posts;

    var requestIp = require('request-ip');

    let ip = req.header('x-forwarded-for') || req.socket.remoteAddress;

    var clientIp = requestIp.getClientIp(req);

    console.log(ip);

    fs.readFile(reposorypath, (err, data) => {
      if (err) throw err;
      posts = JSON.parse(data);
      //console.log(JSON.stringify(posts, null, 2));
      
      //Vi måste hämta senaste id:t för att kunna lägga till nästa i ordningen
      let newPostId = 0;
      Object.values(posts)[0].forEach(element => {if(element.postId>newPostId) {newPostId = element.postId;}}); 

      //skapa timestamt för att lägga till
      const timestamp = new Date().toISOString();
   
      //lägg till ett objekt i arrayen
      posts['posts'].push({"postId": newPostId+1, "posterName": `${req.query.posterName}`, "posterEmail": `${req.query.posterEmail}`, "posterIpAddress": `${req.query.posterIpAddress}`, "postBody": `${req.query.postBody}`,"postTimestamp":`${timestamp}`});
      data = JSON.stringify(posts);

      //spara tillbaka datat i filen
      fs.writeFile(reposorypath, JSON.stringify(posts, null, 2), (err) => {
      if (err) console.log(err);
      console.log("Successfully Written to File.");
    });
    res.json(posts);
    });
    
  });


//Här är det viktigt att sätta upp routen i rätt ordning
//Man måste ha längsta routen först vill jag minnas. Annars
//kan url:en bli stulen
//---------------------------------------------------------
//posts/addPost
app.use('/api/v1', setOnePost);
//posts/6
app.use('/api/v1', getOnePost);
//posts
app.use('/api/v1', getAllPosts);



app.get("/", (req, res) => {

  res.send("Hej och välkommen till mitt api");
});

app.listen(port, () => {

  console.log(`Express körs på port : ${port}`);
});
