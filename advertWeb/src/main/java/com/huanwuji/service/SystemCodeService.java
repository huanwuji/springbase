package com.huanwuji.service;

import com.huanwuji.entity.bean.SystemCode;
import com.huanwuji.entity.query.QSystemCode;
import com.huanwuji.repository.SystemCodeRepository;
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
public class SystemCodeService {

    @PersistenceContext
    protected EntityManager em;

    @Autowired
    private SystemCodeRepository systemCodeRepository;

    public List<SystemCode> getSystemCodes() {
        return systemCodeRepository.findAll();
    }

    public List<SystemCode> getRoot() {
        JPAQuery query = new JPAQuery(em);
        QSystemCode qSystemCode = QSystemCode.SYSTEM_CODE;
        return query.from(qSystemCode).where(qSystemCode.parent.isNull()).list(qSystemCode);
    }

    public List<SystemCode> getChildren(Long id) {
        JPAQuery query = new JPAQuery(em);
        QSystemCode systemCode = QSystemCode.SYSTEM_CODE;
        return query.from(systemCode).where(systemCode.parent.id.eq(id)).list(systemCode);
    }
}
