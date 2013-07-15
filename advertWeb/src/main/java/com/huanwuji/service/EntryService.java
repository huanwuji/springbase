package com.huanwuji.service;

import com.huanwuji.entity.bean.Entry;
import com.huanwuji.entity.query.QEntry;
import com.huanwuji.repository.EntryRepository;
import com.mysema.query.jpa.impl.JPAQuery;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import java.util.ArrayList;
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
public class EntryService {

    @PersistenceContext
    protected EntityManager em;

    @Autowired
    private EntryRepository entryRepository;

    public Page<Entry> findAll(Long fk, Pageable pageable) {
        return findAll(fk, null, pageable);
    }

    public Entry findByFk(Long fk) {
        JPAQuery query = new JPAQuery(em);
        QEntry qEntry = QEntry.ENTRY;
        return query.from(qEntry).where(qEntry.fk.eq(fk)).singleResult(qEntry);
    }

    public Page<Entry> findAll(final Long fk, final Boolean vaild, Pageable pageable) {
        return entryRepository.findAll(new Specification<Entry>() {
            @Override
            public Predicate toPredicate(Root<Entry> entryRoot, CriteriaQuery<?> criteriaQuery, CriteriaBuilder criteriaBuilder) {
                List<Predicate> predicates = new ArrayList<Predicate>(2);
                predicates.add(criteriaBuilder.equal(entryRoot.get(QEntry.FK), fk));
                if (vaild != null) {
                    predicates.add(criteriaBuilder.equal(entryRoot.get(QEntry.VALID), vaild));
                }
                return criteriaBuilder.and(predicates.toArray(new Predicate[predicates.size()]));
            }
        }, pageable);
    }
}
