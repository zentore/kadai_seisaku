const app  = require("express")();
const http = require("http").createServer(app);
const io   = require("socket.io")(http);

/**
 * "/"にアクセスがあったらindex.htmlを返却
 */
app.get("/", (req, res)=>{
  res.sendFile(__dirname + "/index.html");
});

/**
 * [イベント] ユーザーが接続
 */
io.on("connection", (socket)=>{
  console.log("ユーザーが接続しました");

  socket.on("post", (msg)=>{
    msg.text = msg.text.replace(/ぴえん/g,'🥺');
    msg.text = msg.text.replace(/うーん/g,'🤔');
    msg.text = msg.text.replace(/マッスル/g,'💩');
    msg.text = msg.text.replace(/天使/g,'👹');
    msg.text = msg.text.replace(/寿司/g,'👺');
    
    
    io.emit("member-post", msg);
  });

  socket.on("janken", (judge)=>{    
    io.emit("janken-post", judge);
  });

  console.log("ユーザーが接続しました");
});

/**
 * 3000番でサーバを起動する
 */
http.listen(3000, ()=>{
  console.log("listening on *:3000");
});