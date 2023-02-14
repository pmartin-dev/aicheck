import chalk from "chalk";
import { Configuration, OpenAIApi } from "openai";
import { execSync } from "child_process";

const apiKey = process.env.OPENAI_API_KEY;

if (!apiKey) {
  throw new Error("No OPENAI_API_KEY key found!");
}

const isGitRepo = execSync("git rev-parse --is-inside-work-tree");

if (!isGitRepo) {
  throw new Error("You are not inside a Git repo !");
}

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const diff = execSync(`git diff HEAD`, {
  encoding: "utf8",
});

if (diff.length === 0) {
  throw new Error("There is no change !");
}

if (diff.length > 7000) {
  throw new Error("The diff is too large to be analysed");
}

try {
  const openai = new OpenAIApi(configuration);

  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: `Can you give me advices on my code regarding the following git diff: ${diff}`,
    temperature: 0.7,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
    max_tokens: 200,
    stream: false,
    n: 1,
  });

  const resp = response.data.choices[0].text
    .trim()
    .replace(/[\n\r]/g, "")
    .replace(/(\w)\.$/, "$1");

  console.log(chalk.white.underline("Analyse of your code:"));
  console.log(chalk.white(resp));
} catch (err) {
  throw new Error(err);
}
