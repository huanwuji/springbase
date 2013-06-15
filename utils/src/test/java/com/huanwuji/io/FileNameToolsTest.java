package com.huanwuji.io;

import org.apache.commons.io.FilenameUtils;
import org.junit.Assert;
import org.junit.Test;

import static org.junit.Assert.assertEquals;

/**
 * description:.
 * User: huanwuji
 * create: 13-6-14 下午11:09
 */
public class FileNameToolsTest {
    @Test
    public void testHaveExtension() throws Exception {
        String url = "abc/def.js";
        assertEquals(true, FileNameTools.haveExtension(url));
        url = "abc/def";
        assertEquals(false, FileNameTools.haveExtension(url));
    }
}
