//package com.huanwuji.repository;
//
//
//import com.huanwuji.entity.bean.IdEntity;
//import com.huanwuji.entity.interfaced.Treeable;
//import org.springframework.data.jpa.repository.JpaRepository;
//
//import javax.persistence.EntityManager;
//import javax.persistence.PersistenceContext;
//import javax.persistence.criteria.CriteriaBuilder;
//import javax.persistence.criteria.CriteriaQuery;
//import javax.persistence.criteria.Predicate;
//import javax.persistence.criteria.Root;
//import java.io.Serializable;
//import java.util.List;
//
///**
// * Created with IntelliJ IDEA.
// * <p/>
// * User: huanwuji
// * Date: 12-12-8
// * Time: 下午2:33
// * To change this template use File | Settings | File Templates.
// */
//public abstract class AbstractTreeJpaRepository<T extends IdEntity, ID extends Serializable> implements JpaRepository<T, ID> {
//
//    @PersistenceContext
//    private EntityManager em;
//
//    private static final int TREE_ID_INC_STEP = 10;
//
//    private static String SEPARATOR = ",";
//
//    public <S extends T> S treeSave(S s) {
//        if (s.isNew()) {
//            if (s instanceof Treeable) {
//                Treeable treeS = (Treeable) s;
//                String treeId = getParentTreeId(treeS) + getIdPattern(treeS);
//                treeS.setTreeId(treeId);
//                treeS.setIsLeaf(true);
//            }
//        }
//        return this.save(s);
//    }
//
//    public void treeDelete(T t) {
//        if (t instanceof Treeable) {
//            Treeable obj = (Treeable) t;
//            final Treeable parent = (Treeable) obj.getParent();
//            if (parent != null) {
//                CriteriaBuilder builder = em.getCriteriaBuilder();
//                CriteriaQuery criteriaQuery = builder.createQuery(t.getClass());
//                Root root = criteriaQuery.from(t.getClass());
//                criteriaQuery.where(builder.equal(root.get("parent"), parent));
//                List<T> list = em.createQuery(criteriaQuery).getResultList();
//                boolean isLeaf = list.size() == 0;
//                if (list.size() == 1) {
//                    if (list.iterator().next().equals(t)) {
//                        isLeaf = true;
//                    }
//                }
//                if (isLeaf) {
//                    parent.setIsLeaf(true);
//                    this.save((T) parent);
//                }
//            }
//            this.delete(t);
//        }
//    }
//
//
//    private String getIdPattern(Treeable entity) {
//        CriteriaBuilder builder = em.getCriteriaBuilder();
//        CriteriaQuery<String> criteriaQuery = builder.createQuery(String.class);
//        Root root = criteriaQuery.from(entity.getClass());
//        criteriaQuery.select(builder.max(root.get("treeId")));
//
//        Predicate predicate;
//        Treeable parent = (Treeable) entity.getParent();
//        if (parent == null) {
//            predicate = builder.isNull(root.get("parent"));
//        } else {
//            if (parent.getIsLeaf()) {
//                parent.setIsLeaf(false);
//                this.save((T) parent);
//            }
//            predicate = builder.equal(root.get("parent"), parent);
//        }
//        criteriaQuery.where(predicate);
//        int nextId = TREE_ID_INC_STEP;
//        List<String> list = em.createQuery(criteriaQuery).getResultList();
//        if (list != null && list.size() == 1) {
//            String s = list.iterator().next();
//            if (s != null) {
//                s = s.substring(s.lastIndexOf(".") + 1);
//                nextId = Integer.valueOf(s) + TREE_ID_INC_STEP;
//            }
//        }
//        return String.valueOf(nextId);
//    }
//
//    private String getParentTreeId(Treeable entity) {
//        Treeable parent = (Treeable) entity.getParent();
//        String treeId = "";
//        if (parent != null) {
//            String preTreeId = parent.getTreeId();
//            if (preTreeId.contains(SEPARATOR)) {
//                preTreeId.substring(0, preTreeId.lastIndexOf(SEPARATOR));
//            }
//            treeId = preTreeId + SEPARATOR + parent.getId();
//        }
//        return treeId;
//    }
//
//}
