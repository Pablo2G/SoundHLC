import { Component } from '@angular/core';
import { ANIMALES } from '../../data/data.animales';
import { Animal } from '../../interfaces/animal.interface';
// 
import { Refresher } from "ionic-angular";


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  
  //
  animales: Animal[] = [];
  // La clase de Aduio es de Angular
  audio = new Audio();
  audioTiempo: any;

  constructor() {
    // HAcemos un clon de Animales para no borrar nada de nuestro fichero que esta en data
    this.animales = ANIMALES.slice(0);
  }

  reproducir(animal: Animal){
    // Nos muesta por consola el JSON del animal que estamos pulsando
    console.log(animal);
    
    // Evita que monte los animales con la funcion pausar Audio
    this.puasarAudio(animal);
    
    // Cardamos en el SRC el audio del animal
    this.audio.src = animal.audio;
    // Cargamos en Audio
    this.audio.load();
    // Reporducimos el udio
    this.audio.play();

    animal.reproduciendo = true;
    
    // Set time out nos sirve para poner la propiedad en false y la duraccion 1000ms son 1 segundo * duracion del animal
    setTimeout( () => animal.reproduciendo = false, animal.duracion * 1000);
  }
  
  // Esta función es para pausar el sonido y no se reproduzcan más de uno a la vez
  private puasarAudio(animalSeleccionado: Animal){
    
    clearTimeout(this.audioTiempo);
    
    this.audio.pause();

    this.audio.currentTime = 0;

    for(let animal of this.animales){
      if(animal.nombre != animalSeleccionado.nombre){
        animal.reproduciendo = false;
      }
    }
  }
  
  // Ha borrar se le pasa el ID del elemento que se desea borrar
  // Los datos borrados se hacen en el clon al refrescar las paginas se vuelve a cargar todos los datos
  borrarAnimal(id: number){
    // SPLICE borrar se posiciona en el elemento que deseemos borrar (id) y borramos un elemento (1)
    this.animales.splice(id,1);
  }

  recargar(refresher: Refresher){
    console.log("Inicio del refresh");
    
    setTimeout(() => {
        console.log("Fin de refresh");
        this.animales = ANIMALES.splice(0);
    }, 2000);

    refresher.complete();
  }
}
