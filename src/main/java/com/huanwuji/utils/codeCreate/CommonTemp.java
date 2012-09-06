package com.huanwuji.utils.codeCreate;

import com.huanwuji.utils.codeCreate.pdm.PdmModel;
import com.huanwuji.utils.codeCreate.pdm.Table;
import org.bee.tl.core.BeeException;
import org.bee.tl.core.Template;

import java.io.IOException;
import java.io.Writer;

/**
 * Created with IntelliJ IDEA.
 * <p/>
 * User: juyee
 * Date: 12-9-4
 * Time: 上午11:01
 * To change this template use File | Settings | File Templates.
 */
public class CommonTemp {

    private PdmModel pdmModel;

    private Template template;

    private Table table;

    public CommonTemp(PdmModel pdmModel, Template template, Table table) {
        this.pdmModel = pdmModel;
        this.template = template;
        this.table = table;
    }

    public void outWriter(Writer writer) {
        dataProcess(pdmModel, template);
        try {
            this.template.getText(writer);
        } catch (IOException e) {
            e.printStackTrace();
        } catch (BeeException e) {
            e.printStackTrace();
        }
    }

    protected void dataProcess(PdmModel pdmModel, Template template) {
        template.set("table", this.table);
    }
}
