package com.huanwuji.service;

import com.huanwuji.entity.query.QMenu;
import com.mysema.query.jpa.impl.JPAQuery;
import org.junit.Test;

/**
 * description:.
 * User: huanwuji
 * create: 13-6-16 下午11:05
 */
public class TreeableServiceTest {

    @Test
    public void testJpaQuery() throws Exception {
        JPAQuery jpaQuery = new JPAQuery();
        QMenu qMenu = QMenu.MENU;
        jpaQuery.from(qMenu).where(qMenu.parent.id.eq(33L)).groupBy(qMenu.id);
        System.out.println(jpaQuery.toString());
    }
}
