package com.huanwuji.service;


import com.google.common.collect.Lists;
import com.huanwuji.entity.Treeable;
import org.apache.commons.collections.CollectionUtils;
import org.apache.commons.lang.StringUtils;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import java.util.List;

/**
 * Created with IntelliJ IDEA.
 * <p/>
 * User: huanwuji
 * Date: 12-12-8
 * Time: 下午2:33
 * To change this template use File | Settings | File Templates.
 */
@Repository
@Transactional(readOnly = true)
public class TreeableService<T extends Treeable> {

    @PersistenceContext
    protected EntityManager em;

    private static final int TREE_ID_INC_STEP = 10;

    private static final String COMMA = ",";

    @Transactional
    public <S extends T> void prePersist(S s) {
        if (s != null) {
            String treeId = getParentIds(s) + COMMA + getOrderNum(s);
            s.setTreeId(treeId);
            s.setLeaf(true);
        }
    }

    @Transactional
    public void preRemove(T t) {
        if (t != null) {
            final Treeable parent = (Treeable) t.getParent();
            if (parent != null) {
                CriteriaBuilder builder = em.getCriteriaBuilder();
                CriteriaQuery criteriaQuery = builder.createQuery(t.getClass());
                Root root = criteriaQuery.from(t.getClass());
                criteriaQuery.where(builder.equal(root.get("parent"), parent));
                List list = em.createQuery(criteriaQuery).getResultList();
                boolean isLeaf = list.size() == 0;
                if (list.size() == 1) {
                    if (list.iterator().next().equals(t)) {
                        isLeaf = true;
                    }
                }
                if (isLeaf) {
                    parent.setLeaf(true);
                    em.merge((T) parent);
                }
            }
        }
    }

    @Transactional
    public void swap(Treeable entity1, Treeable entity2) {
        String swapTreeId = entity1.getTreeId();
        entity1.setTreeId(entity2.getTreeId());
        entity2.setTreeId(swapTreeId);
        em.merge(entity1);
        em.merge(entity2);
    }


    private String getOrderNum(Treeable entity) {
        CriteriaBuilder builder = em.getCriteriaBuilder();
        CriteriaQuery<String> criteriaQuery = builder.createQuery(String.class);
        Root root = criteriaQuery.from(entity.getClass());
        criteriaQuery.select(builder.max(root.get("treeId")));
        Predicate predicate;
        Treeable parent = (Treeable) entity.getParent();
        if (parent == null) {
            predicate = builder.isNull(root.get("parent"));
        } else {
            if (parent.getLeaf()) {
                parent.setLeaf(false);
                em.merge((T) parent);
            }
            predicate = builder.equal(root.get("parent"), parent);
        }
        criteriaQuery.where(predicate);
        int orderNum = TREE_ID_INC_STEP;
        List<String> list = em.createQuery(criteriaQuery).getResultList();
        if (CollectionUtils.isNotEmpty(list)) {
            String maxTreeId = list.get(0);
            if (StringUtils.isNotEmpty(maxTreeId)) {
                int maxOrderNum;
                if (maxTreeId.contains(COMMA)) {
                    maxOrderNum = Integer.parseInt(StringUtils.substringAfterLast(maxTreeId, COMMA));
                } else {
                    maxOrderNum = Integer.parseInt(maxTreeId);
                }
                orderNum = maxOrderNum + orderNum;
            }
        }
        return StringUtils.leftPad(String.valueOf(orderNum), 5, '0');
    }

    private String getParentIds(Treeable entity) {
        Treeable parent = entity;
        List<String> parentIds = Lists.newArrayList();
        while ((parent = (Treeable) parent.getParent()) != null) {
            parentIds.add(String.valueOf(parent.getId()));
        }
        return StringUtils.join(parentIds, COMMA);
    }
}
