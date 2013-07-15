package com.huanwuji.context;

import com.google.common.collect.Sets;

import java.util.Set;

/**
 * description:.
 * User: huanwuji
 * create: 13-7-13 下午3:21
 */
public interface UploadConstants {
    public static final Set<String> fileTypes = Sets.newHashSet("rar", "doc", "docx", "zip", "pdf", "txt", "swf", "wmv", "gif", "png", "jpg", "jpeg", "bmp");
    public static final Set<String> imageTypes = Sets.newHashSet("gif", "png", "jpg", "jpeg", "bmp");
    public static final String UE_SEPARATE = "ue_separate_ue";
}
