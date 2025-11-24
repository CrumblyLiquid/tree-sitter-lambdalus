// swift-tools-version:5.3

import Foundation
import PackageDescription

var sources = ["src/parser.c"]
if FileManager.default.fileExists(atPath: "src/scanner.c") {
    sources.append("src/scanner.c")
}

let package = Package(
    name: "TreeSitterLambdalus",
    products: [
        .library(name: "TreeSitterLambdalus", targets: ["TreeSitterLambdalus"]),
    ],
    dependencies: [
        .package(name: "SwiftTreeSitter", url: "https://github.com/tree-sitter/swift-tree-sitter", from: "0.9.0"),
    ],
    targets: [
        .target(
            name: "TreeSitterLambdalus",
            dependencies: [],
            path: ".",
            sources: sources,
            resources: [
                .copy("queries")
            ],
            publicHeadersPath: "bindings/swift",
            cSettings: [.headerSearchPath("src")]
        ),
        .testTarget(
            name: "TreeSitterLambdalusTests",
            dependencies: [
                "SwiftTreeSitter",
                "TreeSitterLambdalus",
            ],
            path: "bindings/swift/TreeSitterLambdalusTests"
        )
    ],
    cLanguageStandard: .c11
)
