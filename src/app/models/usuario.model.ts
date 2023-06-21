import { environment } from '../../environments/environment';

 
const base_url = environment.base_url;
// creamos el modelo de usuario

export class Usuario {

    constructor(
        public nombre: string,
        public email: string,
        public img: string,
        public role?: string,
        public password?: string,
        public uid?: string,  
        public google?: string,
    ){ 
      
    }

    // upload/usuarios/no-imagen

  


   get imagenUrl() {

    // /upload/usuarios/hgdfsjd
   
    if (this.img?.includes('https')) {
      return this.img
    }
     
        if (this.img) {
          
          return `${base_url}/upload/usuarios/${this.img}`;
         
          
        } else {
          
          return `${base_url}/upload/usuarios/no-imagen`;
        }
      
      }

    get imagenUrl1(){
        if (typeof this.img === 'string' && this.img?.includes('https')) {
            return `${base_url}/upload/usuarios/${this.img}`;
          }
        
          if (this.img && typeof this.img === 'string') {
            return `${base_url}/upload/usuarios/${this.img}`;
          } else {
            return `${base_url}/upload/usuarios/no-imagen`;
          }
    }
    
    
       
           
    
    


}