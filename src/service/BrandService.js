import api from '../service/api'

export default{
    index(){
        return api().get('brand')
    },
    create(brand){
        return api().post('brand',brand)
    },
    remove(brandId){
        return api().delete('brand/'+brandId)
    },
    update(brand){
        return api().put('brand/'+brand.bId,brand)
    },
    show(brandId){
        return api().get("brand/"+brandId);
    }

}