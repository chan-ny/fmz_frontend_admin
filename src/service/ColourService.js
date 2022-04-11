import api from './api';

export default{
    index(){
        return api().get("colour");
    },
    create(colour){
        return api().post("colour",colour);
    },
    update(colour){
        return api().put("colour/"+colour.cId,colour);
    },
    remove(colour){
        return api().delete("colour/"+colour);
    }
}
