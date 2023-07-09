const { createApp } = Vue
  createApp({
    data() {
      return {
        productos:[],
        url:'http://ivanrod.pythonanywhere.com/productos',  
        error:false,
        cargando:true,
        id:0,
        nombre:"", 
        imagen:"",
        stock:0,
        precio:0,
    }  
    },
    methods: {
        fetchData(url) {
            fetch(url)
            .then(response => response.json())
            .then(data => {
                this.productos = data;
                this.cargando=false
            })
            .catch(err => {
                console.error(err);
                this.error=true              
            })
    },
    eliminar(id) {
        const url = this.url+'/' + id;
        var options = {
            method: 'DELETE',
        }
        fetch(url, options)
            .then(res => res.text())
            .then(res => {
         alert('Registro Eliminado')
                location.reload(); // recarga el json luego de eliminado el registro
            })
    },
    grabar(){
        let producto = {
            nombre:this.nombre,
            precio: this.precio,
            stock: this.stock,
            imagen:this.imagen
        }
        var options = {
            body:JSON.stringify(producto),
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            redirect: 'follow'
        }
        fetch(this.url, options)
            .then(function () {
                alert("Registro grabado")
                window.location.href = "./productos.html";  
            })
            .catch(err => {
                console.error(err);
                alert("Error al Grabar") 
            })      
    },
    formatear(){
        const url = this.url;

        var options = {
            method : 'DELETE',
        }
        fetch(url, options)
            .then(res => res.text()) 
            .then(res => {
         alert('Registros Eliminados')
                location.reload(); 
            })
    },
    mounted(){
        axios.get('http://ivanrod.pythonanywhere.com/productos')
        .then(response => {
            this.productos = response.data;
        })
        .catch(error => {console.log(error)})
    }
},
created() {
    this.fetchData(this.url)
},
}).mount('#app')