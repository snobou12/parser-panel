// if the module has no dependencies, the above pattern can be simplified to
//ESLint er
(function (root, factory) {
    // Browser globals (root is window)
    console.log(root, factory)
    window.registerFQL = factory();
}(typeof self !== 'undefined' ? self : this, function () {
  return function (hljs) {
    var KEYWORDS = {
      keyword:
        "FOR IN RETURN LET AND OR LIMIT FILTER DISTINCT SORT COLLECT ASC DESC" +
        "INTO KEEP WITH COUNT ALL ANY AGGREGATE LIKE NOT NONE",
      literal: "TRUE true FALSE false"
    };
    var NUMBER = {
      className: "number",
      variants: [
        { begin: "\\b(0[bB][01]+)" },
        { begin: "\\b(0[oO][0-7]+)" },
        { begin: hljs.C_NUMBER_RE }
      ],
      relevance: 0
    };
    var BACKTICK_STRING = {
      className: 'string',
      begin: '\`',
      end: '\`',
      illegal: '\\n',
      contains: [hljs.BACKSLASH_ESCAPE],
      relevance: 0
    };
    var PARAM = {
      className: "params",
      begin: '\@'
    };

    return {
      aliases: ["fql"],
      case_insensitive: true,
      keywords: KEYWORDS,
      contains: [
        hljs.APOS_STRING_MODE,
        hljs.QUOTE_STRING_MODE,
        BACKTICK_STRING,
        NUMBER,
        PARAM,
        hljs.C_LINE_COMMENT_MODE,
        hljs.C_BLOCK_COMMENT_MODE,
      ],
      illegal: /#(?!!)/
    };
  };
}));