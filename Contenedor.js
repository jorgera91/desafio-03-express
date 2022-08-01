const fs = require('fs');

class Contenedor {

    constructor(ruta){
        this.ruta = ruta;
    }

    async save(obj){

        const products = await this.getAll();
        obj.id = (products.length + 1);
        products.push(obj);

        try {
            await fs.promises.writeFile(this.ruta,JSON.stringify(products,null,2));
            return obj.id;
        } catch (error) {
            throw new Error('Ocurrio un eror al crear el archivo')
        }

       
    }

    async getById(id){
        const products = await this.getAll();
        const productById = products.find(product => product.id == id);
        return  (productById === undefined) ? 'PRODUCTO NO ENCONTRADO' : productById; 
    }

    async getAll(){
        //Si no existe el archivo lo creamos
         if (!fs.existsSync(this.ruta)) {
            try {
                await fs.promises.writeFile(this.ruta,'');
            } catch (error) {
                throw new Error('Ocurrio un eror al crear el archivo')
            }
          }  
        
        try {
            const products = await fs.promises.readFile(this.ruta, 'utf-8');
            return JSON.parse(products);
        } catch (error) {
           return [];
        } 
    }

    async deleteById(id){
        const products = await this.getAll();
        const newListProducts = products.filter(data => data.id != id);
        try {
            await fs.promises.writeFile(this.ruta,JSON.stringify(newListProducts,null,2));
        } catch (error) {
            throw new Error('Ocurrio un eror al sobreescribir el archivo')
        }
    }
    
    async deleteAll(){
        try {
            await fs.promises.writeFile(this.ruta,'');
        } catch (error) {
            throw new Error('Ocurrio un eror al sobreescribir el archivo')
        }
    }

}

module.exports = Contenedor;