import { v4 as uuidv4 } from 'uuid';
export const getUUID=()=>{
    let uuidTOKEN=localStorage.getItem('UUIDTOKEN')
    if(!uuidTOKEN){
        uuidTOKEN=uuidv4()
        localStorage.setItem('UUIDTOKEN',uuidTOKEN)
    }
    return uuidTOKEN
}