package tree_sitter_lambdalus_test

import (
	"testing"

	tree_sitter "github.com/tree-sitter/go-tree-sitter"
	tree_sitter_lambdalus "github.com/tree-sitter/tree-sitter-lambdalus/bindings/go"
)

func TestCanLoadGrammar(t *testing.T) {
	language := tree_sitter.NewLanguage(tree_sitter_lambdalus.Language())
	if language == nil {
		t.Errorf("Error loading Lambdalus grammar")
	}
}
