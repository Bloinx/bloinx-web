# Estructura del Smart Contract.


# Tanda Contract
## Variables
* admin   >>   address del creador de la tanda/temp requerido para pagos
* ronda   >>   enum que indica en qué lugar vamos 
* friends >>   lista de addresse de usuarios que participan en la ronda
* amount  >>   monto de pago periodico
* garant  >>   monto de pago de la garantía

## Functions
* pago_insc  >>  pago de garantía para entrar en la ronda 
* aumentar_ronda  >>  cuando los pagos de una ronda se ejecutan, sig edo 
