package com.huanwuji.utils.codeCreate;

import com.huanwuji.utils.codeCreate.pdm.PdmModel;
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

    public CodeBuilder(String basePath, PdmModel pdmModel) {
        this.groupTemplate = initGroupTemplate(basePath);
        this.pdmModel = pdmModel;
    }

    public GroupTemplate initGroupTemplate(String basePath) {
        GroupTemplate group = new GroupTemplate(new File(basePath));
        group.setCharset("UTF-8");
        group.config("<!--:", "-->", "${", "}");
        return group;
    }

    public void createService(String tempPath, String path) {
        try {
            Template template = this.groupTemplate.getFileTemplate(tempPath);
            CommonTemp commonTemp = new CommonTemp(this.pdmModel, template);
            commonTemp.process(new FileWriter(path));
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
