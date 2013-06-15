package com.huanwuji.io;

import java.util.regex.Pattern;

/**
 * description:.
 * User: huanwuji
 * create: 13-6-14 下午11:05
 */
public class FileNameTools {

    public static boolean haveExtension(String uri) {
        Pattern pattern = Pattern.compile("\\.\\w+$");
        return pattern.matcher(uri).find();
    }
}
