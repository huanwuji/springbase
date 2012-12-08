package com.huanwuji.repository;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;

import static org.junit.Assert.*;

/**
 * Created with IntelliJ IDEA.
 * <p/>
 * User: huanwuji
 * Date: 12-12-8
 * Time: 下午4:30
 * To change this template use File | Settings | File Templates.
 */
public class AbstractTreeJpaRepositoryTest {

    @Before
    public void setUp() {

    }

    @Test
    public void test() {
        String str = "kdjff,fdfd";
        assertEquals("kdjff", str.substring(0, str.indexOf(",")));

    }

    @After
    public void tearDown() {

    }

}
