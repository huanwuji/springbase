package com.huanwuji.utils.codeCreate;

import com.huanwuji.utils.codeCreate.pdm.PdmModel;
import com.huanwuji.utils.codeCreate.pdm.Table;
import org.bee.tl.core.GroupTemplate;
import org.bee.tl.core.Template;

import java.io.File;
import java.io.FileWriter;
import java.io.IOException;

/**
 * Created with IntelliJ IDEA.
 * <p/>
 * User: huanwuji
 * Date: 12-9-5
 * Time: 下午9:27
 * To change this template use File | Settings | File Templates.
 */
public class CodeBuilder {

    private GroupTemplate groupTemplate;

    private PdmModel pdmModel;

    private Table table;

    public Table getTable() {
        return table;
    }

    public void setTable(Table table) {
        this.table = table;
    }

    public void setTable(String tableName) {
        this.table = this.pdmModel.getTableByName(tableName);
    }

    public CodeBuilder(String basePath, PdmModel pdmModel) {
        this.groupTemplate = initGroupTemplate(basePath);
        this.pdmModel = pdmModel;
    }

    private GroupTemplate initGroupTemplate(String basePath) {
        GroupTemplate group = new GroupTemplate(new File(basePath));
        group.setCharset("UTF-8");
        group.config("<%", "%>", "${", "}");
        group.enableNativeCall();
        return group;
    }

    public void createService(String tempPath, String outPath) {
        try {
            Template template = this.groupTemplate.getFileTemplate(tempPath);
            CommonTemp commonTemp = new CommonTemp(this.pdmModel, template, this.table);
            commonTemp.outWriter(new FileWriter(outPath));
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public void createEntity(String tempPath, String outPath) {
        try {
            Template template = this.groupTemplate.getFileTemplate(tempPath);
            JpaEntityTemp jpaEntityTemp = new JpaEntityTemp(this.pdmModel, template, this.table);
            jpaEntityTemp.outWriter(new FileWriter(outPath));
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
