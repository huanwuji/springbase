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
        PdmParse pdmParse = new PdmParse();
        PdmModel pdmModel = pdmParse.parsePdm(basePath + "\\PhysicalDataModel_1.pdm");
        CodeBuilder codeBuilder = new CodeBuilder(basePath, pdmModel);
        List<Table> tables = pdmModel.getTables();
//        for (Table table : tables) {
            codeBuilder.setTable("table_6");
            codeBuilder.createService("\\temp\\RepositoryTemp.jsp"
                    , basePath + "\\outPut\\" + codeBuilder.getTable().getUClassName() + "Repository.java");
            codeBuilder.createEntity("\\temp\\EntityTemp.jsp"
                    , basePath + "\\outPut\\" + codeBuilder.getTable().getUClassName() + ".java");
//        }
    }
}
