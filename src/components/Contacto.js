import React, { useState } from "react";

import { getFirestore, collection, addDoc } from "firebase/firestore/lite";
import { app } from "../firebase";

const db = getFirestore(app);

function Contacto() {
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [phone, setphone] = useState("");
  const [extension, setextension] = useState("");
  const [pais, setpais] = useState("Canadá");
  const [asunto, setasunto] = useState("Solicitud de información");
  const [mensaje, setmensaje] = useState("");
  const [done, setdone] = useState(false);
  const [error, seterror] = useState(false);

  const saveEmail = async () => {
    if (validar()) {
      const htmlFull = `
            <div style="font-family: Arial, Helvetica, sans-serif; border-radius: 5px; padding: 10px 20px; box-sizing: border-box; max-width: 700px; background-color: #F9F9F9; margin: 30px auto;">
                <div style="text-align: center;">
                    <img src="https://rjmcentroamerica.org/wp-content/uploads/2019/11/cropped-cropped-cropped-cropped-logotipo2-1.png" alt="RJM">
                    <hr>
                </div>
                <p style="font-weight: 600;">Nombre:</p>
                <p style="font-size: 20px; padding: 10px; background-color: white;">${name}</p>
                <p style="font-weight: 600;">Correo:</p>
                <p style="font-size: 20px; padding: 10px; background-color: white;">${email}</p>
                <p style="font-weight: 600;">Telefono:</p>
                <p style="font-size: 20px; padding: 10px; background-color: white;">(${extension}) ${phone}</p>
                <p style="font-weight: 600;">Asunto:</p>
                <p style="font-size: 20px; padding: 10px; background-color: white;">${asunto}</p>
                <p style="font-weight: 600;">Pais:</p>
                <p style="font-size: 20px; padding: 10px; background-color: white;">${pais}</p>
                <p style="font-weight: 600;">Mensaje:</p>
                <p style="font-size: 20px; padding: 10px; background-color: white;">${mensaje}</p>
                <hr>
                <p style="margin: 30px; text-align: center; font-size: 14px; color: grey;">Correo enviado desde el servidor general de mensajes diseñado por <strong>José Galdámez</strong>. Si tiene algún problema de visualización puede comunicarse a el correo <a href="mailto:josegaldamez1991@gmail.com">josegaldamez1991@gmail.com</a> </p>
            </div>
            `;

      const emailCol = collection(db, "email");

      const messageGeneral = {
        to: referente(pais),
        message: {
          subject: asunto,
          text: name,
          html: htmlFull,
        },
      };

      await addDoc(emailCol, messageGeneral)
        .then((respuesta) => {
          console.log(respuesta);
        })
        .catch((error) => {
          console.log(error);
        });

      // Mensaje que se envia de forma general siempre
      /*
      const message = {
        to: "atencion.regional@rjmcentroamerica.org",
        message: {
          subject: asunto,
          text: name,
          html: htmlFull,
        },
      };

      await addDoc(emailCol, message)
        .then((respuesta) => {
          console.log(respuesta);
        })
        .catch((error) => {
          console.log(error);
        });
        */

      setname("");
      setemail("");
      setmensaje("");
      setasunto("Solicitud de información");
      setpais("Canadá");
      setphone("");
      setextension("");

      setdone(true);
    } else {
      console.log("show error");
    }
  };

  const validar = () => {
    let validacion = true;

    if (
      name === "" ||
      pais === "" ||
      email === "" ||
      asunto === "" ||
      mensaje === "" ||
      extension === "" ||
      phone === ""
    ) {
      validacion = false;
      seterror(true);
    }

    return validacion;
  };

  const referente = (country) => {
    let referente = "josegaldamez1991@gmail.com";

    // Correo para Canada
    if (country === "Canadá") {
      referente = [
        "npiche@jesuites.org",
        "atencion.regional@rjmcentroamerica.org",
      ];
    }

    // USA - Miami
    if (country === "Estados Unidos (Miami)") {
      referente = [
        "silviam46@gmail.com",
        "atencion.regional@rjmcentroamerica.org",
      ];
    }
    if (country === "USA") {
      referente = [
        "jovana.nieto@jrsusa.org",
        "atencion.regional@rjmcentroamerica.org",
      ];
    }

    // México
    if (country === "México (Ciudad de México, centro del país)") {
      referente = [
        "coordinacion.centro@sjmmexico.org",
        "atencion.regional@rjmcentroamerica.org",
      ];
    }
    if (country === "México (Ciudad Juárez y Norte del país)") {
      referente = [
        "coordinacion.norte@sjmmexico.org",
        "atencion.regional@rjmcentroamerica.org",
      ];
    }
    if (country === "México (Chiapas, Tapachula)") {
      referente = [
        "jehry.perez@jrs.net",
        "atencion.regional@rjmcentroamerica.org",
      ];
    }
    if (country === "México (Chiapas, Comalapa y sur del país)") {
      referente = [
        "acompanamiento.sanrafael@sjmmexico.org",
        "atencion.regional@rjmcentroamerica.org",
      ];
    }

    // Centroamerica
    if (country === "Guatemala") {
      referente = [
        "angel.esc.gt@gmail.com",
        "atencion.regional@rjmcentroamerica.org",
      ];
    }
    if (country === "Honduras") {
      //referente = "josegaldamez1991@gmail.com";
      referente = [
        "keylacanales@eric-sj.org",
        "atencion.regional@rjmcentroamerica.org",
      ];
    }
    if (country === "El Salvador") {
      referente = [
        "gferrer@uca.edu.sv",
        "odiaz@uca.edu.sv",
        "rderas@uca.edu.sv",
      ];
    }
    if (country === "Nicaragua") {
      referente = [
        "atencionlegalsjm@uca.edu.ni",
        "atencion.regional@rjmcentroamerica.org",
      ];
    }
    if (country === "Costa Rica") {
      referente = [
        "j.soto@serviciojesuitacr.org",
        "atencion.regional@rjmcentroamerica.org",
      ];
    }
    if (country === "Panamá") {
      referente = [
        "pa.serviciomigrantes@feyalegria.org",
        "atencion.regional@rjmcentroamerica.org",
      ];
    }

    //Europa
    if (country === "España") {
      referente = [
        "juridico@sjme.org",
        "atencion.regional@rjmcentroamerica.org",
      ];
    }

    // Otros países
    if (country === "Otros países") {
      referente = "atencion.regional@rjmcentroamerica.org";
    }

    return referente;
  };

  const handleName = (event) => {
    setname(event.target.value);
    if (error) {
      seterror(false);
    }
  };
  const handleEmail = (event) => {
    setemail(event.target.value);
    if (error) {
      seterror(false);
    }
  };
  const handlePais = (event) => {
    setpais(event.target.value);
    if (error) {
      seterror(false);
    }
  };
  const handleAsunto = (event) => {
    setasunto(event.target.value);
    if (error) {
      seterror(false);
    }
  };
  const handleMensaje = (event) => {
    setmensaje(event.target.value);
    if (error) {
      seterror(false);
    }
  };
  const handleExtension = (event) => {
    if (event.target.value.length === 1 && event.target.value !== "+") {
      setextension("+" + event.target.value);
    } else {
      setextension(event.target.value);
    }
    if (error) {
      seterror(false);
    }
  };
  const handlePhone = (event) => {
    setphone(event.target.value);
    if (error) {
      seterror(false);
    }
  };

  const clearForm = () => {
    setname("");
    setemail("");
    setmensaje("");
    setasunto("Solicitud de información");
    setpais("Canadá");
    setextension("");
    setphone("");
    setdone(false);
  };

  // HTML visible

  if (done) {
    return (
      <div className="container">
        <div className="image-logo">
          <img
            src="https://rjmcentroamerica.org/wp-content/uploads/2019/11/cropped-cropped-cropped-cropped-logotipo2-1.png"
            alt="RJM Centroamerica"
          />
        </div>
        <hr />
        <div className="container done">
          <div className="alert alert-success" role="alert">
            <strong>El mensaje ha sido enviado. </strong> Dentro de poco alguien
            se pondrá en contacto con usted.
          </div>
          <button onClick={clearForm} className="btn btn-success">
            Enviar otro mensaje
          </button>
        </div>
      </div>
    );
  } else {
    return (
      <div className="container">
        <div className="image-logo">
          <img
            src="https://rjmcentroamerica.org/wp-content/uploads/2019/11/cropped-cropped-cropped-cropped-logotipo2-1.png"
            alt="RJM Centroamerica"
          />
        </div>
        <br />
        <hr />
        <div className="mb-3">
          <label htmlFor="nombre" className="form-label">
            Escriba su nombre:
          </label>
          <input
            type="text"
            value={name}
            onChange={handleName}
            className="form-control"
            id="nombre"
            placeholder="Nombre..."
          />
        </div>

        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Su correo electrónico:
          </label>
          <input
            type="email"
            value={email}
            onChange={handleEmail}
            className="form-control"
            id="email"
            placeholder="nombre@ejemplo.com"
          />
        </div>

        <label htmlFor="extension" className="form-label">
          Número de teléfono (incluya el código de país):
        </label>
        <div className="input-group">
          <input
            type="text"
            id="extension"
            placeholder="Código"
            value={extension}
            onChange={handleExtension}
            aria-label="Extension"
            className="form-control extension"
          />
          <input
            type="text"
            id="phone"
            placeholder="Teléfono"
            value={phone}
            onChange={handlePhone}
            aria-label="Telefono"
            className="form-control phone"
          />
        </div>
        <br />
        <div className="mb-3">
          <label htmlFor="pais" className="form-label">
            País del que requiere apoyo usted o su familiar:
          </label>
          <select
            className="form-select"
            value={pais}
            onChange={handlePais}
            aria-label="Default select example"
            id="pais"
          >
            <option value="Canadá" defaultValue>
              Canadá
            </option>
            <option value="Estados Unidos (Miami)">
              Estados Unidos (Miami){" "}
            </option>
            <option value="USA">Estados Unidos (Excepto Miami)</option>
            <option value="México (Ciudad de México, centro del país)">
              México (Ciudad de México, centro del país){" "}
            </option>
            <option value="México (Ciudad Juárez y Norte del país)">
              México (Ciudad Juárez y Norte del país){" "}
            </option>
            <option value="México (Chiapas, Tapachula)">
              México (Chiapas, Tapachula)
            </option>
            <option value="México (Chiapas, Comalapa y sur del país)">
              México (Chiapas, Comalapa y sur del país)
            </option>
            <option value="Guatemala">Guatemala</option>
            <option value="El Salvador">El Salvador</option>
            <option value="Honduras">Honduras</option>
            <option value="Nicaragua">Nicaragua</option>
            <option value="Costa Rica">Costa Rica</option>
            <option value="Panamá">Panamá</option>
            <option value="España">España</option>
            <option value="Otros países">Otros países</option>
          </select>
        </div>

        <div className="mb-3">
          <label htmlFor="asunto" className="form-label">
            Seleccionar tipo de apoyo requerido:
          </label>
          <select
            className="form-select"
            value={asunto}
            onChange={handleAsunto}
            aria-label="Default select example"
            id="asunto"
          >
            <option value="Solicitud de información" defaultValue>
              Solicitud de información
            </option>
            <option value="Gestión de documentos, trámites y otros apoyos">
              Gestión de documentos, trámites y otros apoyos
            </option>
            <option value="Acompañamiento de casos">
              Acompañamiento de casos
            </option>
          </select>
        </div>

        <div className="mb-3">
          <label htmlFor="mensaje" className="form-label">
            Cuerpo del mensaje:
          </label>
          <textarea
            value={mensaje}
            placeholder="Aqui el mensaje..."
            onChange={handleMensaje}
            className="form-control"
            id="mensaje"
            rows="3"
          ></textarea>
        </div>
        {error ? (
          <div class="alert alert-danger" role="alert">
            Faltan algunos datos, asegurese llenar el formulario.
          </div>
        ) : (
          ""
        )}

        <button className="btn btn-primary" onClick={saveEmail}>
          Enviar correo
        </button>
        <br />
      </div>
    );
  }
}

export default Contacto;
