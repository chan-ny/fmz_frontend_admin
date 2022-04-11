import api from '../api';

export default{
    displayProduct(supId){
        return api().get("selectproduct/"+supId);
    },
   checkBill(importId){
       return api().get("checkbill/"+importId);
   },
   searchStorage(product,size){
       return api().get('selectstorage/'+product+'/'+size);
   }
}