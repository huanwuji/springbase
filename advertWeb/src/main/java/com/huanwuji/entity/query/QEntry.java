package com.huanwuji.entity.query;

import com.huanwuji.entity.bean.Entry;
import com.mysema.query.types.PathMetadata;
import com.mysema.query.types.path.*;

import static com.mysema.query.types.PathMetadataFactory.forVariable;

/**
 * description:.
 * User: huanwuji
 * create: 13-6-17 下午10:56
 */
public class QEntry extends EntityPathBase<Entry> {

    private static final PathInits INITS = PathInits.DIRECT;
    public static final String ROOT = "entry";

    public static final String ID = "id";
    public static final String CODE = "code";
    public static final String NAME = "name";
    public static final String TITLE = "title";
    public static final String URL = "url";
    public static final String ICON = "icon";
    public static final String TYPE = "type";
    public static final String CONTENT = "content";
    public static final String VALID = "valid";
    public static final String FK = "fk";

    public static final QEntry ENTRY = new QEntry(ROOT);
    public final NumberPath<Long> id = createNumber(ID, Long.class);
    public final NumberPath<Long> fk = createNumber(FK, Long.class);
    public final StringPath code = createString(CODE);
    public final StringPath name = createString(NAME);
    public final StringPath url = createString(URL);
    public final StringPath icon = createString(ICON);
    public final NumberPath<Integer> type = createNumber(TYPE, Integer.class);
    public final BooleanPath vaild = createBoolean(VALID);

    public QEntry(String variable) {
        this(Entry.class, forVariable(variable), INITS);
    }

    public QEntry(BeanPath<? extends Entry> entity) {
        this(entity.getType(), entity.getMetadata(), INITS);
    }

    public QEntry(PathMetadata<?> metadata) {
        this(metadata, metadata.isRoot() ? INITS : PathInits.DEFAULT);
    }

    public QEntry(PathMetadata<?> metadata, PathInits inits) {
        this(Entry.class, metadata, inits);
    }

    public QEntry(Class<? extends Entry> type, PathMetadata<?> metadata, PathInits inits) {
        super(type, metadata, inits);
    }
}

