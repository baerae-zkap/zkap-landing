self.__MIDDLEWARE_MATCHERS = [
  {
    "regexp": "^(?:\\/(_next\\/data\\/[^/]{1,}))?(?:\\/((?!api|_next|images|favicon.ico|favicon.svg|robots.txt|sitemap.xml).*))(\\.json)?[\\/#\\?]?$",
    "originalSource": "/((?!api|_next|images|favicon.ico|favicon.svg|robots.txt|sitemap.xml).*)"
  }
];self.__MIDDLEWARE_MATCHERS_CB && self.__MIDDLEWARE_MATCHERS_CB()