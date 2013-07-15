package com.huanwuji.entity.query;

import com.huanwuji.entity.bean.Item;
import com.mysema.query.types.PathMetadata;
import com.mysema.query.types.path.*;

import static com.mysema.query.types.PathMetadataFactory.forVariable;

/**
 * description:.
 * User: huanwuji
 * create: 13-6-17 下午10:56
 */
public class QItem extends EntityPathBase<Item> {

    private static final PathInits INITS = PathInits.DIRECT;
    public static final String ROOT = "item";

    public static final String ID = "id";
    public static final String NAME = "name";
    public static final String TITLE = "title";
    public static final String PRICE = "price";
    public static final String ICON = "icon";
    public static final String DESCR = "descr";
    public static final String TYPE = "type";
    public static final String VALID = "valid";
    public static final String CATEGORY = "category";

    public static final QItem Item = new QItem(ROOT);
    public final NumberPath<Long> id = createNumber(ID, Long.class);
    public final StringPath name = createString(NAME);
    public final StringPath icon = createString(ICON);
    public final NumberPath<Integer> type = createNumber(TYPE, Integer.class);
    public final BooleanPath vaild = createBoolean(VALID);
    public final QSystemCode category;

    public QItem(String variable) {
        this(Item.class, forVariable(variable), INITS);
    }

    public QItem(BeanPath<? extends Item> entity) {
        this(entity.getType(), entity.getMetadata(), INITS);
    }

    public QItem(PathMetadata<?> metadata) {
        this(metadata, metadata.isRoot() ? INITS : PathInits.DEFAULT);
    }

    public QItem(PathMetadata<?> metadata, PathInits inits) {
        this(Item.class, metadata, inits);
    }

    public QItem(Class<? extends Item> type, PathMetadata<?> metadata, PathInits inits) {
        super(type, metadata, inits);
        this.category = inits.isInitialized(CATEGORY) ? new QSystemCode(forProperty(CATEGORY), inits.get(CATEGORY)) : null;
    }
}

