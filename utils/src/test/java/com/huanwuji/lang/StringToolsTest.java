package com.huanwuji.lang;

import org.junit.Assert;
import org.junit.Test;

import java.util.List;

import static org.junit.Assert.assertEquals;
import static org.hamcrest.CoreMatchers.*;
import static org.junit.Assert.assertThat;

/**
 * description:.
 * User: huanwuji
 * create: 13-6-14 下午10:25
 */
public class StringToolsTest {

    @Test
    public void testGetMatchs() throws Exception {
        String str = "abcdabcdabcd";
        List<String> list = StringTools.getMatchs(str, "abc");
        assertEquals(3, list.size());
        assertThat(list, hasItems("abc"));
    }

    @Test
    public void testGetMatchsHref() throws Exception {

    }
}
