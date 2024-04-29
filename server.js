const { MongoClient, ObjectId } = require("mongodb");
const express = require("express");
const app = express();
const rou = express.Router();
const rou3 = express.Router();
const rou2 = express.Router();
const path = require("path");

app.use(express.static(path.join(__dirname, "blog", "build")));
app.use(express.json());

var col;
const url =
  "mongodb+srv://admin:password.bat@cluster0.7xy8veo.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

connection();

rou.route("/").get(getpage);
rou2.route("/").post(PostPost).patch(PostPatch).delete(PostDelete);
rou3.route("/").get(commentGet).post(commentPost);

async function commentPost(req, res) {
  let id = req.query.id.toString();
  console.log(req.body.com);

  await col.updateOne(
    { _id: new ObjectId(id) },
    {
      $push: {
        Comments: req.body.com,
      },
    }
  );
  res.send("data.Comments");
}

async function commentGet(req, res) {
  let id = req.query.id;
  console.log(id);
  if (id !== "1") {
    let data = await col.findOne({ _id: new ObjectId(id) });
    //   console.log(data);
    if (data == null) {
      res.send(["No Comments"]);
    } else res.send(data.Comments);
  } else {
    res.send(["No Comments"]);
  }
}

async function PostDelete(req, res) {
  let id = req.query.id;
  await col.deleteOne({ _id: new ObjectId(id) });
  res.send("Deleted");
}

async function PostPatch(req, res) {
  let id = req.query.id;
  const title = req.body.title;
  const content = req.body.content;
  await col.updateOne(
    { _id: new ObjectId(id) },
    {
      $set: {
        title: title,
        content: content,
      },
    }
  );
  res.send("Added Successfully");
}

async function PostPost(req, res) {
  const title = req.body.title;
  const content = req.body.content;
  let newdata = {
    content: content,
    title: title,
    Comments: [],
  };
  await col.insertOne(newdata);
  res.send("Added Successfully");
}

app.use("/", rou);
app.use("/post", rou2);
app.use("/comment", rou3);
app.get("/blogs", async (req, res) => {
  let data = await col.find({}).toArray();
  console.log(data);
  res.send(JSON.stringify(data));
});

async function connection() {
  const client = new MongoClient(url);
  await client.connect();
  console.log("Successfully connected to Atlas");
  const db = await client.db("it_lab");
  col = await db.collection("student");

  const port = 5000;
  app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
  });
}

async function getpage(req, res) {
  res.sendFile(path.join(__dirname, "blog", "build", "index.html"));
}
