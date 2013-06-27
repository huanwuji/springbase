package com.huanwuji.service;

import com.huanwuji.entity.bean.Menu;
import com.huanwuji.entity.query.QMenu;
import com.huanwuji.repository.MenuRepository;
import com.mysema.query.jpa.impl.JPAQuery;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;

/**
 * Created with IntelliJ IDEA.
 * <p/>
 * User: juyee
 * Date: 12-8-3
 * Time: 下午3:24
 * To change this template use File | Settings | File Templates.
 */
@Repository
@Transactional(readOnly = true)
public class MenuService {

    @PersistenceContext
    protected EntityManager em;

    @Autowired
    private MenuRepository menuRepository;

    public List<Menu> getMenus() {
        return menuRepository.findAll();
    }

    public List<Menu> getRoot() {
        JPAQuery query = new JPAQuery(em);
        QMenu menu = QMenu.MENU;
        return query.from(menu).where(menu.parent.isNull()).list(menu);
    }
}
