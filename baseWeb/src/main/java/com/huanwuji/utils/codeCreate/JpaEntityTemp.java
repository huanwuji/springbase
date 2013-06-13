package com.huanwuji.utils.codeCreate;

import com.huanwuji.utils.CollectionUtils;
import com.huanwuji.utils.codeCreate.pdm.Column;
import com.huanwuji.utils.codeCreate.pdm.PdmModel;
import com.huanwuji.utils.codeCreate.pdm.Reference;
import com.huanwuji.utils.codeCreate.pdm.Table;
import org.bee.tl.core.Template;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Set;

/**
 * Created with IntelliJ IDEA.
 * <p/>
 * User: juyee
 * Date: 12-9-7
 * Time: 下午1:10
 * To change this template use File | Settings | File Templates.
 */
public class JpaEntityTemp extends CommonTemp {

    public JpaEntityTemp(PdmModel pdmModel, Template template, Table table) {
        super(pdmModel, template, table);
    }

    @Override
    protected void dataProcess(PdmModel pdmModel, Template template) {
        super.dataProcess(pdmModel, template);
        Table table = super.table;

        Map<String, List<Reference>> referenceMap = pdmModel.getReferenceMap();

        List<Column> keys = table.getKeys();
        Set keyCodeSet = CollectionUtils.listToSet(keys, "code", String.class);

        List<Column> ordinaryCols = new ArrayList<Column>();

        List<Reference> references = new ArrayList<Reference>();
        for (Column column : table.getColumns()) {
            //去除主键，默认使用IdEntity
            if (keyCodeSet.contains(column.getCode())) {
                continue;
            }
            if (referenceMap.containsKey(column.getId())) {
                references.addAll(referenceMap.get(column.getId()));
                continue;
            }
            ordinaryCols.add(column);
        }
        template.set("ordinaryCols", ordinaryCols);
        template.set("references", references);
        template.set("referenceMap", referenceMap);
    }
}
