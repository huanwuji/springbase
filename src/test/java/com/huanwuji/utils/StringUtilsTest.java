package com.huanwuji.utils;

/**
 * Created with IntelliJ IDEA.
 * <p/>
 * User: juyee
 * Date: 12-9-6
 * Time: 上午10:58
 * To change this template use File | Settings | File Templates.
 */
public class StringUtilsTest {

    public static void main(String[] args) {
        System.out.println("StringUtils.toJavaName(\"table_name\") = " + StringUtils.toJavaName("table_name_me", true));
        System.out.println("StringUtils.toJavaName(\"table_name\") = " + StringUtils.toJavaName("table_name_me", false));
    }
}
