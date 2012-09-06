//package com.justonetech.test;
//
//import com.justonetech.pagd.domain.ProjectInfo;
//import com.justonetech.pagd.domain.ProjectWorkDanger;
//import com.justonetech.pagd.domain.ProjectWorkSite;
//import com.justonetech.test.flexJson.SimpleObjectTransformer;
//import flexjson.JSONSerializer;
//import flexjson.TransformerUtil;
//import flexjson.transformer.TransformerWrapper;
//import flexjson.transformer.TypeTransformerMap;
//import org.apache.commons.lang.reflect.FieldUtils;
//
//import java.util.ArrayList;
//import java.util.List;
//
///**
// * Created with IntelliJ IDEA.
// * <p/>
// * User: juyee
// * Date: 12-9-4
// * Time: 下午1:39
// * To change this template use File | Settings | File Templates.
// */
//public class FlexJsonTest {
//
//    public static void main(String[] args) throws IllegalAccessException {
//
//        ProjectWorkDanger projectWorkDanger = new ProjectWorkDanger();
//        projectWorkDanger.setDangerCode("dangercode");
//
//        ProjectWorkSite projectWorkSite = new ProjectWorkSite();
//        projectWorkSite.setWorkCode("workcode");
//        projectWorkSite.setAddress("ddddddddddddddd");
//        projectWorkDanger.setWorkSite(projectWorkSite);
//
//        ProjectInfo projectInfo = new ProjectInfo();
//        projectInfo.setBuildCode("buildCode");
//        projectWorkSite.setProject(projectInfo);
//
//        List<ProjectWorkDanger> projectWorkDangers = new ArrayList<ProjectWorkDanger>();
//        projectWorkDangers.add(projectWorkDanger);
//        projectWorkDangers.add(projectWorkDanger);
//
//        JSONSerializer jsonSerializer = new JSONSerializer();
//
//        TypeTransformerMap defaultTransformers = TransformerUtil.getDefaultTypeTransformers();
//        SimpleObjectTransformer simpleObjectTransformer = new SimpleObjectTransformer();
////        simpleObjectTransformer.addObjectProcesser("", "workSite.workCode").addPropertyProcesser("workSite", "address").addPropertyFilter("*", true);
//        simpleObjectTransformer.addObjectProcesser("workSite", "project.buildCode");//
//
//        defaultTransformers.put(Object.class, new TransformerWrapper(simpleObjectTransformer));
//        TypeTransformerMap typeTransformerMap = new TypeTransformerMap(defaultTransformers);
//        FieldUtils.writeDeclaredField(jsonSerializer, "typeTransformerMap", typeTransformerMap, true);
//
//        String json = jsonSerializer.exclude("workSite.project")
//                .deepSerialize(projectWorkDangers);
//
//        System.out.println("json = " + json);
//    }
//}
