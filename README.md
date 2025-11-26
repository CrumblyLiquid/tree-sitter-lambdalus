# tree-sitter-lambdalus

Probably totally wrong grammar for [tree-sitter](https://github.com/tree-sitter/tree-sitter).

## Neovim setup

1. Clone this repository
```bash
git clone --depth 1 https://github.com/CrumblyLiquid/tree-sitter-lambdalus
```
3. Add this parser to `nvim-treesitter`
```lua
local parser_config = require("nvim-treesitter.parsers").get_parser_configs()
parser_config.lambdalus = {
  install_info = {
    url = "<your path>/tree-sitter-lambdalus/",
    files = { "src/parser.c" },
  },
  filetype = "lambdalus",
}
```
3. Register a new filetype if you want
```lua
vim.filetype.add({
  extension = {
    lambdalus = "lambdalus",
  },
})
```
4. Add highlight queries to your Neovim config
Tree-sitter queries for Neovim are placed under
`<nvim config>/queries/<language>/` where `<nvim config` is usually `~/.config/nvim`.

For highlighting save this as `highlights.scm` under `queries/lambdalus/`
```scheme
(variable) @variable

(macro_name) @function.macro
(lambda) @keyword.function

(open_paren) @punctuation.bracket
(close_paren) @punctuation.bracket

(parameter) @variable.parameter
```

For brackets highlighting one can use
[rainbow-delimiters.nvim](https://github.com/HiPhish/rainbow-delimiters.nvim).
Just add this into its config:
```lua
      query = {
        lambdalus = "rainbow-delimiters-lambdalus",
      },
```

Then save this as `rainbow-delimiters-lambdalus.scm` under `queries/lambdalus/`
```scheme
(lambda_expression
  (open_paren) @delimiter
  (close_paren) @delimiter
 ) @container

(bracketed
  (open_paren) @delimiter
  (close_paren) @delimiter
 ) @container
```

If these don't work check
[my dotfiles](https://github.com/CrumblyLiquid/dotfiles/tree/main/nvim/queries/lambdalus)
for any updates.
