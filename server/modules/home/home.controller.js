import {getHomeViewModel} from './home.service.js'


export default function renderHome(req ,res){
    //CARGANDO EL VIEWMODEL
    const viewModel = getHomeViewModel()
    //ENTREGANDO LA VISTA 
    res.render ('index',viewModel)
}