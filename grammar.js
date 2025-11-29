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

  conflicts: ($) => [[$.macro_defs]],

  rules: {
    source_file: ($) => seq(optional($.macro_defs), $.expression),

    macro_defs: ($) => repeat1(seq($.macro_def, ";")),
    macro_def: ($) => seq($.macro_name, ":=", $.expression),
    macro_name: ($) => new RustRegex("[A-Z0-9+\\-*/]+"),

    open_paren: ($) => "(",
    close_paren: ($) => ")",
    identifier: ($) => new RustRegex("[a-z][a-z0-9]*"),
    variable: ($) => $.identifier,
    parameter: ($) => $.identifier,

    lambda: ($) => choice("λ", "\\"),
    lambda_expression: ($) =>
      seq(
        $.open_paren,
        $.lambda,
        repeat1($.parameter),
        ".",
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
