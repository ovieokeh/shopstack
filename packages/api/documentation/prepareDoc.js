const JsonRefs = require('json-refs');
const YAML = require('js-yaml');
const fs = require('fs');

function yamlContentProcessor(res, callback) {
  callback(undefined, YAML.safeLoad(res.text));
}

async function getSwaggerDocWithRefs(rootFilePath) {
  const rootOpenApiJSON = YAML.load(fs.readFileSync(rootFilePath).toString());

  const swaggerDoc = await JsonRefs.resolveRefs(rootOpenApiJSON, {
    location: rootFilePath,
    loaderOptions: {
      processContent: yamlContentProcessor,
    },
  });

  return swaggerDoc.resolved;
}

async function retrieveDoc() {
  const swaggerDoc = await getSwaggerDocWithRefs('./index.yaml');
  return swaggerDoc;
}

module.exports = getSwaggerDocWithRefs;
