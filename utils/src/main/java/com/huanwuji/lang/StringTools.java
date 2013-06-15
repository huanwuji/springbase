package com.huanwuji.lang;

import java.util.ArrayList;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * description:.
 * User: huanwuji
 * create: 13-6-14 下午10:20
 */
public class StringTools {

    public static List<String> getMatchs(String str, String reg) {
        return getMatchs(str, reg, -1);
    }

    public static List<String> getMatchs(String str, String reg, int group) {
        Pattern pattern = Pattern.compile(reg);
        Matcher matcher = pattern.matcher(str);
        List<String> matchs = new ArrayList<String>();
        while (matcher.find()) {
            if (group == -1) {
                matchs.add(matcher.group());
            } else {
                matchs.add(matcher.group(group));
            }
        }
        return matchs;
    }
}
