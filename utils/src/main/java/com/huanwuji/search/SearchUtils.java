package com.huanwuji.search;

import com.huanwuji.lang.ObjectTools;
import com.huanwuji.lang.StringTools;
import org.apache.commons.beanutils.ConvertUtils;
import org.apache.commons.collections.CollectionUtils;
import org.apache.commons.collections.MapUtils;
import org.apache.commons.lang.StringUtils;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;

import javax.persistence.criteria.*;
import javax.servlet.http.HttpServletRequest;
import java.lang.reflect.Field;
import java.util.*;

/**
 * description:.
 * User: huanwuji
 * create: 13-7-27 上午11:09
 */
public class SearchUtils {

    public static final String SEARCH_PRE = "s-";
    public static final String SORTS = "sorts";

    public static <T> JpaQueryConditions<T> searchProcess(HttpServletRequest request, Class<T> type) {
        return searchProcess(request, type, null);
    }

    public static <T> JpaQueryConditions<T> searchProcess(HttpServletRequest request, Class<T> type, Map<String, Object> extraParams) {
        Map<String, Object> params = transform2HashMap(request);
        if (extraParams != null) {
            extraParams.putAll(params);
            params = extraParams;
        }
        List<SearchFieldDesc> searchConditions = getSearchCondition(params, type);
        Specification<T> specification = buildSpecification(searchConditions);
        List<SearchFieldDesc> sortConditions = parseSort((String) params.get(SORTS), type);
        Sort sort = buildSort(sortConditions);
        return new JpaQueryConditions<T>(specification, sort);
    }

    public static Sort buildSort(List<SearchFieldDesc> sortConditions) {
        List<Sort.Order> orders = new ArrayList<Sort.Order>(sortConditions.size());
        for (SearchFieldDesc desc : sortConditions) {
            Sort.Order order = new Sort.Order(
                    Sort.Direction.valueOf(desc.getOperator().name()), desc.getName());
            orders.add(order);
        }
        return new Sort(orders);
    }

    /**
     * paramName: s-fieldName-operator
     *
     * @param paramExpressions .
     * @param type             searchClass
     * @return searchMap
     */
    public static List<SearchFieldDesc> getSearchCondition(Map<String, Object> paramExpressions, Class type) {
        List<SearchFieldDesc> searchFieldDescs = new ArrayList<SearchFieldDesc>();
        Search searchAll = (Search) type.getAnnotation(Search.class);
        if (MapUtils.isNotEmpty(paramExpressions)) {
            for (Map.Entry<String, Object> param : paramExpressions.entrySet()) {
                String paramName = param.getKey();
                if (paramName.startsWith(SEARCH_PRE)) {
                    SearchFieldDesc desc = parseParamName(paramName);
                    String fieldName = desc.getName();
                    Field field = ObjectTools.getField(type, paramName);
                    Search search = field.getAnnotation(Search.class);
                    if ((searchAll != null && searchAll.all()) || (search != null && search.search())) {
                        Class javaType = field.getType();
                        Object value = param.getValue();
                        Object typeValue = ConvertUtils.convert(value, javaType);
                        desc.setValue(typeValue);
                        searchFieldDescs.add(desc);
                    }
                }
            }
        }
        return searchFieldDescs;
    }

    private static Map<String, Object> transform2HashMap(HttpServletRequest request) {
        Map<String, Object> params = new HashMap<String, Object>();
        Enumeration<String> paramsName = request.getParameterNames();
        while (paramsName.hasMoreElements()) {
            String paramName = paramsName.nextElement();
            params.put(paramName, request.getParameter(paramName));
        }
        return params;
    }

