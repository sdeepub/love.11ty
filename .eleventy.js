const { HtmlBasePlugin } = require("@11ty/eleventy");
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const embedYouTube = require("eleventy-plugin-youtube-embed");

module.exports = function(config) {

  // A useful way to reference the context we are running eleventy in
  let env = process.env.ELEVENTY_ENV || "dev";

  // Layout aliases can make templates more portable
  config.addLayoutAlias('default', 'layouts/base.njk');

  // Add some utility filters
  config.addFilter("squash", require("./src/utils/filters/squash.js") );
  config.addFilter("dateDisplay", require("./src/utils/filters/date.js") );

  // HtmlBase Plugin to automatically handle subfolder path-prefixes
  config.addPlugin(HtmlBasePlugin);
  
  // add support for syntax highlighting
  config.addPlugin(syntaxHighlight);

  // YouTube embed
  config.addPlugin(embedYouTube);

  // minify the html output
  config.addTransform("htmlmin", require("./src/utils/minify-html.js"));

  // compress and combine js files
  config.addFilter("jsmin", function(code) {
    const UglifyJS = require("uglify-js");
    let minified = UglifyJS.minify(code);
      if( minified.error ) {
          console.log("UglifyJS error: ", minified.error);
          return code;
      }
      return minified.code;
  });

  // pass some assets right through
  config.addPassthroughCopy("./src/site/images");

  // FIX: Explicitly pass through BOTH stylesheets into your output directory
  config.addPassthroughCopy({ "./src/site/_includes/css/main.css": "css/main.css" });
  config.addPassthroughCopy({ "./src/site/_includes/css/custom.css": "css/custom.css" });

  // make the seed target act like prod
  env = (env == "seed") ? "prod" : env;

  return {
    dir: {
      input: "src/site",
      output: "dist",
      // FIX: Standardize pathing string format relative to the input folder root
      data: `_data/${env}`
    },
    templateFormats : ["njk", "md", "11ty.js"],
    htmlTemplateEngine : "njk",
    markdownTemplateEngine : "njk",
    passthroughFileCopy: true
  };

};
