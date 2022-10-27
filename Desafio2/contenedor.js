const fs = require("fs");

class Contenedor {

    constructor(filename){
        this.filename=filename
    }

    async save(producto){
        try {
            if(fs.existsSync(this.filename)){
                const productos = await this.getAll();
                if(productos.length>0){
                    const lastId = productos[productos.length-1].id+1;
                    producto.id = lastId;
                    productos.push(producto);
                    await fs.promises.writeFile(this.filename, JSON.stringify(productos,null,2));
                    //console.log("Se agrega nuevo producto al arreglo")
                    
                }else{
                    producto.id = 1;
                    await fs.promises.writeFile(this.filename, JSON.stringify([producto],null,2));
                    //console.log("Se crea arreglo con el primer producto");
                    
                }
            }else{
                producto.id = 1;
                await fs.promises.writeFile(this.filename, JSON.stringify([producto],null,2));
                //console.log("Se crea arreglo con el primer producto");
                
            }
            return "Producto guardado en el archivo";

        } catch (error) {
            //console.log("error al guardar: ",error);
            return "Error al guardar el archivo";
        }
    }

    async getAll(){
        try {
            const contenido = await fs.promises.readFile(this.filename,"utf-8");
            
           if(contenido.length>0){
                const productos = JSON.parse(contenido);
                //console.log(productos);
                return productos;
           }else{
            //console.log("Archivo vacío")
            return "Archivo vacío"
           }

        } catch (error) {
            //console.log("Error al leer el archivo", error)
            return "Error al leer el archivo";
        }
    }

    async getById(id){
        try {
            const productos = await this.getAll();
            const producto = await productos.find(elemento=>elemento.id === id);
            //console.log("getById();",producto);
            return producto;
        } catch (error) {
            //console.log("El producto no se encuentra en el arreglo");
            return "El producto no se encuentra en el arreglo";
            
        }
    }

    async deleteById(id){
        try {
            const productos = await this.getAll();
            const newProducts = await productos.filter(elemento=>elemento.id !== id);
            await fs.promises.writeFile(this.filename, JSON.stringify(newProducts,null,2));
            //console.log("Se quita producto del arreglo por ID")
            return "Producto eliminado";
        } catch (error) {
            //console.log("error al quitar elemento del arreglo")
            return "error al quitar elemento del arreglo";
            
        }
    }

    async deleteAll(){
        try {
            
            await fs.promises.writeFile(this.filename, JSON.stringify([],null,2));
            //console.log("Se quita producto del arreglo por ID")
            return "Se han eliminado todos los productos";
        } catch (error) {
            //console.log("error al quitar elemento del arreglo")
            return "error al escribir el archivo";
            
        }
    }

}

const producto1 = {
    "title":"Producto1",
    "price":456.78,
    "thumbnail":"https://cdn3.iconfinder.com/data/icomns/education-209/64/ruler-triangle-stationary-school-256.png"
}
const producto2 = {
    "title":"Producto2",
    "price":567.89,
    "thumbnail":"https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png"
}
const producto3 = {
    "title":"Producto3",
    "price":678.90,
    "thumbnail":"https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geography-planet-school-256.png"
}
const producto4 = {
    "title":"Producto4",
    "price":789.10,
    "thumbnail":"https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geography-planet-school-256.png"
}

const manejador = new Contenedor("productos.txt")

const ejecutar = async()=>{

    //getAll()
    const resp = await manejador.getAll();
    console.log("getData: ",resp);

    //save()
    const respsave1 = await manejador.save(producto1);
    console.log("SavePropducto1: ", respsave1);
    const respsave2 = await manejador.save(producto2);
    console.log("SavePropducto1: ", respsave2);
    const respsave3 = await manejador.save(producto3);
    console.log("SavePropducto1: ", respsave3);
    const respsave4 = await manejador.save(producto4);
    console.log("SavePropducto1: ", respsave4);

    //getbyId()
    const respgetbyId1 = await manejador.getById(3);
    console.log("getById; ",respgetbyId1);
    const respgetbyId2 = await manejador.getById(4);
    console.log("getById; ",respgetbyId2);

    //deleteById
    const respdeleteById1 = await manejador.deleteById(1);
    console.log("deteleById; ",respdeleteById1);
    const respdeleteById2 = await manejador.deleteById(2);
    console.log("deteleById; ",respdeleteById2);


    //deleteAll()
    const respDeleteall = await manejador.deleteAll();
    console.log("delete all")

}
//ejecutar();


module.exports = Contenedor;