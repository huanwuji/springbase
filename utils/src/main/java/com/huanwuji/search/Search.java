package com.huanwuji.search;

import java.lang.annotation.ElementType;

/**
 * description:.
 * User: huanwuji
 * create: 13-7-27 上午11:21
 */
@java.lang.annotation.Target({java.lang.annotation.ElementType.METHOD,
        ElementType.TYPE, java.lang.annotation.ElementType.FIELD})
@java.lang.annotation.Retention(java.lang.annotation.RetentionPolicy.RUNTIME)
public @interface Search {
    boolean search() default true;

    boolean sort() default true;

    boolean all() default false;
}
