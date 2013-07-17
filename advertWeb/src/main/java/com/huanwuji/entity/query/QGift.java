package com.huanwuji.entity.query;

import com.huanwuji.entity.bean.Gift;
import com.mysema.query.types.PathMetadata;
import com.mysema.query.types.path.*;

import static com.mysema.query.types.PathMetadataFactory.forVariable;

/**
 * description:.
 * User: huanwuji
 * create: 13-6-17 下午10:56
 */
public class QGift extends EntityPathBase<Gift> {

    private static final PathInits INITS = PathInits.DIRECT;
    public static final String ROOT = "gift";

    public static final String ID = "id";
    public static final String NAME = "name";
    public static final String TITLE = "title";
    public static final String PRICE = "price";
    public static final String ICON = "icon";
    public static final String DESCR = "descr";
    public static final String TYPE = "type";
    public static final String VALID = "valid";
    public static final String CATEGORY = "category";

    public static final QGift Gift = new QGift(ROOT);
    public final NumberPath<Long> id = createNumber(ID, Long.class);
    public final StringPath name = createString(NAME);
    public final StringPath icon = createString(ICON);
    public final NumberPath<Integer> type = createNumber(TYPE, Integer.class);
    public final BooleanPath vaild = createBoolean(VALID);
    public final QSystemCode category;

    public QGift(String variable) {
        this(Gift.class, forVariable(variable), INITS);
    }

    public QGift(BeanPath<? extends Gift> entity) {
        this(entity.getType(), entity.getMetadata(), INITS);
    }

    public QGift(PathMetadata<?> metadata) {
        this(metadata, metadata.isRoot() ? INITS : PathInits.DEFAULT);
    }

    public QGift(PathMetadata<?> metadata, PathInits inits) {
        this(Gift.class, metadata, inits);
    }

    public QGift(Class<? extends Gift> type, PathMetadata<?> metadata, PathInits inits) {
        super(type, metadata, inits);
        this.category = inits.isInitialized(CATEGORY) ? new QSystemCode(forProperty(CATEGORY), inits.get(CATEGORY)) : null;
    }
}

