package com.huanwuji.utils.codeBatchCreate;

import com.huanwuji.utils.codeCreate.CodeBuilder;
import com.huanwuji.utils.codeCreate.pdm.PdmModel;
import com.huanwuji.utils.codeCreate.pdm.PdmParse;
import com.huanwuji.utils.codeCreate.pdm.Table;
import org.dom4j.DocumentException;

import java.util.List;

/**
 * Created with IntelliJ IDEA.
 * <p/>
 * User: juyee
 * Date: 12-9-6
 * Time: 上午10:12
 * To change this template use File | Settings | File Templates.
 */
public class CodebuilderTest {

    public static void main(String[] args) throws DocumentException {
//        String basePath = "E:\\git\\springbase\\src\\test\\/java\\com\\huanwuji\\utils\\codeBatchCreate";
        String basePath = "D:\\git\\springbase\\src\\test\\java\\com\\huanwuji\\utils\\codeBatchCreate";
        String packagePath = "D:\\git\\springbase\\src\\main\\java\\com\\huanwuji\\";
        PdmParse pdmParse = new PdmParse();
        PdmModel pdmModel = pdmParse.parsePdm(basePath + "\\baseProject.pdm");
        CodeBuilder codeBuilder = new CodeBuilder(basePath, pdmModel);
        List<Table> tables = pdmModel.getTables();
//        for (Table table : tables) {
        codeBuilder.setTable("MENU");
        codeBuilder.createEntity("\\temp\\EntityTemp.jsp"
                , packagePath + "entity\\bean\\" + codeBuilder.getTable().getUClassName() + ".java");
        codeBuilder.createService("\\temp\\RepositoryTemp.jsp"
                , packagePath + "repository\\" + codeBuilder.getTable().getUClassName() + "Repository.java");
//        }
    }
}
