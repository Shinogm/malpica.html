export class Pelicula {
    constructor(titulo, director, clasificacion, genero, anioEstreno) {
        this.titulo = titulo;
        this.director = director;
        this.clasificacion = clasificacion;
        this.genero = genero;
        this.anioEstreno = anioEstreno;
        this.calificaciones = [];
    }

    calcularAntiguedad() {
        const anioActual = new Date().getFullYear();
        return anioActual - this.anioEstreno;
    }

    agregarCalificacion(calificacion) {
        if (calificacion >= 1 && calificacion <= 5) {
            this.calificaciones.push(calificacion);
            return true;
        }
        return false;
    }

    calcularPromedioCalificacion() {
        if (this.calificaciones.length === 0) {
            return 0;
        }
        const suma = this.calificaciones.reduce((total, calif) => total + calif, 0);
        return suma / this.calificaciones.length;
    }
}

export class Logic {
    constructor() {}
    
    getMovies() {
        const movies = [
            new Pelicula("Interstellar", "Christopher Nolan", "PG-13", "Ciencia Ficción", 2014),
            new Pelicula("El Padrino", "Francis Ford Coppola", "R", "Drama", 1972),
            new Pelicula("Pulp Fiction", "Quentin Tarantino", "R", "Crimen", 1994)
        ];
        
        // Agregamos algunas calificaciones de ejemplo
        movies[0].agregarCalificacion(5);
        movies[0].agregarCalificacion(4);
        movies[1].agregarCalificacion(5);
        movies[1].agregarCalificacion(5);
        movies[2].agregarCalificacion(4);
        movies[2].agregarCalificacion(3);
        
        return movies;
    }
}