package com.huanwuji.utils;

/**
 * Created with IntelliJ IDEA.
 * <p/>
 * User: juyee
 * Date: 12-9-6
 * Time: 上午10:42
 * To change this template use File | Settings | File Templates.
 */
public class StringUtils {

    public static String toJavaName(String str, boolean isFistLetterUp) {
        StringBuilder sb = new StringBuilder();
        String ucStr = str.toLowerCase();
        if (ucStr != null && ucStr.length() != 0) {
            if (isFistLetterUp) {
                sb.append(Character.toUpperCase(ucStr.charAt(0)));
            } else {
                sb.append(ucStr.charAt(0));
            }
            for (int i = 1; i < ucStr.length(); i++) {
                char c = ucStr.charAt(i);
                if (c == '_') {
                    if ((++i) < ucStr.length()) {
                        sb.append(Character.toUpperCase(ucStr.charAt(i)));
                    }
                } else {
                    sb.append(ucStr.charAt(i));
                }
            }
        }
        return sb.toString();
    }
}
