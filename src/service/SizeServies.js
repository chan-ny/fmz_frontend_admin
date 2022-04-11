import api from './api';

export default{
       
    index(){
        return api().get("size")
    },
    create(size){
        return api().post("size",size)
    },
    update(size){
        return api().put("size/"+size.sId,size)
    },
    remove(size){
        return api().delete("size/"+size)
    }
}