package com.huanwuji.entity.query;

import com.huanwuji.entity.bean.SystemCode;
import com.mysema.query.types.PathMetadata;
import com.mysema.query.types.path.*;

import static com.mysema.query.types.PathMetadataFactory.forVariable;

/**
 * description:.
 * User: huanwuji
 * create: 13-6-17 下午10:56
 */
public class QSystemCode extends EntityPathBase<SystemCode> {

    private static final PathInits INITS = PathInits.DIRECT;
    public static final String ROOT = "systemCode";

    public static final String ID = "id";
    public static final String CODE = "code";
    public static final String NAME = "name";
    public static final String LEAF = "leaf";
    public static final String TREE_ID = "treeId";
    public static final String DESCR = "descr";
    public static final String TYPE = "type";
    public static final String VALID = "valid";
    public static final String PARENT = "parent";
    public static final String SUB_CODE = "subCode";

    public static final QSystemCode SYSTEM_CODE = new QSystemCode(ROOT);
    public final NumberPath<Long> id = createNumber(ID, Long.class);
    public final StringPath code = createString(CODE);
    public final StringPath name = createString(NAME);
    public final BooleanPath leaf = createBoolean(LEAF);
    public final StringPath treeId = createString(TREE_ID);
    public final StringPath descr = createString(DESCR);
    public final NumberPath<Integer> type = createNumber(TYPE, Integer.class);
    public final BooleanPath vaild = createBoolean(VALID);
    public final QSystemCode parent;

    public QSystemCode(String variable) {
        this(SystemCode.class, forVariable(variable), INITS);
    }

    public QSystemCode(BeanPath<? extends SystemCode> entity) {
        this(entity.getType(), entity.getMetadata(), INITS);
    }

    public QSystemCode(PathMetadata<?> metadata) {
        this(metadata, metadata.isRoot() ? INITS : PathInits.DEFAULT);
    }

    public QSystemCode(PathMetadata<?> metadata, PathInits inits) {
        this(SystemCode.class, metadata, inits);
    }

    public QSystemCode(Class<? extends SystemCode> type, PathMetadata<?> metadata, PathInits inits) {
        super(type, metadata, inits);
//        this.parent = inits.isInitialized(PARENT) ? new QSystem(forProperty("key")) : null;
        this.parent = inits.isInitialized(PARENT) ? new QSystemCode(forProperty(PARENT), inits.get(PARENT)) : null;
    }
}

