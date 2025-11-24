/**
 * @file Lambdalus grammar for tree-sitter
 * @author CrumblyLiquid <crumblyliquid@gmail.com>
 * @license MIT
 */

/// <reference types="tree-sitter-cli/dsl" />
// @ts-check

module.exports = grammar({
  name: "lambdalus",

  extras: ($) => [
    /\s/, // whitespace
    $.comment,
  ],

  rules: {
    source_file: ($) => seq($.expression),

    macro_defs: ($) => repeat1(seq($.macro_def, ";")),
    macro_def: ($) => seq($.macro_name, "=", $.expression),
    macro_name: ($) => new RustRegex("[A-Z]+"),

    open_paren: ($) => token("("),
    close_paren: ($) => token(")"),
    variable: ($) => new RustRegex("[a-z]"),

    lambda: ($) => choice("λ", "\\"),
    lambda_expression: ($) =>
      seq(
        $.open_paren,
        $.lambda,
        field("variables", repeat1($.variable)),
        token("."),
        $.expression,
        $.close_paren,
      ),
    bracketed: ($) => seq($.open_paren, $.expression, $.close_paren),

    expression: ($) =>
      choice(
        $.macro_name,
        $.variable,
        $.bracketed,
        $.lambda_expression,
        prec.left(1, seq($.expression, $.expression)),
      ),

    comment: ($) =>
      token(
        choice(seq("//", /.*/), seq("/*", /[^*]*\*+([^/*][^*]*\*+)*/, "/")),
      ),
  },
});
