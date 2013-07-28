package com.huanwuji.lang;

import org.apache.commons.lang.reflect.FieldUtils;

import java.lang.reflect.Field;

/**
 * description:.
 * User: huanwuji
 * create: 13-7-28 下午10:23
 */
public class ObjectTools {

    public static Field getField(Class type, String fieldName) {
        if (fieldName.contains(StringTools.PERIOD)) {
            String[] fieldNames = fieldName.split(StringTools.PERIOD);
            Class swapClass = type;
            for (int i = 0; i < fieldNames.length - 1; i++) {
                String name = fieldNames[i];
                Field field = FieldUtils.getDeclaredField(swapClass, name, true);
                swapClass = field.getType();
            }
            return FieldUtils.getDeclaredField(swapClass, fieldNames[fieldName.length() - 1], true);
        } else {
            return FieldUtils.getDeclaredField(type, fieldName, true);
        }
    }
}
