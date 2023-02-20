const express = require("express");
const app = express();
const port = 8000;
const cors = require("cors");
app.use(cors());

const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: "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",
});
const openai = new OpenAIApi(configuration);

app.get("/chatGPT", (req, res) => {
  const q = req.query;
  var data_query = q.sentence;
  // console.log(data_query);
  runCompletion(data_query);
  async function runCompletion(data) {
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: data,
      temperature: 0,
      max_tokens: 100,
      top_p: 1,
      frequency_penalty: 0.0,
      presence_penalty: 0.0,
    });
    res.json({ text: completion.data.choices[0].text });
    console.log(completion.data.choices[0].text);
  }
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
