import api from './api'

export default{
    index(){
        return api().get("supplier");
    },
    show(supId){
       return api().get("supplier/"+supId);
    },
    create(sup){
        return api().post("supplier",sup);
    },
    update(sup){
        return api().put("supplier/"+sup.supId,sup);
    },
    remove(sup){
        return api().delete("supplier/"+sup);
    }

}