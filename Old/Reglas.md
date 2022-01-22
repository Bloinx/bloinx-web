# Reglas de la Dapp.

`` En este archivo se definen las reglas de la aplicación para poder diseñar el funcionamiento de los Smart Contracts ``

1. El usuario usará su wallet de metamask para poder usar la app.

2. El usuario debera contar con Eth para pagar las transacciones que se generen y algun otro token para empezar a ahorrar.

3. El usuario debera poner como colateral cierta cantidad de tokens como forma de garantia.

## To Do Sprint 1
* 1 Ronda de 5 usuarios.
* Definir la periodicidad de los pagos por medio de etapas (enum).
* Pago de garantia 1 eth y enviarlo a root. 
* Definir el monto de los pagos 1 eth
* El orden de cobro de los participantes se define desde el orden de los usuarios en el constructor.
* Pagar a cada usuario de acuerdo a la cantidad de tokens y tiempo establecido. 
* Los usuarios ejecutaran la funcion de retiro por medio de un boton en el frontend
* Definir fechas de termino de forma automatica
* Regresar la garantía al usuario al término del ciclo (esto podría no regresarse a menos que el usuario lo solicite)


## Backlog
* Congelar los tokens que el usuario puso como garantia y moverlos a un protocolo que genere rendimientos.
* Convertir Eth a Dai o a USD o a otra crypto
* Orden dependiente de reputacion del usuario
* Definir variable de reputacion
* Definir sistema para presion socal
* Ux de la aplicación.
* Con cada pago aumentar la reputación del usuario
* Uso de compound para generar intereses
* Evaluar otros metodos de generacion de rendimientos

