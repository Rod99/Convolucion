import { Component, OnInit } from '@angular/core';
import {Chart} from 'chart.js';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent implements OnInit {
  public signalOne: number[]; // Este arreglo representa a la secuencia uno
  public signalTwo: number[]; // Este arreglo representa a la secuencia dos
  public centerFirst: number; // Este numero representa el valor del centro de la primer secuencia
  public centerSecond: number; // Este numero representa el valor del centro de la segunda secuencia
  public isPeriodicaFirst: boolean; // Representa si es periódica o no
  public isPeriodicaSecond: boolean; // Representa si es periódica o no
  public yaGraficoPrimera: boolean;
  public yaGraficoSegunda: boolean;
  public resultado: number[];
  public centroResultado: string;
  public resultadoPrimerGrafica: number[];
  public resultadoSegundaGrafica: number[];

  constructor() {
    // Inicializamos nuestras variables
    this.signalOne = [];
    this.signalTwo = [];
    this.isPeriodicaFirst = false;
    this.isPeriodicaSecond = false;
    this.yaGraficoPrimera = false;
    this.yaGraficoSegunda = false;
  }

  ngOnInit(): void {
  }
  public imprimir(){
    console.log([this.signalOne, this.centerFirst, this.isPeriodicaFirst]);
  }
  public graficar(signal, center, isPeriodica, numSerie){
    if (numSerie === 1){
      this.yaGraficoPrimera = false;
    } else if (numSerie === 2){
      this.yaGraficoSegunda = false;
    }
    if ((!signal.includes(',') || signal.match('[a-zA-Z_]')) && signal[0] instanceof String) { // Verificamos que la señal venga bien
      Swal.fire({
        title: '¡Ups, hubo un error!',
        text: 'Asegurate de ingresar correctamente la señal. Ejemplo: 1, 2, 3...',
        timer: 4000,
        icon: 'error',
      });
    } else {
      if (center.toString().match('[a-zA-Z_]')) {
        Swal.fire({
          title: '¡Ups, hubo un error!',
          text: 'Asegurante de que el centro sea un número válido',
          timer: 4000,
          icon: 'error',
        });
      } else {
        let realCenter; // Convertimos a numero con el '+' unario
        let realSignal = [];
        if (numSerie !== 0) {
          realSignal = signal.split(',').map((item) => {
            return parseFloat(item);
          });
          realCenter = +center;
        } else {
          realSignal = signal;
          realCenter = center;
        }
        const labels = []; // Vemos los indices que llevarán el eje de las x
        const colorGrafica = [];
        if (isPeriodica) { // En caso de que la señal sea periódica se tomará el doble de labels en el eje de las x
          for (let i = 0; i < 2 * realSignal.length; i ++) {
            labels[i] = realCenter + i;
            colorGrafica[i] = 'rgba(255,0,51,0.2)'; // Agregamos el color rojo, aunque podria ser cualquier color
          }
          realSignal = realSignal.concat(realSignal); // En caso de que sea periodica, simplemente concatenamos el arreglo a sí mismo
        } else {
          for (let i = 0; i < realSignal.length; i ++) {
            labels[i] = realCenter + i;
            colorGrafica[i] = 'rgba(255,0,53,0.2)'; // Agregamos el color rojo, aunque podria ser cualquier color
          }
        }
        const ctx1 = document.getElementById('myChart1');
        const ctx2 = document.getElementById('myChart2');
        const ctx3 = document.getElementById('myChart3');

        if (numSerie === 1){
          const myBarChart1 = new Chart(ctx1, {
            type: 'bar',
            data: {
              labels: labels,
              datasets: [{
                label: 'Gráfica de la señal',
                data: realSignal,
                backgroundColor: colorGrafica,
                borderColor: colorGrafica,
                borderWidth: 2,
                barPercentage: .01
              }, {
                type: 'line',
                pointRadius: 3,
                pointHoverRadius: 4,
                backgroundColor: 'rgba(255, 0, 0)',
                data: realSignal,
                showLine: false,
                fill: false,
              }]
            },
            options: {
              legend: {
                display: false
              },
              tooltips: {
                enabled: false
              },
              scales: {
                xAxes: [{
                  barThickness: 1,
                  gridLines: {
                    color: 'rgba(0, 0, 0, 0)',
                  }
                }],
                yAxes: [{
                  padding: realCenter * (-1),
                  ticks: {
                    beginAtZero: true
                  }
                }]
              },
              maintainAspectRatio: false
            }
          });
          this.yaGraficoPrimera = true;
          this.resultadoPrimerGrafica = realSignal;
          this.centerFirst = realCenter;
        } else if (numSerie === 2){
          const myBarChart2 = new Chart(ctx2, {
            type: 'bar',
              data: {
                labels: labels,
                datasets: [{
                  label: 'Gráfica de la señal',
                  data: realSignal,
                  backgroundColor: colorGrafica,
                  borderColor: colorGrafica,
                  borderWidth: 2,
                  barPercentage: .01
                }, {
                  type: 'line',
                  pointRadius: 3,
                  pointHoverRadius: 4,
                  backgroundColor: 'rgba(255, 0, 0)',
                  data: realSignal,
                  showLine: false,
                  fill: false,
                }]
              },
            options: {
              scales: {
                yAxes: [{
                  ticks: {
                    beginAtZero: true
                  }
                }]
              }
            }
          });
          this.yaGraficoSegunda = true;
          this.resultadoSegundaGrafica = realSignal;
          this.centerSecond = realCenter;
        } else {
          const myBarChart3 = new Chart(ctx3, {
            type: 'bar',
            data: {
              labels: labels,
              datasets: [{
                label: 'Gráfica de la señal',
                data: realSignal,
                backgroundColor: colorGrafica,
                borderColor: colorGrafica,
                borderWidth: 2,
                barPercentage: .01
              }, {
                type: 'line',
                pointRadius: 3,
                pointHoverRadius: 4,
                backgroundColor: 'rgba(255, 0, 0)',
                data: realSignal,
                showLine: false,
                fill: false,
              }]
            },
            options: {
              scales: {
                yAxes: [{
                  ticks: {
                    beginAtZero: true
                  }
                }]
              }
            }
          });
        }
      }
    }
  }
  /**
   * Este metodo retorna la convolucion finita de x(n) con h(n)
   * representadas por las secuencias x_n, h_n.
   *
   * Retorna el arreglo de la secuencia resultante
   * @param {Array} primerSecuencia secuencia x(n)
   * @param {Array} segundaSecuencia secuencia h(n)
   * @param ceroPrimera
   * @param ceroSegunda
   * @returns {Array} yn convolucion x(n)*h(n)
   */
  public convolucionFinita(primerSecuencia, segundaSecuencia, ceroPrimera, ceroSegunda) {
    if (this.yaGraficoPrimera && this.yaGraficoSegunda) {
      const resultLen = primerSecuencia.length + segundaSecuencia.length - 1;
      const resultante = [];
      const centro = ceroPrimera + ceroSegunda;

      for (let i = 0; i < resultLen; i++) {
        resultante[i] = 0;
      }

      for (let i = 0; i < primerSecuencia.length; i++) {
        for (let j = 0; j < segundaSecuencia.length; j++) {
          resultante[i + j] = resultante[i + j] + primerSecuencia[i] * segundaSecuencia[j];

        }
      }
      this.resultado = resultante;
      this.centroResultado = centro;
      this.graficar(resultante, centro, this.isPeriodicaFirst || this.isPeriodicaSecond, 0);
      return {resultante, centro};
    } else {
      Swal.fire({
        title: '¡Ups, hubo un error!',
        text: 'Asegurante de que ya graficaste ambas señales, por favor.',
        timer: 4000,
        icon: 'error',
      });
    }
  }
  /**
   * Este metodo retorna la convolucion circular de x(n) con h(n)
   * representadas por las secuencias x_n, h_n.
   *
   * Las secuencias x_n y h_n deben tener el numero de muestras correspondientes al periodo de estas.
   *
   * Por ejemplo, si el periodo de x_n es 2, la secuencia unicamente debe tener 2 muestras.
   *
   * Retorna el arreglo de la secuencia resultante.
   * @param {Array} primerSecuencia
   * @param {Array} segundaSecuencia
   * @param primerCentro
   * @param segundoCentro
   * @returns {Array} yn convolucion x(n)*h(n)
   */
  public convolucionCircular(primerSecuencia, segundaSecuencia, primerCentro, segundoCentro) {
    if (this.yaGraficoPrimera && this.yaGraficoSegunda) {
      const maxSize = primerSecuencia.length > segundaSecuencia.length ? primerSecuencia.length : segundaSecuencia.length;
      const resultante = [];
      const colVec = [];
      const rowVec = [];
      const circularMatrix = [];
      const centro = Math.abs((-1 * primerCentro) + (-1 * segundoCentro));

      // Inicializacion de vectores
      for (let i = 0; i < maxSize; i++) {
        rowVec[i] = i >= primerSecuencia.length ? 0 : primerSecuencia[i];
        colVec[i] = i >= segundaSecuencia.length ? 0 : segundaSecuencia[i];
        resultante[i] = 0;
      }

      // Inicializacion de la matriz
      for (let i = 0; i < maxSize; i++) {
        circularMatrix[i] = [];
        for (let j = 0; j < maxSize; j++) {
          circularMatrix[i][j] = 0;
        }
      }

      // Generar la matriz
      let k = 0;
      let d = 0;
      for (let i = 0; i < maxSize; i++) {
        let curIndex = k - d;
        for (let j = 0; j < maxSize; j++) {
          circularMatrix[j][i] = rowVec[curIndex % maxSize];
          curIndex++;
        }
        k = maxSize;
        d++;
      }

      // Multiplicar la matriz por el vector
      for (let i = 0; i < maxSize; i++) {
        for (let j = 0; j < maxSize; j++) {
          resultante[i] += (circularMatrix[i][j] * colVec[j]);
        }
      }
      this.resultado = resultante;
      this.centroResultado = centro.toString();
      this.graficar(resultante, centro, this.isPeriodicaFirst || this.isPeriodicaSecond, 0);
      return {resultante, centro};
    } else {
      Swal.fire({
        title: '¡Ups, hubo un error!',
        text: 'Asegurante de que ya graficaste ambas señales, por favor.',
        timer: 4000,
        icon: 'error',
      });
    }
  }

  /**
   * Este metodo retorna la convolucion periodica de x(n) con h(n)
   * representadas por las secuencias x_n, h_n.
   *
   * Retorna el arreglo de la secuencia resultante.
   * @param {Array} primerSecuencia
   * @param {Array} segundaSecuencia
   * @param ceroPrimera
   * @param ceroSegunda
   * @returns {Array} y_n convolucion x(n)*h(n)
   */
  public convolucionPeriodica(primerSecuencia, segundaSecuencia, ceroPrimera, ceroSegunda) {
    if (this.yaGraficoPrimera && this.yaGraficoSegunda) {
      const yn = Array.from(new Array(primerSecuencia.length)).map(e => 0);

      // tslint:disable-next-line:prefer-const one-variable-per-declaration max-line-length
      let begin = primerSecuencia.length > segundaSecuencia.length ? segundaSecuencia.length :  segundaSecuencia.length % primerSecuencia.length;
      const centro = Math.abs((-1 * ceroPrimera) + (-1 * ceroSegunda));

      for (let i = 0; i < segundaSecuencia.length; ++i){

        let trueBegin = begin - i;

        if (trueBegin < 0){ // Para evitar casos en los que fuese negativo
          trueBegin *= -1;
          trueBegin %= primerSecuencia.length;
          trueBegin = primerSecuencia.length - trueBegin;
          trueBegin %= primerSecuencia.length;
        }

        for (let count = 0, j = trueBegin; count < primerSecuencia.length; ++count, ++j){
          yn[count] += (segundaSecuencia[i] * primerSecuencia[j]);
          if (j >= primerSecuencia.length - 1) {
            j = -1;
          }
        }
      }
      this.resultado = yn;
      this.centroResultado = centro.toString();
      this.graficar(yn, centro, this.isPeriodicaFirst || this.isPeriodicaSecond, 0);
      return {yn, centro};
    } else {
      Swal.fire({
        title: '¡Ups, hubo un error!',
        text: 'Asegurante de que ya graficaste ambas señales, por favor.',
        timer: 4000,
        icon: 'error',
      });
    }
  }
}
