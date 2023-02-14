# Description

_AiCheck_ analyse your current changes (staged or not) and provides you with advices using AI to improve your code.

# Usage

1. Install the package globally
   `npm i -g aicheck`

2. Export your OpenAPI token from .zshrc or .bashrc
   `export OPENAI_API_KEY=<your_token>`

3. Run the package
   `aicheck` from any git repo that contains changes

# How it works

_AiCheck_ simply make a `git diff HEAD` to see your changes and send it to the OpenAI API in order to be analysed.
