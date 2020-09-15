const { existsSync, mkdirSync, writeFileSync } = require("fs");
const { resolve } = require("path");
const { fileLoader, mergeTypes } = require("merge-graphql-schemas");

const context = resolve(__dirname, "..");
const dist = resolve(context, "dist");

if (!existsSync(dist)) {
  mkdirSync(dist);
}

const types = fileLoader(resolve(context, "src", "types"), {
  recursive: true,
});

const schema = mergeTypes(types, { all: true });
writeFileSync(resolve(dist, "schema.graphql"), schema);
