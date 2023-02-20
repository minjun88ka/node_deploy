const express = require("express");
const app = express();
const port = 8000;
const cors = require("cors");
const bodyParser = require("body-parser");
app.use(cors());
app.use(bodyParser.json());

const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: "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",
});
const openai = new OpenAIApi(configuration);

app.post("/chatGPT", async (req, res) => {
  // console.log(req.body);
  // Get the prompt from the request
  const { text } = req.body;
  console.log(text);
  // Generate a response with ChatGPT
  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: text,
    temperature: 0,
    max_tokens: 100,
    top_p: 1,
    frequency_penalty: 0.0,
    presence_penalty: 0.0,
  });
  res.json({ text: response.data.choices[0].text });
  // console.log(response.data.choices[0].text);
});

app.get("/hoi", (req, res) => {
  const q = req.query;
  console.log(q);
  res.json("Hello World!");
});

var client_id = "X3k67lYnZEfvfLdXmPFV";
var client_secret = "HN2v0dpYA9";

app.get("/translate_ko2en", function (req, res) {
  const q = req.query;
  var data_query = q.sentence;
  var api_url = "https://openapi.naver.com/v1/papago/n2mt";
  var request = require("request");
  var options = {
    url: api_url,
    form: { source: "ko", target: "en", text: data_query },
    headers: {
      "X-Naver-Client-Id": client_id,
      "X-Naver-Client-Secret": client_secret,
    },
  };
  request.post(options, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      res.writeHead(200, { "Content-Type": "text/json;charset=utf-8" });
      res.end(body);
    } else {
      res.status(response.statusCode).end();
      console.log("error = " + response.statusCode);
    }
  });
});

app.get("/translate_ko2en", function (req, res) {
  const q = req.query;
  var data_query = q.sentence;
  var api_url = "https://openapi.naver.com/v1/papago/n2mt";
  var request = require("request");
  var options = {
    url: api_url,
    form: { source: "ko", target: "en", text: data_query },
    headers: {
      "X-Naver-Client-Id": client_id,
      "X-Naver-Client-Secret": client_secret,
    },
  };
  request.post(options, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      res.writeHead(200, { "Content-Type": "text/json;charset=utf-8" });
      res.end(body);
    } else {
      res.status(response.statusCode).end();
      console.log("error = " + response.statusCode);
    }
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
