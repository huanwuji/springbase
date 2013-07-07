package com.huanwuji.lang;

import org.apache.commons.lang.StringUtils;
import org.junit.Test;

import static org.junit.Assert.assertEquals;

/**
 * description:.
 * User: huanwuji
 * create: 13-7-7 下午8:41
 */
public class KeyToolsTest {

    @Test(expected = AssertionError.class)
    public void testGetFk1() throws Exception {
        _testGetFk("key", Long.MIN_VALUE);
    }

    @Test
    public void testGetFk2() throws Exception {
        _testGetFk("key", Integer.MIN_VALUE);
    }

    private void _testGetFk(String key, long id) throws Exception {
        String keyHashCodeBinStr = Integer.toBinaryString(key.hashCode());
        String idBinStr = Integer.toBinaryString(((int) id));
        assertEquals(idBinStr + StringUtils.repeat("0", 32 - keyHashCodeBinStr.length()) + keyHashCodeBinStr
                , Long.toBinaryString(KeyTools.getFk(key, id)));
    }
}
