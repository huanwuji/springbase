package com.huanwuji.crawl;

import com.huanwuji.io.FileNameTools;
import com.huanwuji.lang.StringTools;
import org.apache.commons.io.FileUtils;
import org.apache.commons.io.FilenameUtils;
import org.apache.commons.io.IOUtils;
import org.apache.commons.lang.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.File;
import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.net.URI;
import java.net.URL;
import java.net.URLDecoder;
import java.util.List;

/**
 * description:Like the http://code.angularjs.org/1.1.5/ is a webSite Directory,
 * This program is only can crawl the content from this type of webSite.
 * User: huanwuji
 * create: 13-6-14 下午10:41
 */
public class WebSiteDirectoryCrawl {
    private static Logger logger = LoggerFactory.getLogger(WebSiteDirectoryCrawl.class);
    public static final String HREF_REG = "<a\\shref=\"([^.][^\"]*)\">";
    private String baseUrl;
    private String root;

    public WebSiteDirectoryCrawl(String baseUrl, String root) {
        this.baseUrl = baseUrl;
        this.root = root;
        try {
            FileUtils.forceMkdir(new File(root));
        } catch (IOException e) {
            logger.error(e.getLocalizedMessage(), e);
        }
    }

    public void hrefParse(String relativePath) {
        if (StringUtils.isEmpty(relativePath)) {
            relativePath = "";
        }
        String html = getContent(relativePath);
        List<String> hrefs = StringTools.getMatchs(html, HREF_REG, 1);
        for (String href : hrefs) {
            String _relativePath = relativePath + href;
            logger.info("Process href:{}", href);
            if (href.startsWith("http://")) {
                logger.info("Out of webSite, href:{}", href);
                continue;
            }
            if (href.endsWith("/")) {
                logger.info("This href is a directory: {}", _relativePath);
                writeDirectory(_relativePath);
                hrefParse(_relativePath);
            } else if (FileNameTools.haveExtension(href)) {
                logger.info("This href is a resources: {}", _relativePath);
                FilenameUtils.getName(href);
                writeContent(_relativePath);
            } else {
                logger.warn("Can't process href {}", href);
            }
        }
    }

    private void writeContent(String href) {
        try {
            FileUtils.copyURLToFile(URI.create(baseUrl + href).toURL(), new File(getFilePath(href)));
        } catch (IOException e) {
            logger.error(e.getLocalizedMessage(), e);
        }
    }

    private void writeDirectory(String href) {
        try {
            FileUtils.forceMkdir(new File(getFilePath(href)));
        } catch (IOException e) {
            logger.error(e.getLocalizedMessage(), e);
        }
    }

    private String getFilePath(String href) {
        try {
            return URLDecoder.decode(root + href, "UTF-8");
        } catch (UnsupportedEncodingException e) {
            logger.error(e.getLocalizedMessage(), e);
        }
        return null;
    }

    private String getContent(String uri) {
        String content = null;
        try {
            URL url = URI.create(baseUrl + uri).toURL();
            for (int i = 0; i < 3; i++) {
                if (content == null) {
                    content = IOUtils.toString(url.openStream());
                } else {
                    return content;
                }
            }
        } catch (IOException e) {
            logger.error(e.getLocalizedMessage(), e);
        }
        return null;
    }

    public static void main(String[] args) {
        WebSiteDirectoryCrawl webSiteDirectoryCrawl =
                new WebSiteDirectoryCrawl("http://code.angularjs.org/", "d:/docs/");
        webSiteDirectoryCrawl.hrefParse("1.1.5/");
    }
}
