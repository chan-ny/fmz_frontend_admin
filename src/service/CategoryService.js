import api from './api';

export default{
    index(){
        return api().get("category");
    },
    create(category){
        return api().post("category",category);
    },
    update(category){
        return api().put("category/"+category.ctId,category);
    },
    remove(category){
        return api().delete("category/"+category);
    },
    show(ctId){
        return api().get("category/"+ctId);
    }

}