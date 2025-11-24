import XCTest
import SwiftTreeSitter
import TreeSitterLambdalus

final class TreeSitterLambdalusTests: XCTestCase {
    func testCanLoadGrammar() throws {
        let parser = Parser()
        let language = Language(language: tree_sitter_lambdalus())
        XCTAssertNoThrow(try parser.setLanguage(language),
                         "Error loading Lambdalus grammar")
    }
}
