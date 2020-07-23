import React from 'react';

export function Home({ registerUser, payCashIn, payRound }) {
  return (
    <div className="my-5">
      <div className="row">
        <div className="col-6">
          <button className="btn btn-primary my-3" onClick={(e) => {
            registerUser(e.target.name, 'UserUno')
          }}
          >
            Registrarme a la tanda
          </button>
        </div>
        <div className="col-6">
          <button className="btn btn-danger mx-auto my-3" onClick={(e) => {
            payCashIn(e.target.name)
          }}
          >
            Pagar Garantia
          </button>
        </div>
      </div>
      <div className="row">
        <div className="col-6">
          <button className="btn btn-info my-3" onClick={(e) => {
            payRound(e.target.name)
          }}
          >
            Ahorro
          </button>
        </div>
        <div className="col-6">
          <button className="btn btn-success mx-auto my-3" onClick={(e) => {
            console.log(e);
          }}
          >
            Retirar Ahorro
          </button>
        </div>
      </div>
    </div>
  )
}

export default Home;