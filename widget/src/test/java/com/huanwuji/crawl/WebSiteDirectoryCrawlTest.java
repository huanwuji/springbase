package com.huanwuji.crawl;

import com.huanwuji.lang.StringTools;
import org.junit.Test;

import java.net.URLDecoder;
import java.util.List;

/**
 * description:.
 * User: huanwuji
 * create: 13-6-14 下午10:54
 */
public class WebSiteDirectoryCrawlTest {
    @Test
    public void testDirectoryParse() throws Exception {
        String html = "\\n<html>\\n<head><title>Index of /snapshot/</title></head>\\n<body bgcolor=\"white\">\\n<h1>Index of /snapshot/</h1><hr><pre><a href=\"../\">../</a>\\n<a href=\"docs/\">docs/</a>                                              13-Jun-2013 22:15                   -\\n<a href=\"i18n/\">i18n/</a>                                              13-Jun-2013 22:15                   -\\n<a href=\"angular-bootstrap-prettify.js\">angular-bootstrap-prettify.js</a>                      13-Jun-2013 15:08               68215\\n<a href=\"angular-bootstrap-prettify.min.js\">angular-bootstrap-prettify.min.js</a>                  13-Jun-2013 15:08               19543\\n<a href=\"angular-bootstrap.js\">angular-bootstrap.js</a>                               13-Jun-2013 15:08                4776\\n<a href=\"angular-bootstrap.min.js\">angular-bootstrap.min.js</a>                           13-Jun-2013 15:08                2144\\n<a href=\"angular-cookies.js\">angular-cookies.js</a>                                 13-Jun-2013 15:08                5222\\n<a href=\"angular-cookies.min.js\">angular-cookies.min.js</a>                             13-Jun-2013 15:08                 807\\n<a href=\"angular-loader.js\">angular-loader.js</a>                                  13-Jun-2013 15:08                9105\\n<a href=\"angular-loader.min.js\">angular-loader.min.js</a>                              13-Jun-2013 15:08                 889\\n<a href=\"angular-mocks.js\">angular-mocks.js</a>                                   13-Jun-2013 15:08               56810\\n<a href=\"angular-resource.js\">angular-resource.js</a>                                13-Jun-2013 15:08               17171\\n<a href=\"angular-resource.min.js\">angular-resource.min.js</a>                            13-Jun-2013 15:08                2580\\n<a href=\"angular-sanitize.js\">angular-sanitize.js</a>                                13-Jun-2013 15:08               18011\\n<a href=\"angular-sanitize.min.js\">angular-sanitize.min.js</a>                            13-Jun-2013 15:08                3891\\n<a href=\"angular-scenario.js\">angular-scenario.js</a>                                13-Jun-2013 15:08              813478\\n<a href=\"angular.js\">angular.js</a>                                         13-Jun-2013 15:08              496517\\n<a href=\"angular.min.js\">angular.min.js</a>                                     13-Jun-2013 15:08               80910\\n<a href=\"version.json\">version.json</a>                                       13-Jun-2013 15:08                  98\\n<a href=\"version.txt\">version.txt</a>                                        13-Jun-2013 15:08                  13\\n</pre><hr></body>\\n</html>\\n";
        List<String> hrefs = StringTools.getMatchs(html, WebSiteDirectoryCrawl.HREF_REG);
        System.out.println("hrefs = " + hrefs);
    }

    @Test
    public void testHrefDecoding() throws Exception {
        String url = URLDecoder.decode("ng.directive%3angSrcset.html", "UTF-8");
        System.out.println("url = " + url);
    }
}