    public static List<SearchFieldDesc> parseSort(String sortsExpression, Class type) {
        List<SearchFieldDesc> sortFields = new ArrayList<SearchFieldDesc>();
        if (StringUtils.isNotEmpty(sortsExpression)) {
            String[] sortArr = sortsExpression.split(StringTools.COMMA);
            Search searchAll = (Search) type.getAnnotation(Search.class);
            for (String sort : sortArr) {
                String[] sortDesc = sort.split(StringTools.MINUS);
                Field field = ObjectTools.getField(type, sortDesc[0]);
                Search search = field.getAnnotation(Search.class);
                if ((searchAll != null && searchAll.all()) || (search != null && search.sort())) {
                    sortFields.add(new SearchFieldDesc(sortArr[0], SqlOperator.valueOf(sortDesc[1])));
                }
            }
        }
        return sortFields;
    }

    public static <T> Specification<T> buildSpecification(final List<SearchFieldDesc> searchFieldDescs) {
        return new Specification<T>() {
            @Override
            public Predicate toPredicate(Root<T> root, CriteriaQuery<?> query, CriteriaBuilder cb) {
                if (CollectionUtils.isNotEmpty(searchFieldDescs)) {
                    List<Predicate> predicates = new ArrayList<Predicate>(searchFieldDescs.size());
                    for (SearchFieldDesc desc : searchFieldDescs) {
                        // nested path translate, 如Task的名为"user.name"的filedName, 转换为Task.user.name属性
                        String[] names = StringUtils.split(desc.name, ".");
                        Path expression = root.get(names[0]);
                        for (int i = 1; i < names.length; i++) {
                            expression = expression.get(names[i]);
                        }
                        // logic operator
                        switch (desc.operator) {
                            case EQ:
                                predicates.add(cb.equal(expression, desc.value));
                                break;
                            case LIKE:
                                predicates.add(cb.like(expression, "%" + desc.value + "%"));
                                break;
                            case GT:
                                predicates.add(cb.greaterThan(expression, (Comparable) desc.value));
                                break;
                            case LT:
                                predicates.add(cb.lessThan(expression, (Comparable) desc.value));
                                break;
                            case GTE:
                                predicates.add(cb.greaterThanOrEqualTo(expression, (Comparable) desc.value));
                                break;
                            case LTE:
                                predicates.add(cb.lessThanOrEqualTo(expression, (Comparable) desc.value));
                                break;
                        }
                    }
                    if (CollectionUtils.isNotEmpty(predicates)) {
                        return cb.and(predicates.toArray(new Predicate[predicates.size()]));
                    }
                }
                return cb.conjunction();
            }
        };
    }

    private static SearchFieldDesc parseParamName(String paramName) {
        String[] arr = paramName.split(StringTools.MINUS);
        String name = arr[1];
        SqlOperator operator;
        if (arr.length > 2) {
            operator = SqlOperator.valueOf(arr[2]);
        } else {
            operator = SqlOperator.EQ;
        }
        return new SearchFieldDesc(name, operator);
    }

    public static class SearchFieldDesc {
        private String name;
        private SqlOperator operator;
        private Object value;

        public SearchFieldDesc(String name, SqlOperator operator) {
            this.name = name;
            this.operator = operator;
        }

        public String getName() {
            return name;
        }

        public void setName(String name) {
            this.name = name;
        }

        public SqlOperator getOperator() {
            return operator;
        }

        public void setOperator(SqlOperator operator) {
            this.operator = operator;
        }

        public Object getValue() {
            return value;
        }

        public void setValue(Object value) {
            this.value = value;
        }
    }

    public static class JpaQueryConditions<T> {
        private Specification<T> searches;
        private Sort sorts;

        public JpaQueryConditions(Specification<T> searches, Sort sorts) {
            this.searches = searches;
            this.sorts = sorts;
        }

        public Specification<T> getSearches() {
            return searches;
        }

        public void setSearches(Specification<T> searches) {
            this.searches = searches;
        }

        public Sort getSorts() {
            return sorts;
        }

        public void setSorts(Sort sorts) {
            this.sorts = sorts;
        }
    }
}
